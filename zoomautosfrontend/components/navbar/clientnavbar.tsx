import React, { useState, useEffect, useRef, useCallback } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useDealerAdmin } from "../clientcontext/clientcontext";
import { useJobListener } from "@/app/hooks/joblistener";
const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const location = usePathname();
  const navigate = useRouter();
   
  const [records, setRecords] = useState(0);
  const [token, setToken] = useState<string | null>(null); 
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = sessionStorage.getItem("authTokenDealer");
      setToken(storedToken);
    }
  }, []);

  const isActiveLink = (path:any) => location === path;

  // Memoized fetchRecords to prevent unnecessary recreations
  const fetchRecords = useCallback(async () => {
    if (!token) return;
    
    try {
      const response = await axios.get("https://zoomautos.co.uk/api/Subcontract", {
        headers: { Authorization: `Bearer ${token}` },
        params: { _t: new Date().getTime() }
      });

      const filteredData = response.data.filter(
        (item:any) => item.status === "Active" && item.viewbyclient === false
      );

      setRecords(filteredData.length);
    } catch (error) {
      console.error("❌ Error fetching records:", error);
    }
  }, [token]);

  // Initial fetch and periodic refresh
  useEffect(() => {
  if (token) {
    fetchRecords();
  }
}, [token, fetchRecords]);
const { dealerDetails, updateDealerDetails } = useDealerAdmin();
useEffect(() => {
    const storedUser = localStorage.getItem('DealerData');
    console.log("LocalStorage Data:", storedUser); // Debugging

    if (storedUser) {
        try {
            const user = JSON.parse(storedUser);
            if (user?.Id) {
                updateDealerDetails(user); // Set dealer details
            } else {
                console.log("DealerData is missing 'Id'.");
            }
        } catch (error) {
            console.error("Error parsing DealerData:", error);
        }
    } else {
        console.log("No DealerData found in localStorage.");
    }
}, []);
   

useJobListener(dealerDetails?.Id, fetchRecords);

  // Update view status when navigating to ActiveJobs
  useEffect(() => {
    if (location === "/dealerdashboard/active") {
      const updateViewStatus = async () => {
        try {
          const response = await axios.get("https://zoomautos.co.uk/api/Subcontract", {
            headers: { Authorization: `Bearer ${token}` },
            params: { _t: new Date().getTime() }
          });

          const updates = response.data
            .filter((item:any) => item.status === "Active" && item.viewbyclient === false)
            .map((item:any) => 
              axios.patch(
                `https://zoomautos.co.uk/api/Subcontract/${item.jobId}`, 
                { viewbyclient: true },
                { headers: { Authorization: `Bearer ${token}` } }
              )
            );

          await Promise.all(updates);
          setRecords(0);
        } catch (error) {
          console.error("❌ Error updating view status:", error);
        }
      };
      updateViewStatus();
    }
  }, [location, token]);

  // Socket.IO connection management
  
  const handleLogout = () => {
    sessionStorage.removeItem("authTokenDealer");
    localStorage.removeItem("DealerData");
    navigate.push("/login");
  };

  return (
    <div>
      <nav className="top-navbar">
        <button className="sidenav-toggle" onClick={() => setIsActive(!isActive)}>
          &#9776;
        </button>
        <div className="navbar-actions">
          <button className="login-btn" onClick={handleLogout}>LogOut</button>
        </div>
      </nav>

      <div className={`sidenav ${isActive ? "active" : ""}`}>
        <div className="sidenav-logo">
          <Link href="/">
            <img src="/Logo4.png" alt="Logo" />
          </Link>
        </div>
        <button className="close-btn" onClick={() => setIsActive(false)}>
          &times;
        </button>

        <ul>
          <li><Link href="/clientdashboard" className={isActiveLink("/clientdashboard") ? "active-link" : ""}>Home</Link></li>
          <li><Link href="/clientdashboard/subcontract" className={isActiveLink("/clientdashboard/subcontract") ? "active-link" : ""}>Get A Quote</Link></li>
          <li><Link href="/clientdashboard/pending" className={isActiveLink("/clientdashboard/pending") ? "active-link" : ""}>Pending Quotes</Link></li>
          <li>
            <Link href="/clientdashboard/active" className={isActiveLink("/clientdashboard/active") ? "active-link" : ""}>
              Active Jobs 
              {records > 0 && <span className="quote-count">{records}</span>}
            </Link>
          </li>
          <li><Link href="/clientdashboard/completed" className={isActiveLink("/clientdashboard/completed") ? "active-link" : ""}>Completed Jobs</Link></li>
          <li><Link href="/clientdashboard/editaccount" className={isActiveLink("/clientdashboard/editaccount") ? "active-link" : ""}>Edit Profile</Link></li>
          <li><Link href="/clientdashboard/review" className={isActiveLink("/clientdashboard/review") ? "active-link" : ""}>Feedback</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;