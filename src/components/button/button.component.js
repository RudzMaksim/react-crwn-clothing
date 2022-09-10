import './button.styles.scss'

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({text, buttonType, ...otherProps}) => {
    return (
        <button
            className={`button-container ${buttonType in BUTTON_TYPE_CLASSES ? BUTTON_TYPE_CLASSES[buttonType] : null}`}
            {...otherProps}
        >
            {text}
        </button>
    )

}

export default Button