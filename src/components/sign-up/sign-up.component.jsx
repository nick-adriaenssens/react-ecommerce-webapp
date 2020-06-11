import React, { useState } from 'react';
import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signUpStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

const SignUp = ({ dispatch }) => {

    const [formValues, setFormValues] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { displayName, email, password, confirmPassword } = formValues;

    const handleSubmit = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        dispatch(signUpStart({ email, password, displayName }));
    }

    const handleChange = event => {
        const { value, name } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    return (
        <div className="sign-up">
            <h2 className="title">I do not have an account</h2>
            <span>Sign up with your email and password</span>

            <form onSubmit={handleSubmit} className='sign-up-form'>
                <FormInput handleChange={handleChange} name='displayName' type='displayName' label='Name' value={displayName} required />
                <FormInput handleChange={handleChange} name='email' type='email' label='Email' value={email} required />
                <FormInput handleChange={handleChange} name='password' type='password' label='Password' value={password} required />
                <FormInput handleChange={handleChange} name='confirmPassword' type='password' label='Confirm password' value={confirmPassword} required />

                <CustomButton type='submit'>Sign up</CustomButton>
            </form>
        </div>
    );

}

export default connect()(SignUp);