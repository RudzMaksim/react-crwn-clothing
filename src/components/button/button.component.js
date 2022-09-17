import './button.styles.scss'

export const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({text, buttonType, ...otherProps}) => {
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