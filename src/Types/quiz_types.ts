 export type Quiz = {
     category: string,
     correct_answer: string,
     difficulty: string
     incorrect_answers: string[],
     question: string,
     type: string,
 }

 export type QuestionType = {
     question: string,
     answer: string,
     option: string[],
 }

 export type QuestionCardProp = {
    question: string,
    options: string[],
    answer: string,
    totalQuestions: number,
    currentQuestion: number,
    callback: (e:React.FormEvent<EventTarget>, ans:string) => void
 }