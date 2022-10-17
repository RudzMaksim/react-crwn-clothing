import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { ChangeEvent, FormEvent, useState } from "react";
import './sign-in-form.styles.scss';
import { useDispatch } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";
import { AuthError, AuthErrorCodes } from "firebase/auth";

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password))
            resetFormFields();
        } catch (error) {
            switch ((error as AuthError).code) {
                case AuthErrorCodes.INVALID_PASSWORD:
                    alert('Incorrect password');
                    break;
                case AuthErrorCodes.USER_DELETED:
                    alert('No user found');
                    break;
                default:
                    console.log("Sign In error", error)
            }
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
                    <Button text="Google Sign In" type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}/>
                </div>
            </form>
        </div>
    )
}

export default SignInForm