import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Item from './../components/Item.js';
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
                        usenavigate(`/blog/${resp.blogId}`);
                    }
                }).catch((err) => {
                    toast.error('Creation Failed due to :' + err.message);
                });
        }
    };

    return (


        <>
            <Grid item xs={12} md={12} >
                <AppBar position="static" >
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                            Create a Blog!
                        </Typography>
                        {(localStorage.getItem('token')) ?
                            <>
                                <Button onClick={()=>usenavigate('/blog')} color="inherit">All Blogs</Button>
                                <Button onClick={logout} color="inherit">Log out</Button>
                            </>
                            :
                            <Button color="inherit" href="/login">Login</Button>}
                    </Toolbar>
                </AppBar>
            </Grid>
            {(localStorage.getItem('token')) ?
                <Grid item xs={10} md={10} direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ padding: 5 }}>

                    <Grid container xs={10} md={10} spacing={2} direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs={12} md={12}>
                            <TextField
                                required
                                id="outlined"
                                label="Title"
                                sx={{ width: '100%' }}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                required
                                multiline
                                rows={15}
                                id="outlined-textarea"
                                label="Text"
                                sx={{ width: '100%' }}
                                onChange={e => setText(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6} md={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained" onClick={createBlog}>Create</Button>
                        </Grid>
                    </Grid>
                </Grid>
                :
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                    <Grid item xs={2} sm={4} md={4} >
                        <Item>Please Log in first!</Item>
                    </Grid>
                </Grid>
            }
        </>



    );
}

export default Create;