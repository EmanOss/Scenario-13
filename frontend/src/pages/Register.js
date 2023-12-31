import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BASE_URL from '../ApiConfig.js';
import MyDrawer from '../components/MyDrawer.js';

const Home = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const usenavigate = useNavigate();

    const register = (e) => {
        e.preventDefault();
        if (validate()) {
            let inputobj = {
                "username": username,
                "password": password
            };
            fetch(`${BASE_URL}/User/register`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(inputobj)
            }).then(async (res) => {
                if (res.status === 409) {
                    // Unauthorized, handle error message
                    const resp = await res.json();
                    throw new Error(resp.message || 'Register failed, Username already exists');
                } else {
                    return res.json();
                }
            })
                .then((resp) => {
                    if (Object.keys(resp).length === 0) {
                        toast.error('Register failed');
                    } else {
                        usenavigate('/login')
                    }
                }).catch((err) => {
                    toast.error('Register Failed: ' + err.message);
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
                        <Grid container xs={10} md={10} direction="column" spacing={2} justifyContent="center" alignItems="center" sx={{ padding: 15 }} >
                            {/* IF I WANT THE TEXT FIELDS TO THE LEFT ADD THIS  sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}*/}
                            <Grid item xs={12} md={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
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
                                <Button variant="contained" onClick={register}>Register</Button>
                            </Grid>

                        </Grid>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;