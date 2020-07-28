import React, { useState, useEffect } from 'react';
import { QuestionCardProp } from '../../Types/quiz_types';

import './style.css';

const QuestionCard: React.FC<QuestionCardProp> = ({ question, options, answer, totalQuestions, currentQuestion, callback, }) => {

    const [selectedAns, setSelectedAns] = useState<string>('');
    const [selectedBtn, setSelectedBtn] = useState<number>(-1);
    const [userClicked, setUserClicked] = useState<boolean>(false);
    
    const checkAnswer = () => {
        if (userClicked) { callback(selectedAns === answer) }
    }

    useEffect(() => {
        setSelectedAns(''); setSelectedBtn(-1); setUserClicked(false);
    }, [currentQuestion])
    
    useEffect(checkAnswer, [userClicked])

    return (
        <div className='quiz-card-container'>
            <p>Question {currentQuestion}/{totalQuestions}</p>
            <p>{question}</p>
            <div>
                {options.map((option: string, id: number) => {
                    let btnClass:string = '';

                    if (userClicked && selectedBtn === id && selectedAns === answer) {
                        btnClass = 'correct';
                    } else if (userClicked && selectedBtn === id && selectedAns !== answer) {
                        btnClass = 'incorrect';
                    } else {
                        btnClass = '';
                    }

                    if (userClicked && option === answer) {
                        btnClass = 'correct';
                    }

                    return (
                        < button
                            className={`option-btn ${btnClass}`}
                            disabled={userClicked}
                            key={id}
                            onClick={() => { setSelectedAns(option); setSelectedBtn(id); setUserClicked(true) }}
                        >
                            {option}
                        </button>
                    )
                })}
            </div>
        </div >
    );
}

export default QuestionCard;