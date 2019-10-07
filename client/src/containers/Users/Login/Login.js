import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userLoginRequest } from '../../../store/actions/usersActions';
import TextInput from '../../../components/InputFields/textInput/textInput';
import './login.css';
const FIELDS = [
    { name: 'username', type: 'text', label: 'Username' },
    { name: 'password', type: 'password', label: 'Password' }
];

class Login extends Component {
    state = {
        userCredentials: {},
        errors: {}
    }

    static getDerivedStateFromProps = (props, state) => {
        if (props.errors) {
            state.errors = { ...state.errors, ...props.errors };
        }
        return state;
    }

    handleValidation = (field, value) => {
        let error = {};
        if (value === '') {
            error[field] = 'This field is required';
        } else {
            error[field] = '';
        }
        return error;
    }

    handleInputChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;

        const errors = { ...this.state.errors, ...this.handleValidation(field, value) }
        if (errors.invalidCredentials) {
            delete errors.invalidCredentials;
        }

        this.setState((prevState) => {
            return {
                ...prevState,
                userCredentials: {
                    ...prevState.userCredentials,
                    [field]: value
                },
                errors: { ...errors }
            };
        });
    }

    handleLogin = (e) => {
        e.preventDefault();
        this.props.dispatch(userLoginRequest(this.state.userCredentials));
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }
        const TextInputs = FIELDS.map(field =>
            <TextInput key={field.name}
                type={field.type} name={field.name} label={field.label}
                errors={this.state.errors}
                onChange={this.handleInputChange} />
        )
        return (
            <div className="container">
                <br />
                <h2 className="text-left">Data Dictionary</h2>
                <div className="jumbotron form-parent">
                    <h3 className="text-left form-heading">
                        Login
                    </h3>
                    {this.state.errors.invalidCredentials && <p className="text-danger">{this.state.errors.invalidCredentials}</p>}
                    <form onSubmit={this.handleLogin}>
                        {TextInputs}
                        <button className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.users.isAuthenticated,
        errors: state.users.errors,
    }
}

export default connect(mapStateToProps)(Login);