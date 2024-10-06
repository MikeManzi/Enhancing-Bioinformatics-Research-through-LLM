import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [retypePasswordVisible, setRetypePasswordVisible] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [retypePasswordError, setRetypePasswordError] = useState('');

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError('Password must include at least one uppercase letter.');
      return false;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError('Password must include at least one lowercase letter.');
      return false;
    }
    if (!/\d/.test(password)) {
      setPasswordError('Password must include at least one number.');
      return false;
    }
    if (!/[@$!%*#?&]/.test(password)) {
      setPasswordError('Password must include at least one special character.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateRetypePassword = (password, retypePassword) => {
    if (password !== retypePassword) {
      setRetypePasswordError('Passwords do not match.');
      return false;
    }
    setRetypePasswordError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(email) && validatePassword(password) && validateRetypePassword(password, retypePassword)) {
      try {
        const response = await fetch('http://localhost:5000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_name: username, email: email, password: password }),
        });
        const data = await response.json();
        if (response.status === 201) {
          setSignupSuccess(true);
          setTimeout(() => navigate('/login'), 5002); 
        } else {
          console.error('Signup failed:', data.message);
        }
      } catch (error) {
        console.error('Failed to connect to the server:', error);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Typography id="signup-heading" variant="h4" gutterBottom data-testid="signup-heading">Sign Up</Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField 
            id="username" 
            label="Username" 
            type="text" 
            variant="outlined" 
            fullWidth 
            margin="normal"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            inputProps={{
              'data-testid': 'username-input',
            }}
          />
          <TextField 
            id="email" 
            label="Email" 
            type="email" 
            variant="outlined" 
            fullWidth 
            margin="normal"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            error={!!emailError} 
            helperText={emailError}
            inputProps={{
              'data-testid': 'email-input',
            }}
          />
          <TextField 
            id="password" 
            label="Password" 
            type={passwordVisible ? 'text' : 'password'} 
            variant="outlined" 
            fullWidth 
            margin="normal"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            error={!!passwordError} 
            helperText={passwordError}
            inputProps={{
              'data-testid': 'password-input',
            }}
            InputProps={{ 
              endAdornment: (
                <IconButton 
                  aria-label="toggle password visibility" 
                  onClick={() => setPasswordVisible(!passwordVisible)} 
                  edge="end"
                  data-testid="toggle-password-visibility"
                >
                  {passwordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              )
            }}
          />
          <TextField 
            id="retypePassword" 
            label="Confirm Password" 
            type={retypePasswordVisible ? 'text' : 'password'} 
            variant="outlined" 
            fullWidth 
            margin="normal"
            value={retypePassword} 
            onChange={(e) => setRetypePassword(e.target.value)} 
            error={!!retypePasswordError} 
            helperText={retypePasswordError}
            inputProps={{
              'data-testid': 'retypePassword-input',
            }}
            InputProps={{ 
              endAdornment: (
                <IconButton 
                  aria-label="toggle retype password visibility" 
                  onClick={() => setRetypePasswordVisible(!retypePasswordVisible)} 
                  edge="end"
                  data-testid="toggle-retype-password-visibility"
                >
                  {retypePasswordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              )
            }}
          />
          <Button 
            id="signup-button" 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 2 }}
            data-testid="signup-button"
          >
            Sign Up
          </Button>
          {signupSuccess && (
            <Typography 
              variant="body1" 
              color="success.main" 
              sx={{ mt: 2 }}
              data-testid="signup-success-message"
            >
              Successfully signed up! You will be redirected to the login page in 5 seconds.
            </Typography>
          )}
        </form>
      </Box>
    </Container>
  );
}

export default SignUpScreen;
