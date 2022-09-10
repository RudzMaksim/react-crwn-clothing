import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { useState } from "react";
import {
    signInWithGooglePopup,
    signInWithEmail
} from "../../utils/firebase/firebase.utils";
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async (event) => {
        event.preventDefault();

        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmail(email, password);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password');
                    break;
                case 'auth/user-not-found':
                    alert('No user found');
                    break;
                default:
                    console.log("Sign In error", error)
            }
        }
    }


    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className='sign-in-container'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    required
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />

                <FormInput
                    required
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                <div className='sign-in-buttons'>
                    <Button text="Sign in" type="submit"/>
                    <Button text="Goggle Sign In" type="button" buttonType="google" onClick={signInWithGoogle}/>
                </div>
            </form>
        </div>
    )
}

export default SignInForm