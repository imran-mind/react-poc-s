import React, { useState, useEffect } from 'react';
import { Router, Route, Link,Redirect } from 'react-router-dom';
import { history } from '../helpers';
// import { authenticationService } from '../services';
import { PrivateRoute } from './PrivateRoute';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';


export const AppRoutes = (props) => {
    const [currentUser, setCurrentUser] = useState(undefined)

    useEffect(() => {
        // authenticationService.currentUser.subscribe(x => {
        //     console.log('---------user exist  ', x)
        //     setCurrentUser(x)
        // });  
        // console.log('--->dd useEffect ',authenticationService.decryptData())
        // setCurrentUser(authenticationService.decryptData());
        // debugger
    }, []);


    return (
        <Router history={history}>
            <div>
                <div className="jumbotron">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                {/* <Redirect exact from="/" to="/login" /> */}
                                <PrivateRoute path="/dashbaord" component={HomePage} />
                                <Route exact path="/" component={LoginPage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
}
// class AppRoutes extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             currentUser: null
//         };
//     }

        /* 
        const renderTableData= (props) =>{
            const {userList} = props;
            return(
                <div>
                    {currentUser.map((item,index)=>{
                        return <tr>
                            <td>{item.name}</td
                        </tr>
                    })}
                </div>
            )
        }
        */

//     componentDidMount() {
//         authenticationService.currentUser.subscribe(x => {
//             console.log('---------user exist  ', x)
//             this.setState({ currentUser: x })
//         });
//         // this.setState({ currentUser: authenticationService.currentUser });
//     }

//     logout() {
//         authenticationService.logout();
//         history.push('/login');
//     }

//     render() {
//         const { currentUser } = this.state;
//         return (
//             <Router history={history}>
//                 <div>
//                     {currentUser &&
//                         <nav className="navbar navbar-expand navbar-dark bg-dark">
//                             <div className="navbar-nav">
//                                 <Link to="/" className="nav-item nav-link">Home</Link>
//                                 <a onClick={this.logout} className="nav-item nav-link">Logout</a>
//                             </div>
//                         </nav>
//                     }
//                     <div className="jumbotron">
//                         <div className="container">
//                             <div className="row">
//                                 <div className="col-md-6 offset-md-3">
//                                     <PrivateRoute exact path="/dashbaord" component={HomePage} />
//                                     <Route path="/login" component={LoginPage} />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Router>
//         );
//     }
// }

// export { AppRoutes };
