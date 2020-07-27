import React from 'react';

type BtnProp = {
    onClick: (e:React.MouseEvent<EventTarget>) => void;
    children: any;
}

export const Button1: React.FC<BtnProp> = ({children, onClick})=>{
    return(
        <button onClick={onClick} >{children}</button>
    );
}