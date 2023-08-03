import React from 'react';
import { json, useParams } from 'react-router-dom';
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
import TextField from '@mui/material/TextField';
import { toast } from "react-toastify";



function Blog() {
    const { blogId } = useParams();
    // const [title, setTitle] = useState('');
    // const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [comments, setComments] = useState(null);
    const [blog, setBlog] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [refresh, setRefresh] = useState(false);
    // const [refreshComments, setRefreshComments] =

    // const usenavigate = usenavigate();

    const logout = () => {
        localStorage.removeItem('token');
        // usenavigate('/login')

    };
    useEffect(() => {
        //getting blog
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
                // setTitle(jsonData.title);
                // setText(jsonData.text);
                setBlog(jsonData);
                // setComments(jsonData.comments);
                console.log(jsonData);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [refresh]);
    const BoldItem = styled(Item)(({ theme }) => ({
        fontWeight: 'bold', // Apply bold font weight to BoldItem
    }));
    if (isLoading) {
        return <div>Loading...</div>;
    }

    const addComment = (e) => {
        e.preventDefault();
        if (newComment.length > 0) {
            let inputobj = {
                "text": newComment
            };
            fetch(`http://localhost:5059/Comment/create/${blogId}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(inputobj)
            }).then((res) => {
                // this.setComments((comments) => ([...comments, newComment]));
                // this.setComments(comments);
                setNewComment('');
                setRefresh(!refresh);
                return res.json();
            })
                // .then((resp) => {
                //     if (Object.keys(resp).length === 0) {
                //         toast.error('Comment failed, invalid credentials');
                //     } else {
                //         // setComments([...comments, newComment]);
                //         // setNewComment('');
                //         // this.setComments((comments) => ([...comments, newComment]));
                //         // setNewComment('');
                //         window.location.reload();
                //         console.log("IN ELSEE");

                //     }
                // })
                .catch((err) => {
                    toast.error('Comment Failed due to :' + err.message);
                });
        }
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
                                <BoldItem elevation={4} fontWeight="bold">{blog.title}</BoldItem>
                            </Grid>
                            <Grid item xs={2} md={12} >
                                <BoldItem elevation={4} fontWeight="bold">Written By: {blog.AuthorUserName}</BoldItem>
                            </Grid>
                            <Grid item xs={2} md={12} >
                                <Item elevation={4}>{blog.text}</Item>
                            </Grid>
                            <Grid item xs={2} md={12} >
                                <Item></Item>
                            </Grid>

                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                <Grid item xs={2} md={12} >
                                    <BoldItem elevation={4}>Comments</BoldItem>
                                </Grid>
                                {blog.comments.map((comment) => (
                                    <Grid item xs={2} sm={4} md={4} >
                                        <Item key={comment.id} >
                                            <BoldItem>{comment.text}</BoldItem>
                                            <Item>by user: {comment.userName}</Item>

                                        </Item>

                                    </Grid>
                                ))}
                                <Grid item xs={2} sm={4} md={4} >
                                    <Item>
                                        <TextField
                                            id="outlined"
                                            label="Add Comment"
                                            value={newComment}
                                            onChange={e => setNewComment(e.target.value)}
                                        />
                                        <Button variant="contained" onClick={addComment}>Add Comment</Button>
                                    </Item>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </>
    );
}

export default Blog;