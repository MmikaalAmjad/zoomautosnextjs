"use client"
import React, { useState,useEffect } from 'react';


import { useRouter } from 'next/navigation';
import { useDealerAdmin } from '@/components/clientcontext/clientcontext';
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/fi'; // or use any other arrow icon you like

const LoginPage = () => {
  const { dealerDetails, updateDealerDetails } = useDealerAdmin();
  const [formData, setFormData] = useState<any>({});
  const [FailureSignup,setFailureSignup]=useState(false);
  const [message,setfailuremessage]=useState("");
  const [signup,setsignup]=useState(false);
  const [signupsucess,setsignupsuccess]=useState(false);
  const router=useRouter();
  const [formDataSignup, setFormDataSignup] = useState<any>({
    username:"",
    name: "",
    email: "",
    contactNumber: "",
    password: "",
    id:"",
    companyName: "",
    Address: "",
    PostCode: "",
    city: "",
  });
  const [activeForm, setActiveForm] = useState('login'); // Default to "Login"
const [Failure,setFailure]=useState(false);

  const handleChangeSignup = (e:any) => {
    const { name, value } = e.target;
    setFormDataSignup({ ...formDataSignup, [name]: value });
  };

  const [customerId,setCustomerId]=useState('');
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData:any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handlePhoneChange = (value:any) => {
    setFormDataSignup({ ...formDataSignup, contactNumber: value });
  };

  const handleSignupSubmit = async (e:any) => {
    e.preventDefault(); // Prevent default form submission
    setsignup(true);

    try {
        // Ensure `username` exists in formDataSignup
        if (!formDataSignup.username) {
            setfailuremessage("Username is required.");
            setFailureSignup(true);
            return;
        }

        const response = await axios.post('/api/registration', formDataSignup, {
            headers: { "Content-Type": "application/json" }
        });

        // ✅ If signup is successful
        if (response.status === 201) {
            setCustomerId(response.data.Id);
            setsignupsuccess(true);
            setFailureSignup(false);
        }
        else{
          setsignup(false)
        setfailuremessage(response.data.message || "Signup successful!");
        }
        // ✅ Set failure message even on success (for testing)
    } catch (error:any) {
      setsignup(false)
        
        // Handle different types of errors
        if (error.response) {
            // ❌ Server responded with an error (like 400)
            setfailuremessage(error.response.data.message || "Signup failed. Please try again.");
        } else if (error.request) {
            // ❌ Request was made but no response received
            setfailuremessage("No response from server. Check your connection.");
        } else {
            // ❌ Something else went wrong
            setfailuremessage("Unexpected error occurred.");
        }

        setFailureSignup(true);
    }


};


    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('DealerData');
  
    if (storedUser) {
      const user = JSON.parse(storedUser);
      updateDealerDetails(user); // Restore user details to context or state
    }
  }, []);
  
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await fetch('/api/login', {  // Ensure correct API URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ identifier: formData.identifier, password: formData.password }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('User authenticated:', data);

            // Update dealer details in context
            updateDealerDetails(data.user);

            // Store token securely
            if (data.token) {
                sessionStorage.setItem('authTokenDealer', data.token);
            } else {
                console.error('No token received');
            }

            // Store user data
            localStorage.setItem('DealerData', JSON.stringify(data.user));
            
            
            
            // Reset form
            setFormData({ identifier: '', password: '' });

            setLoading(false);
            setSuccess(true);
        } else {
            const errorMessage = data.message || 'Invalid username or password';
            console.error('Authentication failed:', errorMessage);
            setFailure(true);
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        setFailure(true);
        alert('Something went wrong. Please try again later.');
    } finally {
        setLoading(false);
    }
};
  
    useEffect(() => {
      if (Failure||FailureSignup) {
          setTimeout(() => {
              setFailure(false);
              setSuccess(false);
              setFailureSignup(false)
          }, 2000);

      }
      if (success){
        setLoading(false);
        router.push('/clientdashboard');
      }
      if (signupsucess){
        setsignupsuccess(false);
        setActiveForm("login")
      }
  }, [success, Failure,signupsucess,FailureSignup]);
    
  

  return (
    <div className="login-page">
      <button onClick={() => router.back()} className="back-button">
      <FiArrowLeft size={20}/>
    </button>
      <div className="login-container">
        <div className="logo-container">
          <img src="/Logo4.png" alt="Logo" />
        </div>
        <div className="button-bar">
    <button
      className={activeForm === 'login' ? 'active' : ''}
      onClick={() => setActiveForm('login')}
    >
      Login
    </button>
    <button
      className={activeForm === 'signup' ? 'active' : ''}
      onClick={() => setActiveForm('signup')}
    >
      Sign Up
    </button>
  </div>
  {activeForm === 'login' && (
        <div className="login-form">
          <h2 className="headline">Welcome to Zoom Autos</h2>

          <form onSubmit={handleSubmit}>
          
          <input
  type="text"
  name="identifier"  // Can be email or username
  placeholder="Username or Email"
  value={formData.identifier}
  onChange={handleChange}
/>

            
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange} // Add onChange handler
            />
             <div className="login-extra-text">
              
        <a  onClick={() => 
          
          router.push('/forgetpassword')
          }>
          Forget Password?
        </a>
      </div>
            <button type="submit">Login</button>
          </form>
          
        </div>
  )}

