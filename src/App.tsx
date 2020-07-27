import React, { useEffect, useState } from 'react';
import { getQuizDetails } from './services/quiz_service';
import './App.css';
import { Quiz, QuestionType } from './Types/quiz_types';
import QuestionCard from './components/QuestionCard';
import { Button1 } from './components/AppButton';

function App() {

  const [quiz, setQuiz] = useState<QuestionType[]>([]);
  const [isFetchingdata, setFetchingdata] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(true);
  const [questionNo, setQuestionNo] = useState<number>(1);

  const handleChangeQuestion = () => { setQuestionNo(questionNo+1) };

  async function fetchNewQuestions() {
    setQuizFinished(false);
    setFetchingdata(true);
    const quizDetails: QuestionType[] = await getQuizDetails(15, 'easy');
    console.log(quizDetails);
    setQuiz(quizDetails);
    setFetchingdata(false);
  }

  return (
    <div className="App">
      {!quizFinished || <Button1 onClick={fetchNewQuestions} >Start Quiz</Button1>}

      {quizFinished || (isFetchingdata? <h3>Loading Quiz...</h3> :
      <QuestionCard
        question = {quiz[questionNo-1].question}
        options = {quiz[questionNo-1].option}
        answer = {quiz[questionNo-1].answer}
        totalQuestions = {quiz.length}
        currentQuestion = {questionNo}
        callback = {handleChangeQuestion}
      />)}

    </div>
  );
}

export default App;
