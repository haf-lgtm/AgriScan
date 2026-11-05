import React, { useState } from 'react';
import { User, Language } from '../types';
import { translations } from '../data/translations';
import { voiceAssistant } from '../services/voiceAssistant';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  Sparkles,
  Bot,
  User as UserIcon,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';

interface VoiceAssistantViewProps {
  currentUser: User | null;
  currentLang: Language;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const VoiceAssistantView: React.FC<VoiceAssistantViewProps> = ({
  currentUser,
  currentLang,
}) => {
  const t = translations[currentLang];
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      text:
        currentLang === 'kn'
          ? 'ನಮಸ್ಕಾರ ರೈತ ಮಿತ್ರರೆ! ನಾನು ಅಗ್ರಿಸ್ಕ್ಯಾನ್ ಆಫ್‌ಲೈನ್ ಧ್ವನಿ ಸಹಾಯಕ. ಬೆಳೆ ರೋಗಗಳು, ಕೀಟ ನಿಯಂತ್ರಣ, ಅಥವಾ ಸಾವಯವ ಗೊಬ್ಬರಗಳ ಬಗ್ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ.'
          : currentLang === 'hi'
          ? 'नमस्ते किसान साथी! मैं एग्रीस्कैन ऑफ़लाइन वॉयस असिस्टेंट हूं। फसल रोग, कीट रोकथाम या जैविक उपचार के बारे में कोई भी प्रश्न पूछें।'
          : 'Hello Farmer! I am the AgriScan Offline Voice Assistant. Ask me questions about crop diseases, pest controls, spray timings, or organic remedies.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceController, setVoiceController] = useState<{ stop: () => void } | null>(null);

  // Pre-compiled local agronomy knowledge base (100% offline Q&A)
  const localKnowledgeBase: { keywords: string[]; answer: Record<Language, string> }[] = [
    {
      keywords: ['early blight', 'alternaria', 'target spot', 'ಅರ್ಲಿ ಬ್ಲೈಟ್', 'अर्ली ब्लाइट'],
      answer: {
        en: 'Early blight causes dark brown circular spots with concentric target rings. Prevent it by pruning bottom foliage touching wet soil and spraying 1% Bordeaux mixture or Trichoderma harzianum.',
        kn: 'ಅರ್ಲಿ ಬ್ಲೈಟ್ (ಮುಂಚಿತ ರೋಗ) ಎಲೆಗಳ ಮೇಲೆ ಗುರಿಯಾಕಾರದ ಉಂಗುರಗಳನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ. ಕೆಳಗಿನ ಎಲೆಗಳನ್ನು ಕತ್ತರಿಸಿ ಮತ್ತು ಬೋರ್ಡೋ ದ್ರಾವಣ ಅಥವಾ ಟ್ರೈಕೋಡರ್ಮಾ ಸಿಂಪಡಿಸಿ.',
        hi: 'अर्ली ब्लाइट पत्तियों पर संकेंद्रित छल्लों वाले भूरे धब्बे बनाता है। निचली पत्तियों की छंटाई करें और 1% बोर्डो मिश्रण या ट्राइकोडर्मा का छिड़काव करें।',
      },
    },
    {
      keywords: ['late blight', 'phytophthora', 'water soaked', 'ಲೇಟ್ ಬ್ಲೈಟ್', 'लेट ब्लाइट'],
      answer: {
        en: 'Late blight thrives in cool misty conditions (12-20°C) with water-soaked dark patches. Spray Copper Oxychloride (2.5 g/L) or Ridomil MZ immediately and stop overhead sprinklers.',
        kn: 'ಲೇಟ್ ಬ್ಲೈಟ್ ತಂಪಾದ ಮತ್ತು ಮಂಜಿನ ವಾತಾವರಣದಲ್ಲಿ ವೇಗವಾಗಿ ಹರಡುತ್ತದೆ. ತಕ್ಷಣ ಕಾಪರ್ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ (2.5 ಗ್ರಾಂ/ಲೀ) ಸಿಂಪಡಿಸಿ ಮತ್ತು ಸ್ಪ್ರಿಂಕ್ಲರ್ ನೀರಾವರಿ ನಿಲ್ಲಿಸಿ.',
        hi: 'लेट ब्लाइट ठंडे और नमी वाले मौसम में तेजी से फैलता है। तुरंत कॉपर ऑक्सीक्लोराइड (2.5 ग्राम/लीटर) का छिड़काव करें और ऊपरी पानी बंद करें।',
      },
    },
    {
      keywords: ['armyworm', 'pest', 'whorl', 'ಕೀಟ', 'ಆರ್ಮಿವರ್ಮ್', 'कीट', 'आर्मीवॉर्म'],
      answer: {
        en: 'Fall armyworm caterpillars bore into central whorls leaving sawdust frass. Pour 1:9 dry wood ash and sand into whorls or spray Azadirachtin neem extract (5 ml/L).',
        kn: 'ಆರ್ಮಿವರ್ಮ್ ಹುಳುಗಳು ಸುಳಿಗಳಲ್ಲಿ ಹಾನಿ ಮಾಡುತ್ತವೆ. ಬೂದಿ ಮತ್ತು ಮರಳಿನ ಮಿಶ್ರಣವನ್ನು ಸುಳಿಗೆ ಹಾಕಿ ಅಥವಾ ಬೇವಿನ ಎಣ್ಣೆ (5 ಮಿಲಿ/ಲೀ) ಸಿಂಪಡಿಸಿ.',
        hi: 'फॉल आर्मीवॉर्म सुंडी मध्य कल्ले में छेद करती है। कल्ले में लकड़ी की राख और रेत का मिश्रण डालें या नीम का अर्क (5 मिली/लीटर) छिड़कें।',
      },
    },
    {
      keywords: ['ladybug', 'beneficial', 'ladybird', 'ರೈತ ಮಿತ್ರ', 'ಲೇಡಿಬಗ್', 'मित्र कीट', 'लेडीबग'],
      answer: {
        en: 'Ladybird beetles are farmers friends! Each adult eats over 50 aphids daily. Do not spray chemical insecticides when ladybugs are visible in your field.',
        kn: 'ಲೇಡಿಬಗ್ ಜೀರುಂಡೆಗಳು ರೈತರ ಅತ್ಯುತ್ತಮ ಮಿತ್ರರು. ಅವು ದಿನಕ್ಕೆ 50 ಕ್ಕೂ ಹೆಚ್ಚು ಹೇನುಗಳನ್ನು ತಿನ್ನುತ್ತವೆ. ಅವು ಕಂಡಾಗ ಕೀಟನಾಶಕ ಸಿಂಪಡಿಸಬೇಡಿ.',
        hi: 'लेडीबर्ड भृंग किसान मित्र कीट हैं। वे प्रतिदिन 50 से अधिक एफिड्स खाते हैं। खेत में दिखने पर रासायनिक कीटनाशक का छिड़काव न करें।',
      },
    },
    {
      keywords: ['nitrogen', 'yellow', 'deficiency', 'ಸಾರಜನಕ', 'ಹಳದಿ', 'नाइट्रोजन', 'पीला'],
      answer: {
        en: 'Nitrogen deficiency causes uniform smooth yellowing starting from bottom older leaves. Apply a 1-2% foliar urea spray or vermicompost to green up plants within 48 hours.',
        kn: 'ಸಾರಜನಕದ ಕೊರತೆಯಿಂದ ಕೆಳಗಿನ ಹಳೆಯ ಎಲೆಗಳು ಹಳದಿಯಾಗುತ್ತವೆ. 1-2% ಯೂರಿಯಾ ಸಿಂಪಡಣೆ ಅಥವಾ ಎರೆಹುಳು ಗೊಬ್ಬರ ನೀಡುವುದರಿಂದ 48 ಗಂಟೆಗಳಲ್ಲಿ ಹಸಿರಾಗುತ್ತದೆ.',
        hi: 'नाइट्रोजन की कमी से पुरानी निचली पत्तियां एकसमान पीली हो जाती हैं। 1-2% यूरिया का पर्णीय छिड़काव करें या वर्मीकम्पोस्ट डालें।',
      },
    },
  ];

  const handleAskQuestion = (questionText: string) => {
    if (!questionText.trim()) return;

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now().toString(36),
      sender: 'user',
      text: questionText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Offline matching logic
    const lower = questionText.toLowerCase();
    let reply =
      currentLang === 'kn'
        ? 'ಈ ಕುರಿತು ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ತಿಳಿಯಲು AI ಬೆಳೆ ಸ್ಕ್ಯಾನರ್ ಅಥವಾ ರೋಗಗಳ ವಿಶ್ವಕೋಶವನ್ನು ತೆರೆಯಿರಿ.'
        : currentLang === 'hi'
        ? 'इस विषय में विस्तृत मार्गदर्शन के लिए एआई फसल स्कैनर या रोग विश्वकोश देखें।'
        : 'To analyze this specific condition, please use the AI Crop Scanner or inspect the Disease Encyclopedia module.';

    for (const item of localKnowledgeBase) {
      if (item.keywords.some((k) => lower.includes(k.toLowerCase()))) {
        reply = item.answer[currentLang] || item.answer.en;
        break;
      }
    }

    const assistantMsg: ChatMessage = {
      id: 'asst_' + Date.now().toString(36),
      sender: 'assistant',
      text: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, assistantMsg]);
      // Speak reply offline
      voiceAssistant.speak(reply, currentLang);
    }, 400);
  };

  const toggleMicListening = () => {
    if (isListening) {
      if (voiceController) voiceController.stop();
      setIsListening(false);
      setVoiceController(null);
    } else {
      const controller = voiceAssistant.listenForCommand(
        (transcript) => {
          setIsListening(false);
          handleAskQuestion(transcript);
        },
        (err) => {
          setIsListening(false);
        },
        currentLang
      );
      setVoiceController(controller);
      setIsListening(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-600"></span>
          <span className="text-xs font-semibold text-emerald-800">
            Offline Agronomy Speech & Consultation Engine
          </span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 font-serif">
          Offline Voice Assistant
        </h1>
        <p className="mt-1 text-xs text-stone-600">
          Ask farming, pest control, or crop disease questions using your voice or keyboard. Operates 100% offline using locally embedded agricultural knowledge.
        </p>
      </div>

      {/* Main Chat Interface */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs flex flex-col h-[520px]">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-800 text-white shrink-0 mt-0.5">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={`max-w-lg rounded-2xl p-4 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-800 text-white rounded-tr-xs'
                    : 'bg-stone-50 text-stone-800 border border-stone-200 rounded-tl-xs'
                }`}
              >
                <p>{msg.text}</p>
                <span
                  className={`block text-[10px] mt-1 font-mono ${
                    msg.sender === 'user' ? 'text-emerald-200' : 'text-stone-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-stone-200 text-stone-700 shrink-0 mt-0.5">
                  <UserIcon className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Suggested Quick Questions */}
        <div className="my-3 flex flex-wrap items-center gap-1.5 border-t border-stone-100 pt-3">
          <span className="text-[11px] font-semibold text-stone-400">Quick Prompts:</span>
          {[
            'How to identify Early Blight?',
            'What controls Fall Armyworm?',
            'Why are leaves turning yellow?',
            'How to protect ladybug beetles?',
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleAskQuestion(prompt)}
              className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-[11px] text-stone-700 hover:border-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar (Voice Button + Text Input Fallback) */}
        <div className="flex items-center gap-2 pt-2">
          {/* Offline Mic Button */}
          <button
            onClick={toggleMicListening}
            className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all shrink-0 ${
              isListening
                ? 'bg-amber-600 text-white ring-4 ring-amber-200 animate-pulse'
                : 'bg-emerald-800 text-white hover:bg-emerald-700'
            }`}
            title={isListening ? 'Listening... click to stop' : 'Click to Speak Question'}
          >
            {isListening ? <Mic className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>

          {/* Text Input Fallback */}
          <div className="relative flex-1">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion(inputQuery)}
              placeholder="Ask by voice or type your crop question..."
              className="w-full rounded-xl border border-stone-200 bg-stone-50 pl-4 pr-10 py-3 text-xs text-stone-900 focus:border-emerald-800 focus:bg-white focus:outline-hidden"
            />
            <button
              onClick={() => handleAskQuestion(inputQuery)}
              className="absolute right-2 top-2 rounded-lg p-1.5 text-stone-400 hover:text-emerald-800"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
