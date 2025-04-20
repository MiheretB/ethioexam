"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiServices = void 0;
const inference_1 = require("@huggingface/inference");
const hf = new inference_1.HfInference(process.env.HUGGINGFACE_API_TOKEN);
exports.aiServices = {
    // Generate mock exam based on student needs
    generateMockExam: (subject, grade, difficulty, topics) => __awaiter(void 0, void 0, void 0, function* () {
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
            const response = yield hf.textGeneration({
                model: 'facebook/opt-1.3b',
                inputs: prompt,
                parameters: {
                    max_new_tokens: 512,
                    temperature: 0.7,
                    return_full_text: false
                }
            });
            return JSON.parse(response.generated_text || '{}');
        }
        catch (error) {
            console.error('Error generating mock exam:', error);
            throw error;
        }
    }),
    // Scan and process exam content
    scanExam: (examContent) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const prompt = `Convert this exam content to structured questions:
      ${examContent}
      
      Format each question as a JSON object with:
      1. Question text in English and Amharic
      2. Options in English and Amharic
      3. Correct answer
      4. Subject and difficulty level`;
            const response = yield hf.textGeneration({
                model: 'facebook/opt-1.3b',
                inputs: prompt,
                parameters: {
                    max_new_tokens: 1024,
                    temperature: 0.3,
                    return_full_text: false
                }
            });
            return JSON.parse(response.generated_text || '[]');
        }
        catch (error) {
            console.error('Error scanning exam:', error);
            throw error;
        }
    }),
    // Translate text between English and Amharic
    translateText: (text, targetLang) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield hf.translation({
                model: 'Helsinki-NLP/opus-mt-en-am',
                inputs: text,
            });
            return response.translation_text;
        }
        catch (error) {
            console.error('Error translating text:', error);
            throw error;
        }
    })
};
