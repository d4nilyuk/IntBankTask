import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();

    function validate() {
        return username && password;
    }

    const handleSubmitButton = (e) => {
        e.preventDefault();

        if (validate()) {
            console.log("Username: " + username, "Password: " + password);
            let dataToSend = { username: username, password: password };
            fetch(
                'http://localhost:3001/api/login',
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(dataToSend),
                },
            ).then(responseJson => {
                if (responseJson.status === 200) {
                    alert('200');
                    dispatch(Login({
                        username:username,
                        fullname:username.toUpperCase()
                    }))
                    history.push('/');
                } else if (responseJson.status === 404) {
                    alert('404');
                } else if (responseJson.status === 401) {
                    alert('401');
                } else {
                    alert(responseJson.status);
                }
            }).catch(error => {
                    console.error(error);
            });
        } else {
            alert("Password and username should not be empty!");
        }
    };

    function handleReset() {
        setUsername("");
        setPassword("");
    }

    return (
        <div className="Login" style={{ textAlign: 'center' }}>
            <h1>Please log in below</h1>
            <form onSubmit={handleSubmitButton} >
                <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    autoFocus
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ margin: 10 }}
                />
                <br />
                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    autoFocus
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ margin: 10 }}
                    autoComplete="on"
                />
                <br />
                <Button variant="contained" type="submit" style={{ margin: 10 }}>
                    Login
                </Button>
                <Button variant="contained" disabled={!validate()} onClick={handleReset} style={{ margin: 0 }}>
                    Reset
                </Button>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}


export default Login;
