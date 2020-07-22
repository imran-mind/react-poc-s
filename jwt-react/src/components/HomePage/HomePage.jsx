import React from 'react';

import { userService, authenticationService } from '../../services';
import { history } from '../../helpers/history';
import './home.css'
class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.decryptData(),
            users: null,
            isLoading: false
        };
    }

    componentDidMount() {
        
    }

    loadSecureData(){
        this.setState({isLoading: true})
        userService.getAll().then(users => {
            this.setState({ users: users.data, isLoading:false });
        });
    }
    logout() {
        authenticationService.logout();
        history.push('/');
    }
    render() {
        const { currentUser, users, isLoading } = this.state;
        return (
            <div>
                <span className="home-btns" onClick={e => { this.logout() }}>LogOut</span>
                <span className="home-btns" onClick={e => { this.loadSecureData() }}>Load Secure Data</span>
                <div className="dashboard-div">
                    <h1>Hi {currentUser.firstName} :)</h1>
                    <p>You're logged in with React & JWT!!</p>
                    <h3>Users from secure Data </h3>
                    {isLoading ? 'Loading ...' :
                         <ul>
                            {users && users.map(user =>
                                <li key={user.id}>{user.firstName} {user.lastName}</li>
                            )}
                        </ul>
                    }
                </div>
            </div>
        );
    }
}

export { HomePage };