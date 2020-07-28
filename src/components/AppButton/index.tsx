import React from 'react';
import {BtnProp} from '../../Types/quiz_types';

import './style.css';

export const Button1: React.FC<BtnProp> = ({children, onClick})=>{
    return(
        <button className='button1' onClick={onClick} >{children}</button>
    );
}