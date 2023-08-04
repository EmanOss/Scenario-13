import React from "react";
import { Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';

function NavBar({ title, createPage, loginPage, blogPage }) {
    const usenavigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        usenavigate('/login')
    };

    return (
        <AppBar position="static" >
            <Toolbar sx={{ backgroundColor: 'rgba(150, 75, 40, 1)' }}>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, paddingLeft: '15%' }} >
                    {title}
                </Typography>
                {(localStorage.getItem('token')) ?
                    <>
                        {
                            (blogPage) ?
                                <><Button onClick={() => usenavigate('/blog')} color="inherit">All Blogs</Button>

                                    <Button href="/create" color="inherit">Create Blog!</Button></>
                                :
                                (createPage) ?
                                    <Button onClick={() => usenavigate('/blog')} color="inherit">All Blogs</Button>
                                    :
                                    <Button href="/create" color="inherit">Create Blog!</Button>
                        }
                        <Button onClick={logout} color="inherit">Log out</Button>
                    </>
                    :
                    <>
                        {(loginPage) ?
                            <Button color="inherit" href="/Register">Register</Button>
                            :
                            <Button color="inherit" href="/login">Login</Button>
                        }
                    </>}
            </Toolbar>
        </AppBar>
    )
}
export default NavBar;