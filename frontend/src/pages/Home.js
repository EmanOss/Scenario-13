import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Item from './../components/Item.js';

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const usenavigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    usenavigate('/login')
  };
  useEffect(() => {
    //getting all blogs
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5059/Blog/GetAll', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Request failed!');
        }
        const jsonData = await response.json();
        setBlogs(jsonData);
        console.log(blogs);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getBlog = (blogId) => {
    usenavigate(`/blog/${blogId}`);
  };
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
                    All Blogs
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
                {blogs.map((blog) => (
                  <Grid item xs={2} sm={4} md={4} >
                    <Item key={blog.id} onClick={() => getBlog(blog.id)}>{blog.title}</Item>
                  </Grid>
                ))}
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
      </div>
    </>
  );
}

export default Home;