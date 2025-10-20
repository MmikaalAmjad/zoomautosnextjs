"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Define interfaces for types
interface JobCount {
  _id?: string;
  count?: number;
  companyName?: string;
  email?: string;
  contactNumber?: string;
  contact?: string;
  username?: string;
  customeraddress?: string;
  Address?: string;
  PostCode?: string;
  city?: string;
  [key: string]: any;
}

interface Client {
  _id?: string;
  Id?: string;
  username?: string;
  name?: string;
  email?: string;
  contactNumber?: string;
  companyName?: string;
  Address?: string;
  PostCode?: string;
  city?: string;
  [key: string]: any;
}

const RegisteredClientsTable: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [jobCountsByCompany, setJobCountsByCompany] = useState<JobCount[]>([]);
  const [jobCountsNoCompany, setJobCountsNoCompany] = useState<JobCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router =useRouter();
  const [stagedClient, setStagedClient] = useState<Client | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("Transport Admin AuthToken");
      try {
        const [clientsResponse, byCompanyResponse, noCompanyResponse] = await Promise.all([
          axios.get('/api/registration', {
            params: { _t: new Date().getTime() }, // Bypass cache
          }),
          axios.get('/api/subcontract?type=by-company', {
            headers: { Authorization: `Bearer ${token}` },
            params: { _t: new Date().getTime() },
          }),
          axios.get('/api/subcontract?type=by-company', {
            headers: { Authorization: `Bearer ${token}` },
            params: { _t: new Date().getTime() },
          }),
        ]);

        setClients(clientsResponse.data);
        setJobCountsByCompany(byCompanyResponse.data);
        setJobCountsNoCompany(noCompanyResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

const handleRowClick = (client: any) => {
  // Store full client object in sessionStorage
  sessionStorage.setItem("selectedClient", JSON.stringify(client));

  // Navigate to the client details page
  router.push(`/admindashboard/customerdetails/${client._id || client.contactNumber}`);
};


  return (
    <div className='overalls'>
      <img src="/Summary.png" alt="Logistics Background" className="background-image2" />
      <div style={{ padding: '20px', overflowX: 'auto', marginTop: '80px' }}>
        <h1 style={{ color: 'white' }}>Registered Clients with Job Counts</h1>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Company Name</th>
                <th>Address</th>
                <th>Post Code</th>
                <th>City</th>
                <th>Job Count</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => {
                let jobCount = 0;
                if (client.companyName) {
                  const jobCountByCompany = jobCountsByCompany.find(
                    (job) => job._id === client.Id
                  );
                  jobCount = jobCountByCompany?.count ?? 0;
                }

                return (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(client)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{client.username ?? 'N/A'}</td>
                    <td>{client.name ?? 'N/A'}</td>
                    <td>{client.email ?? 'N/A'}</td>
                    <td>{client.contactNumber ?? 'N/A'}</td>
                    <td>{client.companyName ?? 'N/A'}</td>
                    <td>{client.Address ?? 'N/A'}</td>
                    <td>{client.PostCode ?? 'N/A'}</td>
                    <td>{client.city ?? 'N/A'}</td>
                    <td>{jobCount}</td>
                  </tr>
                );
              })}

              {jobCountsNoCompany.map((client, index) => (
                <tr
                  key={index}
                  onClick={() =>
                    handleRowClick({
                      name: client._id || 'N/A',
                      email: client.email || 'N/A',
                      contactNumber: client.contact || 'N/A',
                      Address: client.customeraddress || 'N/A',
                    })
                  }
                  style={{ cursor: 'pointer' }}
                >
                  <td>{client.username || 'N/A'}</td>
                  <td>{client._id || 'N/A'} (Individual)</td>
                  <td>{client.email || 'N/A'}</td>
                  <td>{client.contactNumber || 'N/A'}</td>
                  <td>{client.companyName || 'N/A'}</td>
                  <td>{client.Address || 'N/A'}</td>
                  <td>{client.PostCode || 'N/A'}</td>
                  <td>{client.city || 'N/A'}</td>
                  <td>{client.count ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegisteredClientsTable;
