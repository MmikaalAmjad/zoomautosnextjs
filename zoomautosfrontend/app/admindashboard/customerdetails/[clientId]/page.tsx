"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
const CustomerDetailsWithJobs = () => {
    const { customerId } = useParams(); // Get the customerId from the URL
    const [customer, setCustomer] = useState(null);
    const [customerJobs, setCustomerJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [client, setClient] = useState<any>(null);

  // ✅ Retrieve client from sessionStorage
  useEffect(() => {
    const storedClient = sessionStorage.getItem("selectedClient");
    if (storedClient) {
      setClient(JSON.parse(storedClient));
    }
  }, []);
  
    const [pendingJobsCount, setPendingJobsCount] = useState(0);
      const [activeJobsCount, setActiveJobsCount] = useState(0);
      const [completedJobsCount, setCompletedJobsCount] = useState(0);
      const [registeredClientsCount, setRegisteredClientsCount] = useState(0);
      const [pendingreviews,setpendingreviews]=useState(0);
      const router=useRouter();
      const openCompletedJobs = () => {
        router.push(`/admindashboard/customerdetails/${client._id||client.contactNumber}/complete`,
        );
      };
    
      const openPendingJobs = () => {
        router.push(`/admindashboard/customerdetails/${client._id||client.contactNumber}/pending`,
        );
      };
    
      const openActiveJobs = () => {
        router.push(`/admindashboard/customerdetails/${client._id||client.contactNumber}/active
            `,
        );
      };
      useEffect(() => {
        const fetchData = async () => {
          const token = sessionStorage.getItem("Transport Admin AuthToken");
          try {
            setLoading(true); // Set loading state before fetching data
            const [jobsResponse, clientsResponse] = await Promise.all([
              axios.get("https://zoomautos.co.uk/api/Subcontract"
                , {
                  headers: {
                    Authorization: `Bearer ${token}`, // Include token in headers
                  },
                  params: {
                    _t: new Date().getTime(), // Add timestamp to bypass cache
                  },
                }
              ),
              axios.get("https://zoomautos.co.uk/api/Signup", {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                  _t: new Date().getTime(), // Add timestamp to bypass cache
                },
              }),
            ]);
            const jobsData = jobsResponse.data;
            console.log("Jobs Data:", jobsData);
      
            if (!client) {
              console.warn("Client data is missing");
              setLoading(false);
              return;
            }
      
            const pendingJobs = jobsData.filter((job:any) => {
              if (job.status !== "pending") return false;
              return job.customerid ? job.customerid === client?.Id : (job.customername === client?.name && job.customeremail === client?.email);
            }).length;
      
            const activeJobs = jobsData.filter((job:any) => {
              if (job.status !== "Active") return false;
              return job.customerid ? job.customerid === client?.Id : (job.customername === client?.name && job.customeremail === client?.email);
            }).length;
      
            const completedJobs = jobsData.filter((job:any) => {
              if (job.status !== "Completed") return false;
              return job.customerid ? job.customerid === client?.Id : (job.customername === client?.name && job.customeremail === client?.email);
            }).length;
            console.log(completedJobs)
      
            const pendingReviews = jobsData.filter((job:any) => 
              job.status === "Completed" &&
              (job.customerid ? job.customerid === client?.Id : job.customername === client?.name && job.customeremail === client?.email) &&
              job.Review === "No"
            ).length;
      
            setPendingJobsCount(pendingJobs);
            setActiveJobsCount(activeJobs);
            setCompletedJobsCount(completedJobs);
            setpendingreviews(pendingReviews);
            setRegisteredClientsCount(clientsResponse.data.length);
      
            console.log("Pending Jobs:", pendingJobs);
            console.log("Active Jobs:", activeJobs);
            console.log("Completed Jobs:", completedJobs);
      
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchData();
      }, [client]); // Ensure `client` is a dependency if it changes dynamically
      

if (!client) return <p>Loading client...</p>;
    return (
        <div className='overalls'>
      <div style={{ padding: '20px', overflowX: 'auto' , marginTop:'100px', alignContent:'center',
        justifyContent: 'center', 
        alignItems: 'center', 
      }}>
    
            <div className='filter-container'>
          
          <div style={{display:'flex', flexDirection:'column'}}>
          <h4>Customer Name: {client.name}</h4>
          <h4>Customer Contact: {client.contactNumber}</h4>
          </div>
          <div style={{display:'flex', flexDirection:'column'}}>
          <h4>Customer Email: { client.email}</h4>
          <h4>Customer Address: {client.Address          }</h4>
          </div>
          
          </div>

          <div className="dashboard">
        
        <div className="cardsdash2-container">
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
          <div
            className="carddash"
            
            onClick={openCompletedJobs}
          >
            <h2>Pending FeedBack</h2>
            <p>{pendingreviews}</p>
          </div>

      </div>
      </div>


            
        </div>
        </div>
        
    );
};

export default CustomerDetailsWithJobs;
