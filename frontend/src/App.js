import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import Login from './pages/Login.js'
import Home from './pages/Home.js'
import Register from './pages/Register.js'
import Blog from './pages/Blog.js'
import Create from './pages/Create.js'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';


function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {/* <Grid item xs={6} md={12} >
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Create a Blog!
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid> */}
        <Grid item xs={6} md={12} >
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/blog/:blogId" element={<Blog />} />
              <Route path="/create" element={<Create />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
