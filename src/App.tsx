import React, { useState } from 'react';
import { getQuizDetails } from './services/quiz_service';
import './App.css';
import { Quiz, QuestionType } from './Types/quiz_types';
import QuestionCard from './components/QuestionCard';
import { Button1 } from './components/AppButton';
import { shuffleArray } from './utilities';
import { spawn } from 'child_process';

function App() {

  const [quiz, setQuiz] = useState<QuestionType[]>([]);
  const [isFetchingdata, setFetchingdata] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(true);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [questionNo, setQuestionNo] = useState<number>(1);
  const [userClicked, setUserClicked] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleUserClick = (ansCorrect: boolean) => {
    setUserClicked(true); setScore(score + Number(ansCorrect));
    if (questionNo === quiz.length) { setQuizFinished(true) };
  };

  const changeQusetion = () => { setQuestionNo(questionNo + 1); setUserClicked(false) }

  async function fetchNewQuestions() {
    setQuizFinished(false);
    setFetchingdata(true);
    setUserClicked(false);
    setQuizStarted(true);
    setQuestionNo(1);
    setScore(0);
    const quizDetails: QuestionType[] = await getQuizDetails(5, 'easy');
    setQuiz(shuffleArray(quizDetails));
    setFetchingdata(false);
  }
  // useEffect(()=>{
  // setQuizFinished(questionNo===quiz.length);
  // }, [questionNo])
  return (
    <div className="App">
      <span><h1 className='App-title'>React Quiz App</h1></span>

      {!quizFinished || <span><Button1 onClick={fetchNewQuestions} >Start Quiz</Button1></span> }

      {(questionNo-1 === quiz.length) || <span><h3 className='App-score' >Score: {score}</h3></span> }

      {!isFetchingdata || <span><p>Loading Quiz...</p></span> }

      {isFetchingdata || !quizStarted || (questionNo-1 === quiz.length) ||
        <span><QuestionCard
        question={quiz[questionNo - 1].question}
        options={quiz[questionNo - 1].option}
        answer={quiz[questionNo - 1].answer}
        totalQuestions={quiz.length}
        currentQuestion={questionNo}
        callback={handleUserClick}
      /></span> }

      {isFetchingdata || quizFinished || !userClicked || (questionNo === quiz.length) || <span><Button1 onClick={changeQusetion}>Next Question</Button1></span> }

    </div>
  );
}

export default App;
