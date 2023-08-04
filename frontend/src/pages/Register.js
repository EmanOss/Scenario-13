import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import NavBar from './../components/NavBar.js';
import {  useState } from "react";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
            fetch("http://localhost:5059/User/register", {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            })
                .then((resp) => {
                    if (Object.keys(resp).length === 0) {
                        toast.error('Register failed, invalid credentials');
                    } else {
                        usenavigate('/login')
                    }
                }).catch((err) => {
                    toast.error('Register Failed due to :' + err.message);
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
            {/* <div>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={12}>
                            <AppBar position="static">
                                <Toolbar>
                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                        Register
                                    </Typography>
                                    <Button color="inherit" href="/login">Login</Button>
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
                                    <Grid item xs={6} md={8}>
                                        <Button variant="contained" onClick={register}>Register</Button>
                                    </Grid>

                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </div> */}

            <>
                <Grid item xs={12} md={12} >
                    <NavBar title="Register" loginPage={false} />
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
                        <Button variant="contained" onClick={register}>Register</Button>
                    </Grid>
                </Grid>

            </>
        </>
    );
}

export default Home;