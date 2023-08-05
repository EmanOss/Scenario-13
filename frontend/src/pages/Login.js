import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BASE_URL from '../ApiConfig.js';
import MyDrawer from '../components/MyDrawer.js';


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
            }).then(async (res) => {
                if (res.status === 401) {
                    // Unauthorized, handle error message
                    const resp = await res.json();
                    throw new Error(resp.message || 'Login failed, invalid credentials');
                } else {
                    return res.json();
                }
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
                    toast.error('Login Failed: ' + err.message);
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
            <div className="background-container">
                <div className="image-overlay"></div>
                <div className="content" style={{ display: 'flex', position: 'relative', zIndex: 1 }}>
                    <MyDrawer />
                    <div style={{ flex: 1 }}>
                        <Grid container xs={10} md={10} direction="column" spacing={2} justifyContent="center" alignItems="center" sx={{ padding: 15 }}>
                            {/* IF I WANT THE TEXT FIELDS TO THE LEFT ADD THIS  sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}*/}
                            <Grid item xs={12} md={12}>
                                <TextField
                                    required
                                    id="outlined"
                                    label="UserName"
                                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
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
                                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} >
                                <Button variant="contained" onClick={login}>Log in</Button>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Login;