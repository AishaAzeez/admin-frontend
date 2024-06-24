// import React, { useEffect, useState } from 'react';
// import styled, { keyframes } from 'styled-components';
// import hiAvatar from '../assets/hi.png';
// import videoBackground from '/1.mp4';
// import { registerAPI, loginAPI, adminloginAPI, adminregisterAPI } from '../services/allAPI';
// import { Link } from 'react-router-dom';

// const Container = styled.div`
//   position: relative;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   padding: 20px;
//    overflow: hidden; 
// `;

// const WelcomeContainer = styled.div`
//   position: absolute;
//   left: 160px;
//   top: 220px;
//   z-index: 1;

//   @media (max-width: 1024px) {
//     left: 50%;
//     top: 50px;
//     transform: translateX(-50%);
//     text-align: center;
//   }
//   @media (max-width: 1324px) {
//     top: 320px;
//   }
//   @media (max-width: 1030px) {
//     display: none;
//   }
// `;

// const WelcomeText = styled.h1`
// font-family: "Helvetica", "Arial", sans-serif;
// font-size: 85px;
//   font-weight: lighter;
//   margin-bottom: 0;
//   background: linear-gradient(135deg, #007bff, #00bcd4);
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;

//   @media (max-width: 1250px) {
//     font-size: 70px;
//     margin-left: -60px;
//   }

//   @media (max-width: 1024px) {
//     font-size: 70px;
//   }

//   @media (max-width: 768px) {
//     font-size: 30px;
//   }

//   @media (max-width: 480px) {
//     font-size: 20px;
//   }
// `;

// const BoldSpan = styled.span`
//   font-weight: bold;
// `;

// const ThinSpan = styled.span`
//   font-weight: 300;
// `;

// const ObservationText = styled.p`
// font-family: "Helvetica", "Arial", sans-serif;
//   font-size: 16px;
//   font-weight: 300;
//   color: #fff;
//   margin-top: 10px;

//   @media (max-width: 1250px) {
//     margin-left: -60px;
//   }
//   @media (max-width: 1024px) {
//     font-size: 14px;
//   }

//   @media (max-width: 768px) {
//     font-size: 12px;
//   }

//   @media (max-width: 480px) {
//     font-size: 10px;
//   }
// `;

// const GlassBox = styled.div`
//   background: none; 
//   backdrop-filter: blur(12px);
//   border-radius: 20px;
//   padding: 40px 30px; 
//   box-shadow: none; 
//   margin-left: 850px; 

//   @media (max-width: 1250px) {
//     margin-left: 650px; 
//     padding: 30px 20px; 
//   }

//   @media (max-width: 1024px) {
//     margin-left: 50px; 
//     padding: 30px 20px; 
//   }

//   @media (max-width: 768px) {
//     padding: 20px 15px; 
//   }

//   @media (max-width: 480px) {
//     padding: 10px 8px; 
//     width: 90%;
//     margin: 0 auto;
//     margin-bottom:30px;
//   }
// `;

// const Content = styled.div`
//   width: 300px;
//   text-align: center;
//   color: white;
//   font-family: "Helvetica", "Arial", sans-serif;
//   @media (max-width: 480px) {
//     width: 100%;
//   }
// `;

// const AvatarContainer = styled.div`
//   width: 300px;
//   height: 100px;
//   border-radius: 50%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 20px;

//   @media (max-width: 480px) {
//     width: 150px;
//     height: 150px;
//   }
// `;

// const sayHiAnimation = keyframes`
//   0% {
//     transform: rotate(0deg);
//   }
//   25% {
//     transform: rotate(-5deg);
//   }
//   75% {
//     transform: rotate(5deg);
//   }
//   100% {
//     transform: rotate(0deg);
//   }
// `;

// const Avatar = styled.img`
//   width: 200px;
//   height: 200px;
//   animation: ${sayHiAnimation} 2s infinite;

//   @media (max-width: 480px) {
//     width: 150px;
//     height: 150px;
//     margin-top: 90px;
//   }

//   @media (max-width: 780px) {
//     width: 170px;
//     height: 170px;
//     margin-top: 60px;
//     margin-left:107px;
//   }
// `;

// const Title = styled.h2`
//   font-size: 24px;
//   margin-bottom: 20px;

//   @media (max-width: 480px) {
//     font-size: 20px;
//   }
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Input = styled.input`
//   width: 100%;
//   height: 40px;
//   margin-bottom: 20px;
//   padding: 14px;
//   font-size: 12px;
//   opacity: 0.8;
//   border: 2px solid ${props => props.error ? 'red' : '#ccc'};
//   border-radius: 0px;
//   outline: none;
//   transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

//   &:focus {
//     border-color: #007bff;
//     box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
//   }

//   @media (max-width: 480px) {
//     height: 35px;
//     padding: 10px;
//     font-size: 10px;
//   }
// `;

