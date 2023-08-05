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
import './css/BackgroundImage.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useNavigate } from "react-router-dom";

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#8a472d', // Your desired brown color
      },
    },
  });


  
  // const hrefs1 = ['/blog', '/create'];
  // const hrefsLogin = ['/login', '/register'];
  // const drawerWidth = 240;
  // const drawer = (
  //   <div>
  //     <Toolbar />
  //     <Divider />
  //     {(localStorage.getItem('token')) ?
  //       <>
  //         <List>

  //           {['All Blogs', 'Create'].map((text, index) => (
  //             <ListItem key={text} disablePadding >
  //               <ListItemButton href={hrefs1[index]}>
  //                 <ListItemIcon>
  //                   {index % 2 === 0 ? <HomeIcon /> : <CreateIcon />}
  //                 </ListItemIcon>
  //                 <ListItemText primary={text} />
  //               </ListItemButton>
  //             </ListItem>
  //           ))}
  //         </List>
  //         <Divider />
  //         <List>
  //           <ListItem key="Log out" disablePadding>
  //             <ListItemButton onClick={() => localStorage.removeItem('token')}>
  //               <ListItemIcon>
  //                 <LogoutIcon />
  //               </ListItemIcon>
  //               <ListItemText primary="Log out" />
  //             </ListItemButton>
  //           </ListItem>
  //         </List>
  //       </>
  //       :
  //       <>
  //         {['Login', 'Register'].map((text, index) => (
  //           <ListItem key={text} disablePadding href="/login">
  //             <ListItemButton href={hrefsLogin[index]}>
  //               <ListItemIcon>
  //                 {index % 2 === 0 ? <LoginIcon /> : <HowToRegIcon />}
  //               </ListItemIcon>
  //               <ListItemText primary={text} />
  //             </ListItemButton>
  //           </ListItem>
  //         ))}
  //       </>}
  //   </div>
  // );
  // const container = undefined;
/*

*/

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
                <Route path="*" element={<Navigate to="/login" replace />} />
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
