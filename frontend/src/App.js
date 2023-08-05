import './App.css';
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import Login from './pages/Login.js'
import Home from './pages/Home.js'
import Register from './pages/Register.js'
import Blog from './pages/Blog.js'
import Create from './pages/Create.js'
import Edit from './pages/Edit.js'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Box from '@mui/material/Box';
import './css/BackgroundImage.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#8a472d', // Your desired brown color
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <div className="background-container">
          <div className="image-overlay"></div>
          <div className="content" style={{ position: 'relative', zIndex: 1 }}>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/blog" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/blog/:blogId" element={<Blog />} />
                <Route path="/create" element={<Create />} />
                <Route path="/blog/update/:blogId" element={<Edit />} />
                <Route path="*" element={<Navigate to={(localStorage.getItem('token')) ?"/blog":"/login"} replace />} />
              </Routes>
            </BrowserRouter>
            <ToastContainer />
          </div>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default App;