// const Select = styled.select`
//   width: 100%;
//   height: 40px;
//   margin-bottom: 20px;
//   padding: 10px;
//   font-size: 12px;
//   opacity: 0.8;
//   border: 1px solid #ccc;
//   border-radius: 0px;
//   outline: none;
//   transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

//   &:focus {
//     border-color: #007bff;
//     box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
//   }

//   @media (max-width: 480px) {
//     height: 35px;
//     padding: 8px;
//     font-size: 10px;
//   }
// `;

// const Option = styled.option`
//   font-size: 12px;
// `;

// const Button = styled.button`
//   width: 100%;
//   height: 40px;
//   margin-bottom: 20px;
//   background: linear-gradient(135deg, #007bff, #00bcd4);
//   color: #fff;
//   font-size: 18px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   transition: background-color 0.2s ease-in-out;

//   &:hover {
//     background-color: #ffff;
//   }

//   @media (max-width: 480px) {
//     height: 35px;
//     font-size: 16px;
//   }
// `;

// const RadioButtonWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 20px;
// `;

// const Icon = styled.img`
//   width: 20px;
//   height: 20px;
//   margin-left: 5px;
// `;

// const RadioButton = styled.button`
//   background-color: ${(props) => (props.selected ? '#007bff' : 'transparent')};
//   color: ${(props) => (props.selected ? '#fff' : '#000')};
//   border: 2px solid #007bff;
//   border-radius: 20px;
//   padding: 8px 16px;
//   margin-right: 10px;
//   cursor: pointer;
//   transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

//   &:hover {
//     background-color: #007bff;
//     color: #fff;
//   }

//   @media (max-width: 480px) {
//     padding: 5px 10px;
//     font-size: 12px;
//   }
// `;

// const ErrorMessage = styled.p`
//   color: #b62534;
//   font-size: 14px;
//   margin-top: -18px;
//   margin-left: -120px;
// `;


// const Login = ({ onLogin, setLoggedIn, setIsAdminLoggedIn }) => {
//   const [isSignup, setIsSignup] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [userType, setuserType] = useState('');
//   const [secretKey, setsecretKey] = useState('');
//   const [region, setRegion] = useState('');
//   const [shift, setShift] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [emailError, setEmailError] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);

//   useEffect(() => {
//     chrome.runtime.sendMessage({ action: 'checkLogin' }, (response) => {
//       if (response.loggedIn) {
//         setLoggedIn(true);
//       }
//     });
//   }, []);

//   useEffect(() => {
//     setEmail('');
//     setPassword('');
//     setsecretKey('');
//     setRegion('');
//     setShift('');
//     setErrorMessage('');
//     setEmailError(false);
//     setPasswordError(false);
//   }, [userType, isSignup]);

//   const validateEmail = (email) => {
//     const emailPattern = /^[a-zA-Z]+@annotation\.pro$/;
//     return emailPattern.test(email);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');
//     setEmailError(false);
//     setPasswordError(false);
  
//     if (userType === 'Admin') {
//       if (!secretKey) {
//         setErrorMessage('Please enter the admin key');
//       } else {
//         try {
//           if (isSignup) {
//             const signUpData = { secretKey, email, password };
//             const response = await adminregisterAPI(signUpData);
  
//             if (response && response.data && response.data.message === 'Admin created') {
//               setIsSignup(false);
//             } else {
//               setErrorMessage('Invalid secret key, Try again');
//             }
//           } else {
//             try {
//               const response = await adminloginAPI(secretKey, email, password);
  
//               if (response && response.message === 'Admin logged in successfully') {
//                 setIsAdminLoggedIn(true);
//               } else {
//                 setErrorMessage('Invalid email or password');
//               }
//             } catch (err) {
//               console.log(err);
//               setErrorMessage('Invalid credentials');
//             }
//           }
//         } catch (err) {
//           console.log(err);
//           setErrorMessage('Internal server error');
//         }
//       }
//     } else {
//       // User login or signup logic
//       if (isSignup) {
//         if (!email || !password || !region || !shift) {
//           setErrorMessage('Please fill the form completely');
//         } else if (!validateEmail(email)) {
//           setEmailError(true);
//         } else {
//           const signUpData = { email, password, region, shift };
//           try {
//             const result = await registerAPI(signUpData);
//             if (result && result.data && result.data.message === 'User already exists') {
//               setErrorMessage('User already exists');
//               setEmailError(true);
//               setPasswordError(true);
//             } else {
//               setIsSignup(false);
//             }
//           } catch (err) {
//             console.log(err);
//             setErrorMessage('Failed to sign up. Try again.');
//           }
//         }
//       } else {
//         if (!email || !password) {
//           setErrorMessage('Please fill the form completely');
//           if (!email) setEmailError(true);
//           if (!password) setPasswordError(true);
//         } else if (!validateEmail(email)) {
//           setEmailError(true);
//         } else {
//           const loginData = { email, password };
//           try {
//             const response = await loginAPI(loginData);
//             console.log(response, 'responseeeeeeeeeeeeee');
//             localStorage.setItem('attendanceId', response.data.attendanceId);
//             setLoggedIn(true);
//           } catch (err) {
//             console.log(err);
//             setEmailError(true);
//             setPasswordError(true);
//           }
//         }
//       }
//     }
//   };
  
