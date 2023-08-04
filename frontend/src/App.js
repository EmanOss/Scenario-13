import './App.css';
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import Login from './pages/Login.js'
import Home from './pages/Home.js'
import Register from './pages/Register.js'
import Blog from './pages/Blog.js'
import Create from './pages/Create.js'
import { Grid } from '@mui/material';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Box from '@mui/material/Box';

function App() {
  return (
      <Box sx={{flexDirection: "column",flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid container spacing={0} xs={12} md={12} justifyContent="center" alignItems="center" sx={{ flexGrow: 1 }}>
                  <BrowserRouter>
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/blog" element={<Home />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/blog/:blogId" element={<Blog />} />
                      <Route path="/create" element={<Create />} />
                      <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                  </BrowserRouter>
                  <ToastContainer />
        </Grid>
      </Box>
  );
}

export default App;
