export interface WordDetail {
  word: string;
  englishMeaning: string;
  turkishMeaning: string;
  partOfSpeech?: string;
  otherForms?: string[];
  forms?: {
    verb?: string;
    noun?: string;
    adjective?: string;
    adverb?: string;
  };
  examples: string[];
}

export interface FlashcardData extends WordDetail {
  id: string;
  unitId: string;
  createdAt: number;
}

export interface Unit {
  id: string;
  name: string;
  description: string;
  color: string;
}
