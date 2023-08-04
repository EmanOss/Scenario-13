// import './App.css';
// import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
// import Login from './pages/Login.js'
// import Home from './pages/Home.js'
// import Register from './pages/Register.js'
// import Blog from './pages/Blog.js'
// import Create from './pages/Create.js'
// import { Grid } from '@mui/material';
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";



// function App() {
//   return (
//     <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
//       <Grid container spacing={2} justifyContent="center" alignItems="center">
//         <Grid item xs={6} md={12} >
//           <BrowserRouter>
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route path="/blog" element={<Home />} />
//               <Route path="/register" element={<Register />} />
//               <Route path="/blog/:blogId" element={<Blog />} />
//               <Route path="/create" element={<Create />} />
//               <Route path="*" element={<Navigate to="/login" replace />} />
//             </Routes>
//           </BrowserRouter>
//           <ToastContainer />
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// export default App;


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
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Item from './components/Item.js';
import { Link, useNavigate } from "react-router-dom";



function App() {
  // const usenavigate = useNavigate();

  // const logout = () => {
  //     localStorage.removeItem('token');
  //     usenavigate('/login')
  // };

  return (
    <>
      {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
      </div> */}

      <Box sx={{flexDirection: "column",flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid container spacing={0} xs={12} md={12} justifyContent="center" alignItems="center" sx={{ flexGrow: 1 }}>
          {/* <Grid item xs={12} md={12} >
            <MyNavBar/>
          </Grid> */}
          {/* {(localStorage.getItem('token')) ? */}
            
              {/* <div  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}> */}

                {/* <Grid item xs={10} md={10} direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{padding:5}}> */}
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
                {/* </Grid> */}
              {/* </div> */}
            
        </Grid>
      </Box>
    </>

  );
}

export default App;
