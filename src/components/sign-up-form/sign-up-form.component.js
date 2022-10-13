import { useState } from 'react';
import { signUpWithCreds } from "../../utils/firebase/firebase.auth.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.component.scss'
import Button from "../button/button.component";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords do not match")
            return;
        }

        dispatch(signUpStart(email, password, displayName));
        resetFormFields();
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    name="displayName"
                    type="text"
                    required
                    onChange={handleChange}
                    value={displayName}
                />

                <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    required
                    onChange={handleChange}
                    value={email}
                />

                <FormInput
                    label="Password"
                    name="password"
                    type="password"
                    required
                    onChange={handleChange}
                    value={password}
                />

                <FormInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    required
                    onChange={handleChange}
                    value={confirmPassword}
                />

                <Button text="Sign Up" type="submit"/>
            </form>
        </div>
    )
}

export default SignUpForm;