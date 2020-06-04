import React from 'react';
import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signUpStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

class SignUp extends React.Component {

    state = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        this.props.dispatch(signUpStart({ email, password, displayName }));
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>

                <form onSubmit={this.handleSubmit} className='sign-up-form'>
                    <FormInput handleChange={this.handleChange} name='displayName' type='displayName' label='Name' value={this.state.displayName} required />
                    <FormInput handleChange={this.handleChange} name='email' type='email' label='Email' value={this.state.email} required />
                    <FormInput handleChange={this.handleChange} name='password' type='password' label='Password' value={this.state.password} required />
                    <FormInput handleChange={this.handleChange} name='confirmPassword' type='password' label='Confirm password' value={this.state.confirmPassword} required />

                    <CustomButton type='submit'>Sign up</CustomButton>
                </form>
            </div>
        )
    }

}

export default connect()(SignUp);