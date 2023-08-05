import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Item from '../components/Item.js'
import TextField from '@mui/material/TextField';
import { toast } from "react-toastify";
import BASE_URL from '../ApiConfig.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import MyDrawer from '../components/MyDrawer.js';

function Blog() {

    const { blogId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [blog, setBlog] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [date, setDate] = useState("");
    const [currentUserName, setCurrentUserName] = useState("");

    const usenavigate = useNavigate();


    const editBlog = (blogId) => {
        usenavigate(`/blog/update/${blogId}`);
      };
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
    
            try {
                const blogResponse = await fetch(`${BASE_URL}/Blog/GetById/${blogId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
    
                if (!blogResponse.ok) {
                    throw new Error(blogResponse.message || 'Request failed!');
                }
    
                const blogData = await blogResponse.json();
                setBlog(blogData);
                setDate(blogData.creationDate.split('T')[0]);
                // console.log(blogData.authorUserName+" blog");
                // console.log(localStorage.getItem('username') +" local");
    
                const userResponse = await fetch(`${BASE_URL}/User/currUser`);
    
                if (!userResponse.ok) {
                    throw new Error(userResponse.message || 'Request failed!');
                }
                const userData = await userResponse.json();
                console.log(userData+" userrr");
                setCurrentUserName(userData);
    
            } catch (error) {
                console.error('Failed: ' + error.message);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, [refresh]);
    
    

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const addComment = (e) => {
        e.preventDefault();
        if (newComment.length > 0) {
            let inputobj = {
                "text": newComment
            };
            fetch(`${BASE_URL}/Comment/create/${blogId}`, {
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
                    toast.error('Comment Failed');
                });
        }
    }
    return (
        <>
            <div className="background-container">
                <div className="image-overlay"></div>
                <div className="content" style={{ display: 'flex', position: 'relative', zIndex: 1 }}>
                    <MyDrawer />
                    <div style={{ flex: 1 }}>
                        {(localStorage.getItem('token')) ?
                            <Grid item xs={10} md={10} direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ padding: 5 }}>
                                <Grid container xs={12} md={12} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} direction="row" justifyContent="center" alignItems="center" >
                                    <Grid item xs={12} md={12} >
                                        <Card>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {blog.title}
                                                </Typography>
                                                <Typography fontWeight="bold" sx={{ mb: 1.5 }} color="text.secondary">
                                                    Written By: {blog.authorUserName}
                                                </Typography>
                                                <Typography fontWeight="bold" sx={{ mb: 1.5 }} color="text.secondary">
                                                    On: {new Date(date).toLocaleDateString()}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {blog.text}
                                                </Typography>
                                            </CardContent>
                                            
                                            {(localStorage.getItem('username')==blog.authorUserName) ?
                                                <CardActions sx={{ justifyContent: 'flex-end' }}>
                                                    <Button size="small" display="flex" justifyContent="flex-end" onClick={()=>editBlog(blog.id)}>Edit Blog</Button>
                                                </CardActions>
                                                :
                                                <></>
                                            }
                                        </Card>
                                    </Grid>
                                    {blog.comments.map((comment) => (
                                        <Grid item xs={2} sm={4} md={4} >
                                            <Card key={comment.id} sx={{ height: '150px', display: 'flex', flexDirection: 'column' }}>
                                                <CardContent >
                                                    <Typography gutterBottom fontWeight="bold" variant="body2" sx={{ wordWrap: 'break-word' }}>
                                                        {comment.text}
                                                    </Typography>
                                                </CardContent>
                                                <CardContent sx={{ marginTop: 'auto' }}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        By User: {comment.userName}, {new Date(comment.date).toLocaleDateString()}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}

                                    <Grid item xs={2} sm={4} md={4} >
                                        <Card sx={{ height: '150px', display: 'flex', flexDirection: 'column' }}>
                                            <CardContent >
                                                <TextField
                                                    id="standard-basic"
                                                    variant="standard"
                                                    label="Comment"
                                                    value={newComment}
                                                    sx={{ width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                                                    onChange={e => setNewComment(e.target.value)}
                                                />
                                            </CardContent>
                                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                                <Button size="small" display="flex" justifyContent="flex-end" onClick={addComment}>Add Comment</Button>
                                            </CardActions>
                                        </Card>
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default Blog;