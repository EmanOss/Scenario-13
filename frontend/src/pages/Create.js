import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Item from './../components/Item.js';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Create() {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const usenavigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        usenavigate('/login')
    };

    const createBlog = (e) => {
        e.preventDefault();
        if (text.length > 0 && title.length > 0) {
            let inputobj = {
                "title": title,
                "text": text,
            };
            fetch("http://localhost:5059/Blog/create", {
                method: 'POST',
                headers:
                {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            })
                .then((resp) => {
                    if (Object.keys(resp).length === 0) {
                        toast.error('Creation failed, invalid credentials');
                    } else {
                        // console.log(resp.id)
                        usenavigate(`/blog/${resp.blogId}`);
                    }
                }).catch((err) => {
                    toast.error('Creation Failed due to :' + err.message);
                });
        }
    };

    return (
        <>
            <div >
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={12} >
                            <AppBar position="static">
                                <Toolbar>
                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                        Create a Blog!
                                    </Typography>
                                    <Button onClick={logout} color="inherit">Log out</Button>
                                </Toolbar>
                            </AppBar>
                        </Grid>

                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                            <Grid item xs={6} md={12} container spacing={2} justifyContent="center" alignItems="center">
                                <Grid item md={12}></Grid>
                                <Grid item xs={6} md={8}>
                                    <TextField
                                        required
                                        id="outlined"
                                        label="Title"
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6} md={8}>
                                    <TextField
                                        required
                                        multiline
                                        rows={15}
                                        id="outlined-textarea"
                                        label="Text"
                                        onChange={e => setText(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6} md={8}>
                                    <Button variant="contained" onClick={createBlog}>Create</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Box>
            </div>
        </>
    );
}

export default Create;