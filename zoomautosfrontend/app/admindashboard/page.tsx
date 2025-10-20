"use client"
import React, { useEffect, useState } from "react";
import "./logisticshomepage.css";
import axios from 'axios';
import { useTransportAdmin } from "@/components/transportadmincontext/admincontext";
import { usePathname, useRouter } from "next/navigation";
import { MdDateRange } from "react-icons/md";

interface LogoData {
  Image: string[];
}
const LogisticsAdminHomepage = () => {
  const { TransportAdminDetails, updateTransportAdminDetails } = useTransportAdmin();
  const navigate = useRouter();
const location=usePathname();
  // State for dashboard counts
  const [pendingJobsCount, setPendingJobsCount] = useState(0);
  const [activeJobsCount, setActiveJobsCount] = useState(0);
  const [completedJobsCount, setCompletedJobsCount] = useState(0);
  const [registeredClientsCount, setRegisteredClientsCount] = useState(0);
  const [loading, setLoading] = useState(true);
const [logos, setLogosCount] = useState(0);
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const res = await fetch("/api/logos?_t=" + new Date().getTime());

if (!res.ok) {
  const errorText = await res.text(); // read body only on error
  throw new Error(errorText || "Failed to fetch logos");
}

const data: LogoData[] = await res.json(); // safe to parse JSON now

        setLogosCount(data.length);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching logos:", error);
        setLoading(false);
      }
    };

    fetchLogos();
  }, []);
  
   const [token, setToken] = useState<string | null>(null);

useEffect(() => {
  const storedToken = sessionStorage.getItem("Transport Admin AuthToken");
  setToken(storedToken);
}, []);
useEffect(() => {
  if (!token) return; // ✅ Only run if token exists

  const fetchData = async () => {
    try {
      
      const clientsResponse = await axios.get("/api/registration", {
        params: { _t: new Date().getTime() },
      });

const response = await fetch(`/api/subcontract?_t=${new Date().getTime()}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

if (!response.ok) {
  throw new Error(`Error fetching subcontract jobs: ${response.status}`);
}

const jobsData = await response.json();

const pendingJobs = jobsData.filter((job: any) => job.status.toLowerCase() === "pending").length;
const activeJobs = jobsData.filter((job: any) => job.status.toLowerCase() === "active").length;
const completedJobs = jobsData.filter(
  (job: any) => job.status.toLowerCase() === "completed" || job.status.toLowerCase() === "aborted"
).length;

console.log("Pending:", pendingJobs, "Active:", activeJobs, "Completed:", completedJobs);

      setPendingJobsCount(pendingJobs);
      setActiveJobsCount(activeJobs);
      setCompletedJobsCount(completedJobs);
      setRegisteredClientsCount(clientsResponse.data.length);

      console.log("Jobs Data:", jobsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [token]); // ✅ Run whenever token is set
  // Navigation functions
  const openCompletedJobs = () => {
    navigate.push("/admindashboard/completed");
  };

  const openPendingJobs = () => {
    navigate.push("/admindashboard/pending");
  };

  const openActiveJobs = () => {
    navigate.push("/admindashboard/active");
  };

  const openRegisteredClients = () => {
    navigate.push("/admindashboard/registeredclients");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
        <h1 >Welcome {TransportAdminDetails?.username || "Admin"}</h1>
        <span className="date"><MdDateRange/> {new Date().toDateString()}</span>
      </div>
      </div>
      
        <div className="cardsdash2-container">
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
          <div
            className="carddash"
            
            onClick={openRegisteredClients}
          >
            <h2>Registered Clients</h2>
            <p>{registeredClientsCount}</p>
          </div>
          <div
            className="carddash"
            
            onClick={openRegisteredClients}
          >
            <h2>Add Logos</h2>
            <p>{logos}</p>
          </div>
        </div>
        </div>
      
    
  );
};

export default LogisticsAdminHomepage;