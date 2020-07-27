import React, { useState, useEffect } from 'react';
import { QuestionCardProp } from '../../Types/quiz_types';

import './style.css';

// const btnStyle = {
//     btn: {
//         backgroundColor: 'grey',
//         padding:
//     },
// }

const QuestionCard: React.FC<QuestionCardProp> = ({ question, options, answer, totalQuestions, currentQuestion, callback, }) => {

    const checkAnswer = () => { }

    const [selectedAns, setSelectedAns] = useState<string>('');
    const [selectedBtn, setSelectedBtn] = useState<number>(-1);
    const [userClicked, setUserClicked] = useState<boolean>(false);

    useEffect(() => {
        setSelectedAns(''); setSelectedBtn(-1); setUserClicked(false);
    }, [currentQuestion])
    useEffect(()=>{
        if (userClicked){ callback(selectedAns === answer) }
    }, [userClicked])

    return (
        <div className='quiz-card-container'>
            <p>Question {currentQuestion}/{totalQuestions}</p>
            <h3>{question}</h3>
            <div>
                {options.map((option: string, id: number) => {
                    const style = { btn: { backgroundColor: 'grey' } }

                    if (userClicked && selectedBtn === id && selectedAns === answer) {
                        style.btn.backgroundColor = 'lightgreen';
                    } else if (userClicked && selectedBtn === id && selectedAns !== answer) {
                        style.btn.backgroundColor = 'red';
                    } else {
                        style.btn.backgroundColor = 'grey';
                    }

                    if (userClicked && option === answer) {
                        style.btn.backgroundColor = 'lightgreen';
                    }

                    return (
                        < button
                            className='option-btn'
                            disabled={userClicked}
                            key={id}
                            style={style.btn}
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