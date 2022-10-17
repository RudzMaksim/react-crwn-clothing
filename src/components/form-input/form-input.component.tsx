import './form.input.styles.scss'
import { InputHTMLAttributes } from "react";

type FormInputProps = {
    label: string
} & InputHTMLAttributes<HTMLInputElement>

const FormInput = ({label, ...inputProps}: FormInputProps) => {
    return (
        <div className="group">
            <input className="form-input" {...inputProps}/>
            {label && (
                <label
                    className={`${inputProps.value && typeof inputProps.value === 'string' && inputProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
            )}
        </div>
    )
}

export default FormInput