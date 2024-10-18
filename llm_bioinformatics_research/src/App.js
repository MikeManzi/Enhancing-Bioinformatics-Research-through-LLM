import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Box, Typography, AppBar, Toolbar, Button, IconButton } from '@mui/material';
import { blue } from '@mui/material/colors';
import LoginScreen from './LoginScreen/LoginScreen';
import HomeScreen from './HomeScreen/HomeScreen';  
import ApiDocumentation from './ApiDocumentation/ApiDocumentation';  
import References from './References/References'; 
import SignupScreen from './SignupScreen/SignupScreen';
import UserProfile from './UserProfile/UserProfile';
import { Link, useLocation } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { ThemeContextProvider  } from './ThemeContext';

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  //const {theme} = useContext(ThemeContextProvider);
  //theme === 'light' ? document.body.style.backgroundColor = 'white' : document.body.style.backgroundColor = '#121212';

  return (
    <>
      {!isLoginPage && (
      // <AppBar position="static" sx={{ bgcolor: theme === 'dark' ? blue[900] : blue[500] }}>
      <AppBar position="static" sx={{ bgcolor: blue[500] }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 0 }}>
            Better Bioinformatics
          </Typography>

          {/* <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Button component={Link} to="/home" sx={{ bgcolor: location.pathname === '/home' ? (theme === 'dark' ? blue[700] : blue[800]) : (theme === 'dark' ? blue[900] : blue[500]), color: 'white', m: 1 }}>Home</Button>
          <Button sx={{ color: 'white' }}>Guidelines</Button>
          <Button component={Link} to="/api-documentation" sx={{ bgcolor: location.pathname === '/api-documentation' ? (theme === 'dark' ? blue[700] : blue[800]) : (theme === 'dark' ? blue[900] : blue[500]), color: 'white', m: 1 }}>API documentation</Button>
          <Button component={Link} to="/references" sx={{ bgcolor: location.pathname === '/references' ? (theme === 'dark' ? blue[700] : blue[800]) : (theme === 'dark' ? blue[900] : blue[500]), color: 'white', m: 1 }}>References</Button>
          <IconButton component={Link} to="/profile" sx={{ bgcolor: location.pathname === '/profile' ? (theme === 'dark' ? blue[700] : blue[800]) : (theme === 'dark' ? blue[900] : blue[500]), color: 'white', m: 1 }}><PersonOutlineIcon /> </IconButton>
           */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Button component={Link} to="/home" sx={{ bgcolor: location.pathname === '/home' ? blue[700] : blue[500], color: 'white', m: 1 }}>Home</Button>
          <Button sx={{ color: 'white' }}>Guidelines</Button>
          <Button component={Link} to="/api-documentation" sx={{ bgcolor: location.pathname === '/api-documentation' ? blue[700] : blue[500], color: 'white', m: 1 }}>API documentation</Button>
          <Button component={Link} to="/references" sx={{ bgcolor: location.pathname === '/references' ? blue[700] : blue[500], color: 'white', m: 1 }}>References</Button>
          <IconButton component={Link} to="/profile" sx={{ bgcolor: location.pathname === '/profile' ? blue[700] : blue[500], color: 'white', m: 1 }}><PersonOutlineIcon /> </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      )}
      {children}
    </>
  );
};

function App() {
  return (

    <Router>
      <ThemeContextProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/home" element={<Layout><HomeScreen /></Layout>} />
          <Route path="/api-documentation" element={<Layout><ApiDocumentation /></Layout>} />
          <Route path="/references" element={<Layout><References /></Layout>} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
      </ThemeContextProvider>
    </Router>

  );
}

export default App;
