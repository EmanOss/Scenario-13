import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Item from '../components/Item.js';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BASE_URL from '../ApiConfig.js';
import MyDrawer from '../components/MyDrawer.js';
import { useParams } from 'react-router-dom';


function Edit() {
    const { blogId } = useParams();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const usenavigate = useNavigate();

    useEffect(() => {
        //getting blog
        const fetchData = async () => {
            fetch(`${BASE_URL}/Blog/GetById/${blogId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            }).then(async (response) => {
                if (!response.ok) {
                    throw new Error(response.message || 'Request failed!');
                }
                else {
                    const jsonData = await response.json();
                    setText(jsonData.text);
                    setTitle(jsonData.title);
                    
                    console.log(jsonData.creationDate);

                    return response.json();
                }

            })
                .catch((err) => {
                    console.log('Failed: ' + err.message);
                });
        };
        fetchData();
    }, []);

    const editBlog = (e) => {
        e.preventDefault();
        if (text.length > 0 && title.length > 0) {
            let inputobj = {
                "title": title,
                "text": text,
            };
            fetch(`${BASE_URL}/Blog/update/${blogId}`, {
                method: 'POST',
                headers:
                {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(inputobj)
            }).then((res) => {
                usenavigate(`/blog/${blogId}`);
                return res.json();
            })
            .catch((err) => {
                    toast.error('Edit Failed');
                });
        }
    };

    return (
        <>
            <div className="background-container">
                <div className="image-overlay"></div>
                <div className="content" style={{ display: 'flex', position: 'relative', zIndex: 1 }}>
                    <MyDrawer />
                    <div style={{ flex: 1 }}>
                    {(localStorage.getItem('token')) ?
                        <Grid item xs={10} md={10} direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ padding: 5 }}>

                            <Grid container xs={10} md={10} spacing={2} direction="row" justifyContent="center" alignItems="center">
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        required
                                        id="outlined"
                                        label="Title"
                                        value={title}
                                        sx={{ width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        required
                                        multiline
                                        rows={15}
                                        id="outlined-textarea"
                                        value={text}
                                        label="Text"
                                        sx={{ width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                                        onChange={e => setText(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6} md={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button variant="contained" onClick={editBlog}>Save edits</Button>
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

export default Edit;