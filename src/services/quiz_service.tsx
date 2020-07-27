import { QuestionType, Quiz } from '../Types/quiz_types';
import { shuffleArray } from '../utilities';

export const getQuizDetails = async (totalQuestions: number, level: string) => {
    const response = await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${level}&type=multiple`)
    let { results } = await response.json();

    const quiz: QuestionType[] = results.map((questionObj: Quiz) => {
        return {
            question: questionObj.question,
            answer: questionObj.correct_answer,
            option: shuffleArray( questionObj.incorrect_answers.concat(questionObj.correct_answer) )
        };
    })

    return quiz;
}