{activeForm === 'signup' && (
  <>
   <h2 className="headline">Welcome to Zoom Autos</h2>
   <h3>Get Registered with Us</h3>
   <div className="signups-form">
   <form onSubmit={handleSignupSubmit}>
   <label>Username:</label>
         <input
           type="text"
           name="username"
           value={formDataSignup.username}
           onChange={handleChangeSignup}
           placeholder="Enter your Username for example zoom1723"
           required
           
         />
         <label>Name:</label>
         <input
           type="text"
           name="name"
           value={formDataSignup.name}
           onChange={handleChangeSignup}
           placeholder="Enter your full name"
           required
           
         />
       
       
         <label>Email Address:</label>
         <input
           type="email"
           name="email"
           value={formDataSignup.email}
           onChange={handleChangeSignup}
           placeholder="Enter your email"
           required
           
         />
       
       
         <label>Contact Number:</label>
         <PhoneInput
           country={"gb"}
           value={formDataSignup.contactNumber}
           onChange={handlePhoneChange}
           inputStyle={{border:' 2px solid #01103b'}}
           
         />
       
   
         
         <label>Password:</label>
         <input
           type="password"
           name="password"
           value={formDataSignup.password}
           onChange={handleChangeSignup}
           placeholder="Enter your password"
           required
           
         />
       
  
         <label>Confirm Password:</label>
         <input
           type="password"
           name="confirmPassword"
           value={formDataSignup.confirmPassword}
           onChange={handleChangeSignup}
           placeholder="Confirm your password"
           required
           
         />
       
   
       
         <label>Company Name:</label>
         <input
           type="text"
           name="companyName"
           value={formDataSignup.companyName}
           onChange={handleChangeSignup}
           placeholder="Enter your company name"
           required
           
         />
       
         <label>Address:</label>
         <input
           type="text"
           name="Address"
           value={formDataSignup.Address}
           onChange={handleChangeSignup}
           placeholder="Enter your address"
           required
           
         />
       
   
       
         <label>Post Code:</label>
         <input
           type="text"
           name="PostCode"
           value={formDataSignup.PostCode}
           onChange={handleChangeSignup}
           placeholder="Enter your post code"
           required
           
         />
       
         <label>City:</label>
         <input
           type="text"
           name="city"
           value={formDataSignup.city}
           onChange={handleChangeSignup}
           placeholder="Enter your city"
           required
           
         />
         
         <button
          type="submit"
          

        >
          Signup
        </button>
        
        </form>
         </div>
       </>
       
)}
      </div>

      {loading && (
        <div className='overlayStyle'>
          <div className='loadingStyle'  >Signing in...</div>
        </div>
      )}

{Failure && (
        <div className='overlayStyle'>
          <div className='FailureStyle'  >Login Failed</div>
        </div>
      )}
      {FailureSignup && (
        <div className='overlayStyle'>
          <div className='FailureStyle'  >Registration Failed
          <div>
          {message}</div>
          </div>
          
        </div>
      )}

      {/* Success Overlay */}
      {success && (
        <div className='overlayStyle'>
          <div className='successStyle' >Success</div>
        </div>
      )}
      {signup && (
        <div className='overlayStyle'>
          <div className='loadingStyle'  >Registering...</div>
        </div>
      )}

      {/* Success Overlay */}
      {signupsucess && (
        <div className='overlayStyle'>
          <div className='successStyle' >Thanks for Registering With US</div>
        </div>
      )}      
    </div>

  );
};

export default LoginPage;
