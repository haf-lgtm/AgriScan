import { Language } from '../types';

export class OfflineVoiceAssistant {
  private isSpeaking = false;

  public speak(text: string, lang: Language = 'en'): Promise<void> {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel(); // Stop any previous speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      // Select appropriate voice locale
      if (lang === 'hi') {
        utterance.lang = 'hi-IN';
      } else if (lang === 'kn') {
        utterance.lang = 'kn-IN';
      } else {
        utterance.lang = 'en-US';
      }

      utterance.onend = () => {
        this.isSpeaking = false;
        resolve();
      };
      utterance.onerror = () => {
        this.isSpeaking = false;
        resolve();
      };

      this.isSpeaking = true;
      window.speechSynthesis.speak(utterance);
    });
  }

  public stop(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
  }

  public isCurrentlySpeaking(): boolean {
    return this.isSpeaking;
  }

  public listenForCommand(
    onResult: (command: string) => void,
    onError?: (err: string) => void,
    lang: Language = 'en'
  ): { stop: () => void } {
    // Check speech recognition support
    const SpeechRec = (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
                      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRec) {
      if (onError) onError('Speech recognition not supported in this offline browser environment. Try Chrome/Edge.');
      return { stop: () => {} };
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = false;
      recognition.interimResults = false;

      if (lang === 'hi') recognition.lang = 'hi-IN';
      else if (lang === 'kn') recognition.lang = 'kn-IN';
      else recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        onResult(transcript);
      };

      recognition.onerror = (event: any) => {
        if (onError) onError(event.error || 'Audio capture failed');
      };

      recognition.start();

      return {
        stop: () => {
          try {
            recognition.stop();
          } catch {
            // ignore
          }
        },
      };
    } catch (e: any) {
      if (onError) onError(e?.message || 'Could not start microphone');
      return { stop: () => {} };
    }
  }
}

export const voiceAssistant = new OfflineVoiceAssistant();
