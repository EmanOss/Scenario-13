import React from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { Link, usenavigate } from "react-router-dom";
import Item from './../components/Item.js'

function Blog() {
    const { blogId } = useParams();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // const usenavigate = usenavigate();

    const logout = () => {
        localStorage.removeItem('token');
        // usenavigate('/login')

    };
    useEffect(() => {
        //getting all blogs
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5059/Blog/GetById/${blogId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Request failed!');
                }
                const jsonData = await response.json();
                setTitle(jsonData.title);
                setText(jsonData.text);
                console.log(jsonData);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const BoldItem = styled(Item)(({ theme }) => ({
        fontWeight: 'bold', // Apply bold font weight to BoldItem
    }));
    if (isLoading) {
        return <div>Loading...</div>;
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
                                        Home
                                    </Typography>
                                    <Button href="/create" color="inherit">Create Blog!</Button>
                                    <Button onClick={logout} color="inherit">Log out</Button>
                                </Toolbar>
                            </AppBar>
                        </Grid>
                        <Item></Item>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid item xs={2} md={12} >
                                <BoldItem elevation={4} fontWeight="bold">{title}</BoldItem>
                            </Grid>
                            <Grid item xs={2} md={12} >
                                <Item elevation={4}>{text}</Item>
                            </Grid>
                            {/* {blogs.map((blog) => (
                                    <Grid item xs={2} sm={4} md={4} >
                                        <Item key={blog.id} onClick={() => getBlog(blog.id)}>{blog.title}</Item>
                                    </Grid>
                                ))} */}
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </>
    );
}

export default Blog;