import React from "react";
import { Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';

function NavBar({ title, createPage }) {
    const usenavigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        usenavigate('/login')
    };

    return (
        <AppBar position="static" >
            <Toolbar>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, paddingLeft: '15%' }} >
                    {title}
                </Typography>
                {(localStorage.getItem('token')) ?
                    <>
                        {(createPage) ?
                            <Button onClick={() => usenavigate('/blog')} color="inherit">All Blogs</Button>
                            :
                            <Button href="/create" color="inherit">Create Blog!</Button>
                        }
                        <Button onClick={logout} color="inherit">Log out</Button>
                    </>
                    :
                    <Button color="inherit" href="/login">Login</Button>}
            </Toolbar>
        </AppBar>
    )
}
export default NavBar;