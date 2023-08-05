import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Item from './../components/Item.js';
import BoldItem from './../components/BoldItem.js';
import NavBar from './../components/NavBar.js';
import BASE_URL from '../ApiConfig.js';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import MyDrawer from '../components/MyDrawer.js';

const backgroundImageUrl = './../images/letter.jpg';
//Photo by <a href="https://unsplash.com/@alvaroserrano?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Álvaro Serrano</a> on <a href="https://unsplash.com/photos/hjwKMkehBco?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>



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
      <div className="background-container">
        <div className="image-overlay"></div>
        <div className="content" style={{ display: 'flex', position: 'relative', zIndex: 1 }}>
          <MyDrawer />
          <div style={{ flex: 1 }}>
            {/* <Grid item xs={12} md={12} >
        <NavBar title="All Blogs" createPage={false} />
      </Grid> */}
            {(localStorage.getItem('token')) ?
              <Grid item xs={10} md={10} direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ padding: 5 }}>
                <Grid container xs={12} md={12} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} direction="row" justifyContent="center" alignItems="center" >
                  {blogs.map((blog) => (
                    <Grid item xs={2} sm={4} md={4} >

                      <Card sx={{ maxWidth: 345 }}>
                        {/* <div style={{ position: 'relative', zIndex: 1 }}> */}
                        <CardActionArea key={blog.id} onClick={() => getBlog(blog.id)}>

                          <CardContent sx={{ height: 150 }}>
                            <Typography gutterBottom variant="h6" component="div">
                              {blog.title}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                              Written By: {blog.authorUserName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {blog.text.split(' ').slice(0, 10).join(' ')}...
                            </Typography>
                          </CardContent>
                          <CardActions sx={{ justifyContent: 'flex-end' }}>
                            <Button size="small" display="flex" justifyContent="flex-end">Continue reading</Button>
                          </CardActions>
                        </CardActionArea>
                        {/* </div>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 0 }}></div> */}
                      </Card>

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
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;