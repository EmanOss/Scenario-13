import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Item from './../components/Item.js';
import NavBar from './../components/NavBar.js';
import BASE_URL from '../ApiConfig.js';

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const usenavigate = useNavigate();

  useEffect(() => {
    //getting all blogs
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/Blog/GetAll`, {
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
      <Grid item xs={12} md={12} >
      <NavBar title="All Blogs" createPage={false}/>
      </Grid>
      {(localStorage.getItem('token')) ?
        <Grid item xs={10} md={10} direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ padding: 5 }}>
          <Grid container xs={12} md={12} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} direction="row" justifyContent="center" alignItems="center" >
            {blogs.map((blog) => (
              <Grid item xs={2} sm={4} md={4} >
                <Item key={blog.id} onClick={() => getBlog(blog.id)}>{blog.title}</Item>
              </Grid>
            ))}

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

export default Home;