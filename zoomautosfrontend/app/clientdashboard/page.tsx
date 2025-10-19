"use client"
import React, { useEffect, useState } from 'react';

import { useDealerAdmin } from '@/components/clientcontext/clientcontext';
import { useRouter } from 'next/navigation';
import { MdDateRange } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { MdWhatsapp } from "react-icons/md";
import axios from 'axios';


import { MdOutlineMailOutline } from "react-icons/md";
const LogisticsHomepage = () => {
  
  useEffect(() => {
    // Push state to prevent back navigation
    window.history.pushState(null, "", window.location.href);

    const handleBackButton = () => {
      const confirmLogout = window.confirm("Do you want to log out?");
      if (confirmLogout) {
        // Clear authentication data
        sessionStorage.removeItem("authTokenDealer");
        localStorage.removeItem("DealerData");

        // Redirect to login page
        window.location.href = "/Logistics/Login";
      } else {
        // Push state again to block back navigation
        window.history.pushState(null, "", window.location.href);
      }
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  const { dealerDetails, updateDealerDetails } = useDealerAdmin();
  const router = useRouter(); // Hook for navigation
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
 const [pendingJobsCount, setPendingJobsCount] = useState(0);
  const [activeJobsCount, setActiveJobsCount] = useState(0);
  const [completedJobsCount, setCompletedJobsCount] = useState(0);
 
  // Filter state
  const [serviceType, setServiceType] = useState("");
  const [jobID, setJobID] = useState("");
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    const fetchRecords = async () => {
      const token = sessionStorage.getItem("authTokenDealer");
      try {
        const response = await axios.get("https://zoomautos.co.uk/api/Subcontract", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
        },
          params: { _t: new Date().getTime() } // Add timestamp to bypass cache
      });

        const filteredData = response.data.filter(
          (item:any) =>
            item.customername === dealerDetails.name &&
            item.customercompanyName === dealerDetails.companyName
            && item.customerid===dealerDetails.Id
        );
        const pendingJobs = filteredData.filter((job:any) => job.status === "pending").length;
        const activeJobs = filteredData.filter((job:any) => job.status === "Active").length;
        const completedJobs = filteredData.filter((job:any) => job.status === "Completed"||job.status === "Aborted").length;
  
        setRecords(filteredData);
        setFilteredRecords(filteredData); // Initially show all records
        
        setPendingJobsCount(pendingJobs);
        setActiveJobsCount(activeJobs);
        setCompletedJobsCount(completedJobs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching records:", error);
        setLoading(false);
      }
    };

    fetchRecords();
  }, [dealerDetails]);

  

  const [contactNo, setContactNo] = useState('');
  
  // Fetch the contact number on component mount
  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://zoomautos.co.uk/api/contact',
          {params: {
            _t: new Date().getTime(), // Add timestamp to bypass cache
          },
        }
         );
        setContactNo(response.data.contactNo || '');
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setMessage('Error fetching contact number');
      }
    };
    fetchContact();
  }, []);
  const [address, setAddress] = useState('');
        
  const [message, setMessage] = useState('');
// Function to handle view action
const handleView = (jobId:any) => {
  // Navigate to the RecordDetails page with jobId as a query parameter
  console.log(jobId);
  router.push(`/clientdashboard/active/${jobId}`);
};



  useEffect(() => {
    const storedUser = localStorage.getItem("DealerData");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      updateDealerDetails(user); // Restore user details to context or state
    }
  }, []);
  const openCompletedJobs = () => {
    router.push("/clientdashboard/completed");
  };

  const handleCall = () => {
    
    window.location.href = `tel:${contactNo}`;
  };

  const openPendingJobs = () => {
    router.push("/clientdashboard/pending");
  };
  const openClientProfile = () => {
    router.push("/clientdashboard/editprofile");
  };
  const phoneNumber = "447920810633"; // Replace with your WhatsApp number

  const whatsappLink = `http://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


  const openActiveJobs = () => {
    router.push("/clientdashboard/active");
  };




  const formattedDate = dealerDetails?.createdAt
    ? new Date(dealerDetails.createdAt).toLocaleDateString("en-GB") // dd/mm/yyyy format
    : "N/A";

  return (
  <div className="logisticshomepage-wrapper">
        {/* <img
          src={backgroundImage}
          alt="Logistics Background"
          className="background-image"
        /> */}
  
  
        {/* Dashboard Cards */}
        <div className="dashboard">
        <div className="headerlogistic">
          
          <h1 className="welcome">Welcome {dealerDetails?.name }</h1>
          <span className="date"><MdDateRange/> {new Date().toDateString()}</span>
           </div>
          <div className='columnwiseportal'>
          <div className="cardsdash-container">
            {/* Pending Jobs Card */}
            <div
              className="carddash"
               
              onClick={openPendingJobs}
            >
              <h2>Pending Jobs</h2>
              <p>{pendingJobsCount}</p>
            </div>
  
            {/* Active Jobs Card */}
            <div
              className="carddash"
              
              onClick={openActiveJobs}
            >
              <h2>Active Jobs</h2>
              <p>{activeJobsCount}</p>
            </div>
  
            {/* Completed Jobs Card */}
            <div
              className="carddash"
              
              onClick={openCompletedJobs}
            >
              <h2>Completed Jobs</h2>
              <p>{completedJobsCount}</p>
            </div>
  
            {/* Registered Clients Card */}
            
          </div>
          
          <div className="cardsdash-container">
          <div
              className="carddashcomp"
               
              onClick={openClientProfile}
            >
              <h1 >{dealerDetails.companyName}</h1>
              <div className='form-group' style={{marginTop:'10px'}}> 
                <h3>Username</h3>
                <p>{dealerDetails.username}</p>
              </div>
  <div style={{marginTop:'50px'}}>
              <h1 style={{fontStyle:'normal',fontSize:'1.0rem'}}> Registeration Date:</h1>
              <h1 style={{color:'white', textShadow:'white', textAlign:'left', fontStyle:'italic', fontSize:'1.0rem', marginTop:'-10px'}}> {formattedDate}</h1>
              </div>
            </div>
          </div>
          <div className="cardsdash-container">
            {/* Pending Jobs Card */}
            {/* <div
              className="carddash"
               
              onClick={openPendingJobs}
            >
              <h2>Pending Jobs</h2>
              <p>{pendingJobsCount}</p>
            </div> */}
  
            {/* Active Jobs Card */}
            <div className="carddash" onClick={handleCall}>
  <a href={`tel:${contactNo}`} className="call-button">
    <IoCall size={24} color="#01103b" />
    
  </a>
  <h2>Call Us</h2>
</div>
<div className="carddash" onClick={handleCall}>
<a href="mailto:enquiries@localhost:5000" className="link">
<MdOutlineMailOutline size={24} color="#01103b" />     
            </a>
  <h2>Email Us</h2>
</div>
<div className="carddash" onClick={handleCall}>
<a href={whatsappLink} className="link">
<MdWhatsapp size={24} color="#01103b" />     
            </a>
  <h2>Text Us</h2>
</div>
  
  
            {/* Registered Clients Card */}
            
          </div>
          </div>
          </div>
</div>
        
        
  );
};

export default LogisticsHomepage;
