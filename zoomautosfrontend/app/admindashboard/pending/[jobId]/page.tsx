"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "next/navigation";


import { usePathname, useRouter } from "next/navigation";
const RecordDetails = () => {
  const { jobId } = useParams(); // Get the jobId from the URL
  const token = sessionStorage.getItem("Transport Admin AuthToken");
      
  const router=useRouter();
  const ViewForm = () => {
    router.push(`/admindashboard/${jobId}/Form`);
    
  };
  const [record, setRecord] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecordById = async () => {
      console.log('Fetching record for jobId:', jobId); // Log the jobId being used
      try {
        const response = await axios.get(`/api/subcontract/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
        },
          params: { _t: new Date().getTime() } // Add timestamp to bypass cache
      });
        console.log('Fetched record:', response.data); // Log the fetched record

        setRecord(response.data); // Set the fetched record to state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching record by ID:', error);
        setLoading(false);
      }
    };

    if (jobId) {
      fetchRecordById(); // Fetch the record only if jobId exists
    }
  }, [jobId]); // Add jobId to the dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='overalls'>
      <div style={{ padding: '20px', overflowX: 'auto' , marginTop:'100px', alignContent:'center',
        justifyContent: 'center', 
        alignItems: 'center', 
      }}>
      <h1 style={{ textAlign: 'center' }}>Record Details</h1>
      {record ? (
        <div>
          <div className='filter-container'>
          <h3>Job ID: {record.jobId}</h3>
          <div style={{display:'flex', flexDirection:'column'}}>
          <h4>Customer Name: {record.customername}</h4>
          <h4>Customer Contact: {record.customercontact}</h4>
          </div>
          <div style={{display:'flex', flexDirection:'column'}}>
          <h4>Customer Email: { record.customeremail}</h4>
          <h4>Customer Address: {record.customeraddress}</h4>
          </div>
          <div style={{display:'flex', flexDirection:'column'}}>
          <h4>Job Type</h4>
          <h4>{ record.servicetype}</h4>
          
          </div>
          <div style={{display:'flex', flexDirection:'column'}}>
          <h4>Movememnt Type</h4>
          <h4>{ record.movement}</h4>
          
          </div>
          <button className='buttonm' onClick={ViewForm} >View Form</button>
          </div>

          {record.servicetype === "STANDARD" && (
            <>
              {/* Car Details Table */}
              
              <div className='grid-item'>
              <h3>Vehicle Details</h3>
              <div className='table-container'>
              <table>
                    <tr>
                    <th>Reg/VIN</th>
                    <td>{record.vehicleRegistration||record.vin}</td>
                    </tr>
                    <tr>
                    <th>Car Make</th>
                    <td>{record.manufacturer}</td>
                    </tr>
                    <tr>
                    <th>Model</th>
                    <td>{record.model}</td>
                    </tr>
                    
                    <tr>
                    <th>MOT Status</th>
                    <td>{record.motStatus}</td>
                    </tr>
                    <tr>
                    <th>Tax Status</th>
                    <td>{record.taxStatus}</td>
                    </tr>
                    <tr>
                    <th>Colour</th>
                    <td>{record.colour}</td>
                    </tr>
                  
                
              </table>
              </div>
              </div>
<div className='grid-container'>
              {/* Collection Address Table */}
              <div className='grid-item'>
              <h3>Collection Address</h3>
              <div className='table-container'>
              <table 
>
  <tr>
                    <th>Postcode</th>
                    <td>{record.postCode}</td>
                    </tr>
                    <tr>
                    <th>Address</th>
                    <td>{record.collectionAddress}</td>
                    </tr>
                    <tr>
                    <th>City</th>
                    <td>{record.City}</td>
                    </tr>
                    <tr>
                    <th>Contact Name</th>
                    <td>{record.contactName}</td>
                    </tr>
                    <tr>
                    <th>Contact Phone</th>
                    <td>{record.contactPhone}</td>
                  </tr>
                
              </table>
              </div>
              </div>
<div className='grid-item'>
              {/* Drop Off Address Table */}
              <h3>Drop Off Address</h3>
              <div className='table-container'>
              <table 
>
  <tr>
                    <th>Postcode</th>
                    <td>{record.dropoffpostCode}</td>
                    </tr>
                    <tr>
                    <th>Address</th>
                    <td>{record.dropoffAddress}</td>
                    </tr>
                    <tr>
                    <th>City</th>
                    <td>{record.dropofftownCity}</td>
                    </tr>
                    <tr>
                    <th>Contact Name</th>
                    <td>{record.dropoffcontactName}</td>
                    </tr>
                    <tr>
                    <th>Contact Phone</th>
                    <td>{record.dropoffcontactPhone}</td>
                  </tr>
                
              </table>              
              </div>
              </div>
              </div>

              {/* Customer Details Table */}
             
            </>
          )}

          {record.servicetype === "ONWARD VEHICLE" && (
            
              <>
               {record.Onwardvehicle.map((obj:any, index:any) => (
      <>
      <div className='grid-item'>
      <h1>Vehicle {index+1} Details</h1>
      <div className='table-container'>
      <table>
        <tr>
        <th>Reg/VIN</th>
        <td>{obj.vehicleRegistration||obj.vin}</td>
        </tr>
        <tr>
        <th>Make</th>
        <td>{obj.manufacturer||'N/A'}</td>
        </tr>
        <tr>
        <th>Model</th>
        <td>{obj.model||'N/A'}</td>
        </tr>
        <tr>
        <th>Tax Status</th>
        <td>{obj.taxStatus||'N/A'}</td>
        </tr>
        <tr>
        <th>MOT Status</th>
        <td>{obj.motStatus||'N/A'}</td>
        </tr>
        <tr>
        <th>Color</th>
        <td>{obj.colour||'N/A'}</td>
        </tr>
        
        

        
      </table>
      </div>
      </div>
      <div className='grid-container'>
   <div className='grid-item'>
    <h1> Collection Details Vehicle {index+1}</h1>
    <div className='table-container'>
      <table>
        <tr>
        <th>Postcode</th>
        <td>{obj.collectionAddress.collectionPostCode}</td>
        </tr>
        <tr>
        <th>Address</th>
        <td>{obj.collectionAddress.Address}</td>
        </tr>
        <tr>
        <th>City</th>
        <td>{obj.collectionAddress.collectionTownCity}</td>
        </tr>
        <tr>
        <th>Contact Name</th>
        <td>{obj.collectionAddress.collectionContactName}</td>
        </tr>
        <tr>
        <th>Contact Phone</th>
        <td>{obj.collectionAddress.collectionContactPhone}</td>
        </tr>
        
</table>
</div>

   </div>
   <div className='grid-item'>
    <h1> Delivery Details Vehicle {index+1}</h1>
    <div className='table-container'>
      <table>
        <tr>
        <th>Postcode</th>
        <td>{obj.dropPostCode}</td>
        </tr>
        <tr>
        <th>Address</th>
        <td>{obj.dropAddress}</td>
        </tr>
        <tr>
        <th>City</th>
        <td>{obj.dropTownCity}</td>
        </tr>
        <tr>
        <th>Contact Name</th>
        <td>{obj.dropContactName}</td>
        </tr>
        <tr>
        <th>Contact Phone</th>
        <td>{obj.dropContactPhone}</td>
        </tr>
        
</table>


   </div>
   </div>

      </div>
      </>
    ))}
            
                {/* Customer Details Table */}
                
              </>
            )}


  {record.servicetype==="MULTI DROP OFF" &&(
    <>
    <div className='grid-container'>
    {record.multidropoff.map((obj:any, index:any) => (
      <>
      <div className='grid-item'>
      <h1>Vehicle {index+1} Details</h1>
      <div className='table-container'>
      <table>
        <tr>
        <th>Reg/VIN</th>
        <td>{obj.vehicleRegistration||obj.vin}</td>
        </tr>
        <tr>
        <th>Make</th>
        <td>{obj.manufacturer||'N/A'}</td>
        </tr>
        <tr>
        <th>Model</th>
        <td>{obj.model||'N/A'}</td>
        </tr>
        <tr>
        <th>Tax Status</th>
        <td>{obj.taxStatus||'N/A'}</td>
        </tr>
        <tr>
        <th>MOT Status</th>
        <td>{obj.motStatus||'N/A'}</td>
        </tr>
        <tr>
        <th>Color</th>
        <td>{obj.colour||'N/A'}</td>
        </tr>
        
        

        
      </table>
      </div>
      </div>
      </>
    ))}
    </div>
    <div className='grid-container'>
      <div className='grid-item'>
    <h3>Collection Details</h3>
    <div className='table-container'>
              <table 
  
>

                
                  <tr>
                    <th>Postcode</th>
                    <td>{record.postCode}</td>
                    </tr>
                    <tr>
                    <th>Address</th>
                    <td>{record.collectionAddress}</td>
                    
                    </tr>
                    <tr>
                      
                    <th>City</th>
                    <td>{record.City}</td>
                    </tr>
                    <tr>
                    <th>Contact Name</th>
                    <td>{record.contactName}</td>
                    </tr>
                    <tr>
                    <th>Contact Phone</th>
                    <td>{record.contactPhone}</td>
                    </tr>
                  
                
                
              </table>
              </div>
              </div>
              <div className='grid-item'>
              <h3>Delivery Details</h3>
              <div className='table-container'>
              <table 
  
>

                
                  <tr>
                    <th>Postcode</th>
                    <td>{record.dropoffpostCode}</td>
                    </tr>
                    <tr>
                    <th>Address</th>
                    <td>{record.dropoffAddress}</td>
                    
                    </tr>
                    <tr>
                      
                    <th>City</th>
                    <td>{record.dropofftownCity}</td>
                    </tr>
                    <tr>
                    <th>Contact Name</th>
                    <td>{record.dropoffcontactName}</td>
                    </tr>
                    <tr>
                    <th>Contact Phone</th>
                    <td>{record.dropoffcontactPhone}</td>
                    </tr>
                  
                
                
              </table>
              </div>
              </div>
              
              </div>
              
    </>

  )}
  {record.servicetype==="RETURN JOB" &&(
    <>
    {record.vehicles.map((obj:any, index:any) => (
      <>
      <div className='grid-item'>
      <h1>Vehicle {index+1} Details</h1>
      <div className='table-container'>
      <table>
        <tr>
        <th>Reg/VIN</th>
        <td>{obj.vehicleRegistration||obj.vin}</td>
        </tr>
        <tr>
        <th>Make</th>
        <td>{obj.manufacturer||'N/A'}</td>
        </tr>
        <tr>
        <th>Model</th>
        <td>{obj.model||'N/A'}</td>
        </tr>
        <tr>
        <th>Tax Status</th>
        <td>{obj.taxStatus||'N/A'}</td>
        </tr>
        <tr>
        <th>MOT Status</th>
        <td>{obj.motStatus||'N/A'}</td>
        </tr>
        <tr>
        <th>Color</th>
        <td>{obj.colour||'N/A'}</td>
        </tr>
        
        

        
      </table>
      </div>
      </div>
      </>
    ))}
    
    <div className='grid-container'>
      <div className='grid-item'>
    <h3>Collection Details</h3>
    <div className='table-container'></div>
              <table 
  
>

                
                  <tr>
                    <th>Postcode</th>
                    <td>{record.collectionpostCode}</td>
                    </tr>
                    <tr>
                    <th>Address</th>
                    <td>{record.collectionAddress}</td>
                    
                    </tr>
                    <tr>
                      
                    <th>City</th>
                    <td>{record.collectiontownCity}</td>
                    </tr>
                    <tr>
                    <th>Contact Name</th>
                    <td>{record.collectioncontactName}</td>
                    </tr>
                    <tr>
                    <th>Contact Phone</th>
                    <td>{record.collectioncontactPhone}</td>
                    </tr>
                  
                
                
              </table>
              </div>
              </div>
              <div className='grid-item'>
              <h3>Delivery Details</h3>
              <div className='table-container'>
              <table 
  
>

                
                  <tr>
                    <th>Postcode</th>
                    <td>{record.dropoffpostCode}</td>
                    </tr>
                    <tr>
                    <th>Address</th>
                    <td>{record.dropoffAddress}</td>
                    
                    </tr>
                    <tr>
                      
                    <th>City</th>
                    <td>{record.dropofftownCity}</td>
                    </tr>
                    <tr>
                    <th>Contact Name</th>
                    <td>{record.dropoffcontactName}</td>
                    </tr>
                    <tr>
                    <th>Contact Phone</th>
                    <td>{record.dropoffcontactPhone}</td>
                    </tr>
                  
                
                
              </table>
              
              </div>
              
              </div>

              {record.returnVehicles.map((obj:any, index:any) => (
      <>
      <div className='grid-item'>
      <h1>Return Vehicle {index+1} Details</h1>
      <div className='table-container'>
      <table>
        <tr>
        <th>Reg/VIN</th>
        <td>{obj.vehicleRegistration||obj.vin}</td>
        </tr>
        <tr>
        <th>Make</th>
        <td>{obj.manufacturer||'N/A'}</td>
        </tr>
        <tr>
        <th>Model</th>
        <td>{obj.model||'N/A'}</td>
        </tr>
        <tr>
        <th>Tax Status</th>
        <td>{obj.taxStatus||'N/A'}</td>
        </tr>
        <tr>
        <th>MOT Status</th>
        <td>{obj.motStatus||'N/A'}</td>
        </tr>
        <tr>
        <th>Color</th>
        <td>{obj.colour||'N/A'}</td>
        </tr>
        
        

        
      </table>
      </div>
      </div>
      </>
    ))}
    
    <div className='grid-container'>
      <div className='grid-item'>
    <h3>Collection Details</h3>
    <div className='table-container'>
              <table 
  
>

                
                  <tr>
                    <th>Postcode</th>
                    <td>{record.returncollectionpostCode}</td>
                    </tr>
                    <tr>
                    <th>Address</th>
                    <td>{record.returncollectionAddress}</td>
                    
                    </tr>
                    <tr>
                      
                    <th>City</th>
                    <td>{record.returncollectiontownCity}</td>
                    </tr>
                    <tr>
                    <th>Contact Name</th>
                    <td>{record.returncollectioncontactName}</td>
                    </tr>
                    <tr>
                    <th>Contact Phone</th>
                    <td>{record.returncollectioncontactPhone}</td>
                    </tr>
                  
                
                
              </table>
              </div>
              </div>
              <div className='grid-item'>
              <h3>Delivery Details</h3>
              <div className='table-container'>
              <table 
  
>

                
                  <tr>
                    <th>Postcode</th>
                    <td>{record.returndropoffpostCode}</td>
                    </tr>
                    <tr>
                    <th>Address</th>
                    <td>{record.returndropoffAddress}</td>
                    
                    </tr>
                    <tr>
                      
                    <th>City</th>
                    <td>{record.returndropofftownCity}</td>
                    </tr>
                    <tr>
                    <th>Contact Name</th>
                    <td>{record.returndropoffcontactName}</td>
                    </tr>
                    <tr>
                    <th>Contact Phone</th>
                    <td>{record.returndropoffcontactPhone}</td>
                    </tr>
                  
                
                
              </table>
              </div></div>
              
              </div>

    </>

  )} 
   <div className='grid-container'>
              <div className='grid-item'>
              <h3>Collection not Earlier than</h3>
              
              {Boolean(record.specificFromTime) ||record.fromTime!=="ANYTIME"? (
                <div className='table-container'>
               <table
               
             >
               <thead>
                 <tr>
                   <th >Date</th> {/* Ensure headers are also red */}
                   <th >Time</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td style={{ color: 'red' }}>{record.fromDate}</td>
                   <td style={{ color: 'red' }}>{record.fromTime ||'ANYTIME'}</td>
                 </tr>
               </tbody>
             </table>
             </div>
             ) : (
              <div className='table-container'>
                <table
                
              >
    <thead>
      <tr>
        <th>Date</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{record.fromDate}</td>
        <td>{record.fromTime ||'ANYTIME'}</td>
      </tr>
    </tbody>
  </table>
  </div>
              )}
              </div>
              <div className='grid-item'>
              <h3>Delivery Not Later Than:</h3>
              {Boolean(record.specificToTime) ||record.toTime!=="ANYTIME" ? (
                <div className='table-container'>
               <table
               
             >
               <thead>
                 <tr>
                   <th >Date</th> {/* Ensure headers are also red */}
                   <th >Time</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td style={{ color: 'red' }}>{record.toDate}</td>
                   <td style={{ color: 'red' }}>{record.toTime ||'ANYTIME'}</td>
                 </tr>
               </tbody>

             </table>
             </div>
             ) : (
              <div className='table-container'>
                <table
                
              >
    <thead>
      <tr>
        <th>Date</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{record.toDate}</td>
        <td>{record.toTime ||'ANYTIME'}</td>
      </tr>
    </tbody>
  </table>
  </div>
  
              )}
              </div>
              </div>
<div className='grid-container'> 
                <div className='grid-item'>
              <h3>Customer Details</h3>
              <div className='table-container'>
              <table 
  
>

                    <tr>
                    <th>Customer Name</th>
                    <td>{record.customercompanyName || record.customername}</td>
                    </tr>
                    <tr>
                    <th>Customer Email</th>
                    <td>{record.customeremail}</td>
                    </tr>
                    <tr>
                    <th>Customer Contact</th>
                    <td>{record.customercontact}</td>
                    </tr>
                    <tr>
                    <th>Customer Address</th>
                    <td>{record.customeraddress}</td>
                    </tr>
                  
                
               
              </table>
              </div>
              </div>
              <div className='grid-item'>
              <h3>Price Details</h3>
              <div className='table-container'>
              <table 
  
>

<tr>
                    <th>Price</th>
                    <td style={{ fontWeight: 700 }}> £ {record.price ||'N/A'}+VAT</td>
                    </tr>
                    <tr>
                    <th>Additional Cost</th>
                    <td style={{ fontWeight: 700 }}>£ {record.additionalCost||'N/A'} +VAT</td>
                    </tr>
                    <tr>
                    <th>Additional Cost Reason</th>
                    <td style={{ fontWeight: 700 }}>
                                                          
                                                          
                                                          
                                                             {record.additionalCostReason||'N/A'}
                                                          
                                                        </td>

                    </tr>
                    
                    
                
               
              </table>
              </div>
              </div>
              </div>  
  
          
        </div>
      ) : (
        <p>No details available for this job.</p>
      )}
      
    </div>
    
    </div>
  );
};

export default RecordDetails;
