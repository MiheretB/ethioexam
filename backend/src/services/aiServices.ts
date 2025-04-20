import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_TOKEN);

interface ExamQuestion {
  text: {
    en: string;
    am: string;
  };
  options: {
    en: string[];
    am: string[];
  };
  correctAnswer: number;
  explanation: {
    en: string;
    am: string;
  };
  subject: string;
  grade: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const aiServices = {
  // Generate mock exam based on student needs
  generateMockExam: async (
    subject: string,
    grade: number,
    difficulty: string,
    topics: string[]
  ): Promise<ExamQuestion> => {
    try {
      const prompt = `Generate a multiple choice ${subject} exam question for grade ${grade} students.
      Topics: ${topics.join(', ')}
      Difficulty level: ${difficulty}
      
      Format the response as a JSON object with:
      1. Question text in English and Amharic
      2. Four options in English and Amharic
      3. Correct answer index (0-3)
      4. Detailed explanation in English and Amharic
      5. Subject and difficulty level`;

      const response = await hf.textGeneration({
        model: 'facebook/opt-1.3b',
        inputs: prompt,
        parameters: {
          max_new_tokens: 512,
          temperature: 0.7,
          return_full_text: false
        }
      });

      return JSON.parse(response.generated_text || '{}');
    } catch (error) {
      console.error('Error generating mock exam:', error);
      throw error;
    }
  },

  // Scan and process exam content
  scanExam: async (examContent: string): Promise<ExamQuestion[]> => {
    try {
      const prompt = `Convert this exam content to structured questions:
      ${examContent}
      
      Format each question as a JSON object with:
      1. Question text in English and Amharic
      2. Options in English and Amharic
      3. Correct answer
      4. Subject and difficulty level`;

      const response = await hf.textGeneration({
        model: 'facebook/opt-1.3b',
        inputs: prompt,
        parameters: {
          max_new_tokens: 1024,
          temperature: 0.3,
          return_full_text: false
        }
      });

      return JSON.parse(response.generated_text || '[]');
    } catch (error) {
      console.error('Error scanning exam:', error);
      throw error;
    }
  },

  // Translate text between English and Amharic
  translateText: async (text: string, targetLang: 'en' | 'am'): Promise<string> => {
    try {
      const response = await hf.translation({
        model: 'Helsinki-NLP/opus-mt-en-am',
        inputs: text,
      });

      return response.translation_text;
    } catch (error) {
      console.error('Error translating text:', error);
      throw error;
    }
  }
};