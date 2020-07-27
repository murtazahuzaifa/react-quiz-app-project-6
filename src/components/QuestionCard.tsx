import React, { useState } from 'react';
import { QuestionCardProp } from '../Types/quiz_types';

const QuestionCard: React.FC<QuestionCardProp> = ({ question, options, answer, totalQuestions, currentQuestion, callback, }) => {

    const [selectAns, setSelectAns] = useState<string>('');

    return (
        <div>
            <p>Question {currentQuestion}/{totalQuestions}</p>
            <h3>{question}</h3>
            <div>
                {options.map((option: string, id: number) => (
                    < button key={id} onClick={() => { console.log(option) }}>{option}</button>
                ))}
            </div>

        </div >
    );
}

export default QuestionCard;