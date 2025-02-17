import { ReactElement } from "react";
import './../../index.css'

interface ButtonProps {
    variant : "primary" | "secondary";
    size : "sm" | "md" | "lg";
    text : string;
    startIcon : any;
    endIcon : any;
    onClick? : ()=> void
    italic? : boolean
}

const variantStyle = {
    "primary" : "bg-purple-600 text-white hover:bg-purple-700",
    "secondary" : "bg-purple-200 text-purple-500 hover:bg-purple-300"
}

const defaultStyle = " flex items-center gap-2 rounded-md pr-2 pl-2 cursor-pointer text-xs" ;

const sizeStyle = {
    "sm" : "py-1 px-2",
    "md" : "py-1 px-3",
    "lg" : "py-2 px-4"
}

export const Button =(props : ButtonProps)=>{

    return (
        <button 
          onClick={props.onClick} 
          className={`p-1 cursor-pointer ${variantStyle[props.variant]} ${defaultStyle} ${sizeStyle[props.size]} ${props.italic? "italic" : ""}`}
        >
          {props.startIcon} {props.text} {props.endIcon}
        </button>
      );
      
}

