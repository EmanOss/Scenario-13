import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Item from './../components/Item.js';

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
            fetch("http://localhost:5059/User/Authenticate", {
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
            <div>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={12}>
                            <AppBar position="static">
                                <Toolbar>

                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                        Login
                                    </Typography>
                                    <Button href="/register" color="inherit">Register</Button>
                                </Toolbar>
                            </AppBar>
                        </Grid>

                        <Grid item xs={6} md={12}>
                            <Card >
                                <CardContent>
                                    <Grid item xs={6} md={12}>
                                        <TextField
                                            required
                                            id="outlined"
                                            label="UserName"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={8}>
                                        <TextField
                                            required
                                            id="outlined-password-input"
                                            label="Password"
                                            type="password"
                                            autoComplete="current-password"
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </Grid>
                                    <Item></Item>
                                    <Grid item xs={6} md={8}>
                                        <Button variant="contained" onClick={login}>Log in</Button>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </>
    );
}

export default Login;