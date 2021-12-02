import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../actions/session";
import Alert from '@mui/material/Alert';
import { Snackbar } from "@material-ui/core";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [alertMessage, setAlertMessage] = useState(false);

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
                    history.push('/');
                    dispatch(setUserDetails({
                        username: username,
                        fullname: username,
                    }))
                } else if (responseJson.status === 401) {
                    setErrorMessage("User does not exist!")
                    setAlertMessage(true);
                } else {
                    setErrorMessage("Page is not found!")
                    setAlertMessage(true);
                }
            }).catch(error => {
                console.error(error);
            });
        } else {
            setErrorMessage("Please enter the password and username!");
            setAlertMessage(true);
        }
    };

    function handleReset() {
        setUsername("");
        setPassword("");
        setErrorMessage("");
        setAlertMessage(false);
    }

    return (
        <div className="Login" style={{ textAlign: 'center' }}>
            <h1>Please log in below</h1>
            <form data-testid="login-form" id="login-form" onSubmit={handleSubmitButton} >
                <TextField
                    id="username"
                    data-testid="username"
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
                {validate ?
                    <Snackbar open={alertMessage} sx={{ width: '20%' }}>
                        <Alert severity="error">{errorMessage}</Alert>
                    </Snackbar> : null
                }
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

export default Login;
