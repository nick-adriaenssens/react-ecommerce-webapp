import React from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import { connect } from 'react-redux';
import { emailSignInStart, googleSignInStart } from '../../redux/user/user.actions';

class SignIn extends React.Component {

    state = {
        email: '',
        password: ''
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;
        this.props.dispatch(emailSignInStart({ email, password }));
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className="sign-in">
                <h2 className='title'>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput handleChange={this.handleChange} name='email' type='email' label='Email' value={this.state.email} required />
                    <FormInput handleChange={this.handleChange} name='password' type='password' label='Password' value={this.state.password} required />

                    <div className="buttons">
                        <CustomButton type='submit'>Sign in</CustomButton>
                        <CustomButton type='button' onClick={() => this.props.dispatch(googleSignInStart())} isGoogleSignIn>Sign in with Google </CustomButton>
                    </div>
                </form>
            </div>
        )
    }

}

export default connect()(SignIn);