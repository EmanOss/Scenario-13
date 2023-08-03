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



function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={6} md={12} >
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
      </Grid>
    </div>
  );
}

export default App;
