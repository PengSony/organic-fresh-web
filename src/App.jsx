import React from 'react';
const axios = require('axios');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.onHandleLogin = this.onHandleLogin.bind(this);
    }
    onHandleLogin() {
        try {
            axios.post('http://localhost:3000/api/v1/auth/login', {
                email: 'sony@slash.co',
                password: '1234567'
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (e) {
            console.log(e)
        }
    }
    render() {
        return (

            <div className="App">
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" />
                </div>
                <div className="form-group">
                    <a href="#" onClick={this.onHandleLogin}>Login</a>
                </div>
            </div>
        );
    }
}


export default App;

