import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { adminloginAPI } from '../services/allAPI';
import View from './View';

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  background-color: #1a1a1a;
  align-items: center;
  height: 100vh;
  padding: 20px;
  overflow: hidden;
`;

const WelcomeContainer = styled.div`
  position: absolute;
  left: 160px;
  top: 220px;
  z-index: 1;

  @media (max-width: 1024px) {
    left: 50%;
    top: 50px;
    transform: translateX(-50%);
    text-align: center;
  }
  @media (max-width: 1324px) {
    top: 320px;
  }
  @media (max-width: 1030px) {
    display: none;
  }
`;

const WelcomeText = styled.h1`
  font-family: "Helvetica", "Arial", sans-serif;
  font-size: 85px;
  font-weight: lighter;
  margin-bottom: 0;
  background: linear-gradient(135deg, #007bff, #00bcd4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 1250px) {
    font-size: 70px;
    margin-left: -60px;
  }

  @media (max-width: 1024px) {
    font-size: 70px;
  }

  @media (max-width: 768px) {
    font-size: 30px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const BoldSpan = styled.span`
  font-weight: bold;
`;

const ThinSpan = styled.span`
  font-weight: 300;
`;

const ObservationText = styled.p`
  font-family: "Helvetica", "Arial", sans-serif;
  font-size: 16px;
  font-weight: 300;
  color: black;
  margin-top: 10px;

  @media (max-width: 1250px) {
    margin-left: -60px;
  }
  @media (max-width: 1024px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const GlassBox = styled.div`
  background: none; 
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 40px 30px; 
  box-shadow: none; 
  margin-left: 850px; 

  @media (max-width: 1250px) {
    margin-left: 650px; 
    padding: 30px 20px; 
  }

  @media (max-width: 1024px) {
    margin-left: 50px; 
    padding: 30px 20px; 
  }

  @media (max-width: 768px) {
    padding: 20px 15px; 
  }

  @media (max-width: 480px) {
    padding: 10px 8px; 
    width: 90%;
    margin: 0 auto;
    margin-bottom:30px;
  }
`;

const Content = styled.div`
  width: 300px;
  text-align: center;
  color: white;
  font-family: "Helvetica", "Arial", sans-serif;
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const AvatarContainer = styled.div`
  width: 300px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
  }
`;

const Avatar = styled.img`
  width: 200px;
  height: 200px;

  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
    margin-top: 90px;
  }

  @media (max-width: 780px) {
    width: 170px;
    height: 170px;
    margin-top: 60px;
    margin-left:107px;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  padding: 14px;
  font-size: 12px;
  opacity: 0.8;
  border: 2px solid ${props => props.error ? 'red' : '#ccc'};
  border-radius: 0px;
  outline: none;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  @media (max-width: 480px) {
    height: 35px;
    padding: 10px;
    font-size: 10px;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #007bff, #00bcd4);
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #ffff;
  }

  @media (max-width: 480px) {
    height: 35px;
    font-size: 16px;
  }
`;

const ErrorMessage = styled.p`
  color: #b62534;
  font-size: 14px;
  margin-top: -18px;
  margin-left: -120px;
`;



const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setEmail('');
    setPassword('');
    setErrorMessage('');
    setEmailError(false);
    setPasswordError(false);
  }, []);

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z]+@annotation\.pro$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setEmailError(false);
    setPasswordError(false);

    if (!email || !password) {
      setErrorMessage('Please fill the form completely');
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }

    if (!validateEmail(email)) {
      setEmailError(true);
      setErrorMessage('Invalid email format');
      return;
    }

    try {
      const response = await adminloginAPI(email, password); // Replace with your actual API call
      console.log("API response:", response); // Debugging the response
      if (response && response.message === 'Admin Logged in Successfully') {
        navigate('/view');
      } else {
        setErrorMessage('Invalid email or password');
        setEmailError(true);
        setPasswordError(true);
      }
    } catch (err) {
      console.error("Login error:", err); // Log the error for debugging
      if (err.message === 'Network response was not ok') {
        setErrorMessage('Unable to reach the server. Please try again later.');
      } else {
        setErrorMessage('Internal server error');
      }
    }
  };

  return (
    <Container>
      <WelcomeContainer>
        <WelcomeText>
          <ThinSpan>Welcome to</ThinSpan> <br />
          <BoldSpan>AttendanceMate</BoldSpan>
        </WelcomeText>
        <ObservationText>Your every move and non-move is under observation.</ObservationText>
      </WelcomeContainer>

      <GlassBox>
        <Content>
          <Title>Log in</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
            />
            {emailError && <ErrorMessage>Invalid email</ErrorMessage>}
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
            />
            {passwordError && <ErrorMessage>Invalid password</ErrorMessage>}
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <Button type="submit">Login</Button>
          </Form>
        </Content>
      </GlassBox>
    </Container>
  );
};

export default AdminLogin;