import logo from './logo.svg';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";

// styles
// import "./bootstrap/scss/bootstrap.scss";
import "./assets/scss/paper-kit.scss?v=1.3.0";
import "./assets/demo/demo.css?v=1.3.0";
// pages
import Index from "./views/Index.js";
import NucleoIcons from "./views/NucleoIcons.js";
import LandingPage from "./views/examples/LandingPage.js";
import ProfilePage from "./views/examples/ProfilePage.js";
import RegisterPage from "./views/examples/RegisterPage.js";

// const theme = createTheme();


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/index" element={<Index />} />
      <Route path="/nucleo-icons" element={<NucleoIcons />} />
      <Route path="/landing-page" element={<LandingPage />} />
      <Route path="/profile-page" element={<ProfilePage />} />
      <Route path="/register-page" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/index" replace />} />
    </Routes>
  </BrowserRouter>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />

    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >

    //       Learn React
    //     </a>
    //     <ButtonUnstyled>hh</ButtonUnstyled>
    //     <SignIn/>
    //   </header>

    // </div>
    // <SignIn>hi</SignIn>
    // <ThemeProvider theme={theme}>
    //   <Box
    //     component="form"
    //     sx={{
    //       '& .MuiTextField-root': { m: 1, width: '25ch' },
    //     }}
    //     noValidate
    //     autoComplete="off"
    //   >
    //     <div>
    //       <TextField
    //         required
    //         id="outlined-required"
    //         label="Required"
    //         defaultValue="Hello World"
    //       />
    //       <TextField
    //         disabled
    //         id="outlined-disabled"
    //         label="Disabled"
    //         defaultValue="Hello World"
    //       />
    //       <TextField
    //         id="outlined-password-input"
    //         label="Password"
    //         type="password"
    //         autoComplete="current-password"
    //       />
    //       <TextField
    //         id="outlined-read-only-input"
    //         label="Read Only"
    //         defaultValue="Hello World"
    //         InputProps={{
    //           readOnly: true,
    //         }}
    //       />
    //       <TextField
    //         id="outlined-number"
    //         label="Number"
    //         type="number"
    //         InputLabelProps={{
    //           shrink: true,
    //         }}
    //       />
    //       <TextField id="outlined-search" label="Search field" type="search" />
    //       <TextField
    //         id="outlined-helperText"
    //         label="Helper text"
    //         defaultValue="Default Value"
    //         helperText="Some important text"
    //       />
    //     </div>
    //     <div>
    //       <TextField
    //         required
    //         id="filled-required"
    //         label="Required"
    //         defaultValue="Hello World"
    //         variant="filled"
    //       />
    //       <TextField
    //         disabled
    //         id="filled-disabled"
    //         label="Disabled"
    //         defaultValue="Hello World"
    //         variant="filled"
    //       />
    //       <TextField
    //         id="filled-password-input"
    //         label="Password"
    //         type="password"
    //         autoComplete="current-password"
    //         variant="filled"
    //       />
    //       <TextField
    //         id="filled-read-only-input"
    //         label="Read Only"
    //         defaultValue="Hello World"
    //         InputProps={{
    //           readOnly: true,
    //         }}
    //         variant="filled"
    //       />
    //       <TextField
    //         id="filled-number"
    //         label="Number"
    //         type="number"
    //         InputLabelProps={{
    //           shrink: true,
    //         }}
    //         variant="filled"
    //       />
    //       <TextField
    //         id="filled-search"
    //         label="Search field"
    //         type="search"
    //         variant="filled"
    //       />
    //       <TextField
    //         id="filled-helperText"
    //         label="Helper text"
    //         defaultValue="Default Value"
    //         helperText="Some important text"
    //         variant="filled"
    //       />
    //     </div>
    //     <div>
    //       <TextField
    //         required
    //         id="standard-required"
    //         label="Required"
    //         defaultValue="Hello World"
    //         variant="standard"
    //       />
    //       <TextField
    //         disabled
    //         id="standard-disabled"
    //         label="Disabled"
    //         defaultValue="Hello World"
    //         variant="standard"
    //       />
    //       <TextField
    //         id="standard-password-input"
    //         label="Password"
    //         type="password"
    //         autoComplete="current-password"
    //         variant="standard"
    //       />
    //       <TextField
    //         id="standard-read-only-input"
    //         label="Read Only"
    //         defaultValue="Hello World"
    //         InputProps={{
    //           readOnly: true,
    //         }}
    //         variant="standard"
    //       />
    //       <TextField
    //         id="standard-number"
    //         label="Number"
    //         type="number"
    //         InputLabelProps={{
    //           shrink: true,
    //         }}
    //         variant="standard"
    //       />
    //       <TextField
    //         id="standard-search"
    //         label="Search field"
    //         type="search"
    //         variant="standard"
    //       />
    //       <TextField
    //         id="standard-helperText"
    //         label="Helper text"
    //         defaultValue="Default Value"
    //         helperText="Some important text"
    //         variant="standard"
    //       />
    //     </div>
    //   </Box>
    // </ThemeProvider>
  );
}

export default App;