//   return (
//     <Container>
//       <WelcomeContainer>
//         <WelcomeText>
//           <ThinSpan>Welcome to</ThinSpan> <br />
//           <BoldSpan>AttendanceMate</BoldSpan>
//         </WelcomeText>
//         <ObservationText>Your every move and non-move is under observation.</ObservationText>
//       </WelcomeContainer>
//       <video autoPlay loop muted style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}>
//         <source src={videoBackground} type="video/mp4" />
//       </video>
//       <GlassBox>
//         <Content>
//           <AvatarContainer>
//             <Avatar src={hiAvatar} alt="Hi Avatar" />
//           </AvatarContainer>
//           <h2 style={{ color: 'black' }}>{isSignup ? '' : ''}</h2>
//           <Title>{isSignup ? 'Sign up' : 'Log in'}</Title>
//           <Form onSubmit={handleSubmit}>
//             <RadioButtonWrapper>
//               <RadioButton
//                 style={{ color: 'white' }}
//                 type="button"
//                 onClick={() => setuserType('User')}
//                 selected={userType === 'User'}
//               >
//                 <span>User</span>
//                 <Icon src="https://i.postimg.cc/zDLy0KMs/15786272.png" alt="User icon" />
//               </RadioButton>
//               <RadioButton
//                 style={{ color: 'white' }}
//                 type="button"
//                 onClick={() => setuserType('Admin')}
//                 selected={userType === 'Admin'}
//               >
//                 <span>Admin</span>
//                 <Icon src="https://i.postimg.cc/qvrgJYRr/9512694.png" alt="User icon" />
//               </RadioButton>
//             </RadioButtonWrapper>
//             <br />

//             {errorMessage && userType !== 'Admin' && (
//               <ErrorMessage>{errorMessage}</ErrorMessage>
//             )}

//             {userType === 'Admin' ? (
//               <>
//                 <Input
//                   type="text"
//                   placeholder="Key password"
//                   value={secretKey}
//                   onChange={(e) => setsecretKey(e.target.value)}
//                   error={!secretKey}
//                 />
//               </>
//             ) : null}
//             <Input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               error={emailError}
//             />
//             <Input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               error={passwordError}
//             />
//             {userType === 'Admin' && errorMessage && (
//               <ErrorMessage>
//                 <i className="fa-solid fa-circle-exclamation me-2" style={{ color: '#b62534' }}></i>
//                 {errorMessage}
//               </ErrorMessage>
//             )}
//             {passwordError && <ErrorMessage><i className="fa-solid fa-circle-exclamation me-2" style={{ color: '#b62534' }}></i>Invalid email or password</ErrorMessage>}
//             {userType !== 'Admin' && isSignup && (
//               <>
//                 <Select value={region} onChange={(e) => setRegion(e.target.value)} required>
//                   <Option value="">Select Region</Option>
//                   <Option value="South West">South West</Option>
//                   <Option value="Mid West">Mid West</Option>
//                   <Option value="North East">North East</Option>
//                   <Option value="Florida">Florida</Option>
//                   <Option value="Southern Pacific">Southern Pacific</Option>
//                 </Select>
//                 <Select value={shift} onChange={(e) => setShift(e.target.value)} required>
//                   <Option value="">Select Shift</Option>
//                   <Option value="Midnight (12:30 AM - 04:30 AM)">Midnight (12:30 AM - 04:30 AM)</Option>
//                   <Option value="Early Morning (04:30 AM - 08:30 AM)">Early Morning (04:30 AM - 08:30 AM)</Option>
//                   <Option value="Morning (08:00 AM - 12:00 PM)">Morning (08:00 AM - 12:00 PM)</Option>
//                 </Select>
//               </>
//             )}
//             {isSignup ? (
//               <p style={{ color: 'gray' }}>
//                 Already have an account? <Link style={{ color: 'white' }} onClick={() => setIsSignup(false)}>Log in</Link>
//               </p>
//             ) : (
//               <p style={{ color: 'gray' }}>
//                 New to Attendance Tracker? <Link style={{ color: 'white' }} onClick={() => setIsSignup(true)}>Sign up here</Link>
//               </p>
//             )}

//             <Button type="submit">{isSignup ? 'Sign up' : 'Login'}</Button>
//           </Form>
//         </Content>
//       </GlassBox>
//       {/* {isRedirected && <View />} */}
//     </Container>
//   );
// };

// export default Login;



