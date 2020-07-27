import React from 'react';
import './style.css';

type BtnProp = {
    onClick: (e:React.MouseEvent<EventTarget>) => void;
    children: any;
}

export const Button1: React.FC<BtnProp> = ({children, onClick})=>{
    return(
        <button className='button1' onClick={onClick} >{children}</button>
    );
}

// export const Button2: React.FC<BtnProp> = ({children, onClick})=>{
//     return(
//         <button className='button2' onClick={onClick} >{children}</button>
//     );
// }