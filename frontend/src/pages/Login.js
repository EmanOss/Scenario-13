import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavBar from './../components/NavBar.js';
import Item from './../components/Item.js';
import BASE_URL from '../ApiConfig.js';
import Paper from '@mui/material/Paper';


const Login = () => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const usenavigate = useNavigate();


    useEffect(() => {

        sessionStorage.clear();
    }, []);

    const login = (e) => {
        e.preventDefault();

        if (validate()) {
            let inputobj = {
                "username": username,
                "password": password
            };
            fetch(`${BASE_URL}/User/Authenticate`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            })
                .then((resp) => {
                    if (!resp.token.length > 0) {
                        toast.error('Login failed, invalid credentials');
                    } else {
                        const authToken = resp.token;
                        localStorage.setItem('token', authToken);
                        console.log(authToken);
                        usenavigate('/blog')
                    }
                }).catch((err) => {
                    toast.error('Login Failed due to :' + err.message);
                });
        }
    }
    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }

    return (
        <>
            <Grid item xs={12} md={12} >
                <NavBar title="Login" loginPage={true} />
            </Grid>
            <Grid container xs={10} md={10} direction="column" spacing={2} justifyContent="center" alignItems="center" sx={{ padding: 5 }}>
                {/* IF I WANT THE TEXT FIELDS TO THE LEFT ADD THIS  sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}*/}
                
                <Grid item xs={12} md={12}>
                    <TextField
                        required
                        id="outlined"
                        label="UserName"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </Grid>
                
                <Grid item xs={12} md={12} >
                    <TextField
                        required
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={12} >
                    <Button variant="contained" onClick={login}>Log in</Button>
                </Grid>
            </Grid>

        </>
    );
}

export default Login;