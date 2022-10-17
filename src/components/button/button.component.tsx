import './button.styles.scss'
import { ButtonHTMLAttributes } from "react";

export enum BUTTON_TYPE_CLASSES {
    google = 'google-sign-in',
    inverted = 'inverted'
}

type ButtonProps = {
    text: string,
    buttonType?: BUTTON_TYPE_CLASSES
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({text, buttonType, ...otherProps}: ButtonProps) => {
    return (
        <button
            className={`button-container ${buttonType ? buttonType : ''}`}
            {...otherProps}
        >
            {text}
        </button>
    )
}

export default Button