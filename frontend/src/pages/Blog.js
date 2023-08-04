import React from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Item from './../components/Item.js'
import TextField from '@mui/material/TextField';
import { toast } from "react-toastify";
import NavBar from './../components/NavBar.js';

function Blog() {
    const { blogId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [blog, setBlog] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [date, setDate] = useState("");


    const usenavigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        usenavigate('/login')
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
                setBlog(jsonData);
                setDate(jsonData.creationDate.split('T')[0]);
                console.log(jsonData.creationDate);
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
                setNewComment('');
                setRefresh(!refresh);
                return res.json();
            })
                .catch((err) => {
                    toast.error('Comment Failed due to :' + err.message);
                });
        }
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
                                        {blog.title}
                                    </Typography>
                                    <Button href="/create" color="inherit">Create Blog!</Button>
                                    {(localStorage.getItem('token')) ?
                                        <Button onClick={logout} color="inherit">Log out</Button>
                                        :
                                        <Button color="inherit" href="/login">Login</Button>}
                                </Toolbar>
                            </AppBar>
                        </Grid>
                        <Item></Item>
                        {(localStorage.getItem('token')) ?
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                <Grid item xs={2} md={12} >
                                    <BoldItem elevation={4} fontWeight="bold">Written By: {blog.authorUserName}, On {date}</BoldItem>
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
                                                <Item>By User: {comment.userName}</Item>

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
                            :
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                                <Grid item xs={2} sm={4} md={4} >
                                    <Item>Please Log in first!</Item>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                </Box>
            </div> */}

            <>
                <Grid item xs={12} md={12} >
                    <NavBar title={blog.title} createPage={false} />
                </Grid>
                {(localStorage.getItem('token')) ?
                    <Grid item xs={10} md={10} direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ padding: 5 }}>
                        <Grid container xs={12} md={12} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} direction="row" justifyContent="center" alignItems="center" >
                            <Grid item xs={2} md={12} >
                                <BoldItem elevation={4} fontWeight="bold">Written By: {blog.authorUserName}, On {date}</BoldItem>
                            </Grid>
                            <Grid item xs={2} md={12} >
                                <Item elevation={4}>{blog.text}</Item>
                            </Grid>
                            <Grid item xs={2} md={12} >
                                <BoldItem elevation={4}>Comments</BoldItem>
                            </Grid>
                            {blog.comments.map((comment) => (
                                <Grid item xs={2} sm={4} md={4} >
                                    <Item key={comment.id} >
                                        <BoldItem>{comment.text}</BoldItem>
                                        <Item>By User: {comment.userName}</Item>
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
                    :
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                        <Grid item xs={2} sm={4} md={4} >
                            <Item>Please Log in first!</Item>
                        </Grid>
                    </Grid>
                }
            </>
        </>
    );
}

export default Blog;