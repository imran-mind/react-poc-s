import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { authenticationService } from '../../services';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) {
            this.props.history.push('/dashbaord');
        }
        this.state = {
            username: '',
            password: ''
        }
    }

    handleInputs = (e) => {
        console.log(e.target.value, e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = () => {
        authenticationService.login(this.state.username, this.state.password)
            .then(user => {
                console.log('iioi  ', user)
                debugger
                // const { from } = this.props.location.state || { from: { pathname: "/dashbaord" } };
                const { from } = { from: { pathname: "/dashbaord" } };
                this.props.history.push(from);
            },(error => {
                alert('Something went wrong',error);
            })
        );
    }

    disabled = () => {
        return !this.state.username && !this.state.password ? true : false
    }
    render() {
        return (
            <div>
                <h2>Login</h2>
                <div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input className="form-control" id="usr"
                            name="username" type="text" value={this.state.username} onChange={this.handleInputs} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" id="pwd" name="password"
                            type="password" value={this.state.password} onChange={this.handleInputs} />
                    </div>
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={this.handleSubmit}
                            disabled={this.disabled()}>Login</button>
                    </div>
                </div>
            </div>
        )
    }
}

export { LoginPage }; 