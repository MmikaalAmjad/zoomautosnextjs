"use client";
import React, { useState , useEffect} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import './navbar.css'

const SidebarAdmin = () => {
  const [isActive, setIsActive] = useState(false);
  const location = usePathname(); // Get current location
 const [token, setToken] = useState<string | null>(null);
   useEffect(() => {
    setToken(sessionStorage.getItem("Transport Admin AuthToken"));
  }, []);
  
  const toggleSidebar = () => setIsActive(!isActive);
  const closeSidebar = () => setIsActive(false);
const router=useRouter();
const setviewbyadmin =()=>{
if (location==="/admindashboard/active"){

}
}
  const isActiveLink = (path:any) => location === path;
  const handlelogout =()=>{
    localStorage.removeItem('TransportData');
    localStorage.removeItem('Transport Admin AuthToken');
    router.push("/")
    
  }

  const [jobIds, setJobIds] = useState([]);
const [records, setRecords] = useState(0);

useEffect(() => {
  const fetchRecords = async () => {
    try {
      const token = sessionStorage.getItem("Transport Admin AuthToken");
if (!token) {
  console.error("No token found. User might not be logged in.");
  return;
}

      const response = await axios.get("https://zoomautos.co.uk/api/Subcontract", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { _t: new Date().getTime() }, // Bypass cache
      });

      const filteredData = response.data.filter(
        (item:any) => item.status === "Active" && item.viewbyadmin === false
      );

      const jobIdsList = filteredData.map((item:any) => item.jobId);
      setRecords(filteredData.length);
      setJobIds(jobIdsList);

      // Update `viewbyadmin` if on Active Jobs page
      if (location === "/admindashboard/active" && jobIdsList.length > 0) {
        await Promise.all(
          jobIdsList.map(async (jobId:Number) => {
            try {
              await axios.patch(
                `https://zoomautos.co.uk/api/Subcontract/${jobId}`,
                { viewbyadmin: true }, // Data payload
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
            } catch (error) {
              console.error(`Error updating job ${jobId}:`, error);
            }
          })
        );

        // After successful updates, reset count and jobIds
        setRecords(0);
        setJobIds([]);
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  fetchRecords();
}, [location]); // Depend on pathname and token


  return (
    <div>
      {/* Top Navbar */}
      <nav className="top-navbar">
        <button className="sidenav-toggle" onClick={toggleSidebar}>
          &#9776; {/* Hamburger Icon */}
        </button>
        <div className="navbar-actions">
          <button className="login-btn" onClick={handlelogout}>LogOut</button>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidenav ${isActive ? "active" : ""}`}>
        {/* Logo */}
        <div className="sidenav-logo">
          <Link href="/">
            <img src="/Logo4.png" alt="Logo" />
            
          </Link>
        </div>

        {/* Close Button */}
        <button className="close-btn" onClick={closeSidebar}>
          &times;
        </button>

        {/* Navigation Links */}
        <ul>
          <li>
            <Link
             href="/admindashboard"
              onClick={closeSidebar}
              className={isActiveLink("/admindashboard") ? "active-link" : ""}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
             href="/admindashboard/pending"
              onClick={closeSidebar}
              className={
                isActiveLink("/admindashboard/pending") ? "active-link" : ""
              }
            >
              Pending Jobs
            </Link>
          </li>
          <li>
            <Link
             href="/admindashboard/active"
              onClick={closeSidebar}
              className={isActiveLink("/admindashboard/active") ? "active-link" : ""}
            >
             Active Jobs 
            {records>0&&(
             <span className="quote-count">{records}</span>
            )} 
            </Link>
          </li>
          <li>
            <Link
             href="/admindashboard/completed"
              onClick={closeSidebar}
              className={isActiveLink("/admindashboard/completed") ? "active-link" : ""}
            >
              Completed Jobs
            </Link>
          </li>

          
          <li>
            <Link
             href="/admindashboard/customerlist"
              onClick={closeSidebar}
              className={isActiveLink("/admindashboard/customerlist") ? "active-link" : ""}
            >
              Registered Clients
            </Link>
          </li>
          <li>
            <Link
             href="/admindashboard/customerdetails"
              onClick={closeSidebar}
              className={isActiveLink("/admindashboard/customerdetails") ? "active-link" : ""}
            >
              Customer Jobs
            </Link>
          </li>
          <li>
            <Link
             href="/admindashboard/logos"
              onClick={closeSidebar}
              className={isActiveLink("/admindashboard/logos") ? "active-link" : ""}
            >
              Logos
            </Link>
          </li>
          <li>
            <Link
             href="/admindashboard/addroles"
              onClick={closeSidebar}
              className={isActiveLink("/admindashboard/addroles") ? "active-link" : ""}
            >
              Roles
            </Link>
          </li>
          <li>
            <Link
             href="/admindashboard/responsibilites"
              onClick={closeSidebar}
              className={isActiveLink("/admindashboard/responsibilites") ? "active-link" : ""}
            >
              Responsibilites
            </Link>
          </li>
          <li>
            <Link
             href="/admindashboard/timing"
              onClick={closeSidebar}
              className={isActiveLink("/admindashboard/timing") ? "active-link" : ""}
            >
              Time
            </Link>
          </li>
          <li>
            <Link
             href="/admindashboard/whatwedo"
              onClick={closeSidebar}
              className={isActiveLink("/admindashboard/whatwedo") ? "active-link" : ""}
            >
              What We do
            </Link>
          </li>
          <li>
            <Link
             href="/admindashboard/emaildriver"
              onClick={closeSidebar}
              className={isActiveLink("/admindashboard/emaildriver") ? "active-link" : ""}
            >
              Driver
            </Link>
            </li>
          {/* <li>
            
            <Link
             href="/admindashboard/Feedback"
              onClick={closeSidebar}
              className={isActiveLink("/admindashboard/Feedback") ? "active-link" : ""}
            >
              Feedback
            </Link>
          </li> */}
          <li>
            <Link
             href="/admindashboard/services"
              onClick={closeSidebar}
              className={isActiveLink("/admindashboard/services") ? "active-link" : ""}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
             href="/admindashboard/changeemail"
              onClick={closeSidebar}
              className={isActiveLink("/admindashboard/changeemail") ? "active-link" : ""}
            >
              Email
            </Link>
          </li>
          <li>
            <Link
             href="/admindashboard/location"
              onClick={closeSidebar}
              className={isActiveLink("/admindashboard/location") ? "active-link" : ""}
            >
              Location
            </Link>
          </li>
          <li>
            <Link
             href="/admindashboard/contact"
              onClick={closeSidebar}
              className={isActiveLink("/admindashboard/contact") ? "active-link" : ""}
            >
              Contact
            </Link>
          </li>
          
          
        </ul>
      </div>
    </div>
  );
};

export default SidebarAdmin;
