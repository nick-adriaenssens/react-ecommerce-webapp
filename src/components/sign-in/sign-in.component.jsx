import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import { connect } from 'react-redux';
import { emailSignInStart, googleSignInStart } from '../../redux/user/user.actions';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {

    const [userCredentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart({ email, password });
    }

    const handleChange = event => {
        const { value, name } = event.target;
        setCredentials({ ...userCredentials, [name]: value });
    }

    return (
        <div className="sign-in">
            <h2 className='title'>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput handleChange={handleChange} name='email' type='email' label='Email' value={email} required />
                <FormInput handleChange={handleChange} name='password' type='password' label='Password' value={password} required />

                <div className="buttons">
                    <CustomButton type='submit'>Sign in</CustomButton>
                    <CustomButton type='button' onClick={() => googleSignInStart()} isGoogleSignIn>Sign in with Google </CustomButton>
                </div>
            </form>
        </div>
    );

}

const mapDispatchToProps = dispatch => ({
    emailSignInStart: () => dispatch(emailSignInStart()),
    googleSignInStart: () => dispatch(googleSignInStart())
});

export default connect(null, mapDispatchToProps)(SignIn);