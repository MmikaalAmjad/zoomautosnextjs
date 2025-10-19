"use client"
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useParams } from "next/navigation";

import { usePathname, useRouter } from "next/navigation";
const RecordFormActive = () => {
  const { jobId } = useParams(); 

  const [record, setRecord] = useState(null);
  const router=useRouter();
  
  const handleSharedAddressChange = (e:any) => {
    const { name, value } = e.target;
    setSharedCollectionAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
    const [sharedCollectionAddress, setSharedCollectionAddress] = useState({
      collectionContactName: '',
      collectionContactPhone: '',
      collectionAddress: '',
      collectionTownCity: '',
      collectionPostCode: '',
    });
  const [loading, setLoading] = useState(true);
    // const [formData, setFormData] = useState({
      
    //   roadworthy: '',
    //   fuelRequired:'',
    //   manufacturer:'',
    //   model:'',
    //   carType:'',
      
    //   taxStatus:'',
      
    // customername:'',
    // customeremail:'',
    // customercontact:'',
    // customeraddress:'',
    // customerusername:'',
    // customercompanyName:'',
    // customerPostCode:'',
    // customercity:'',
    //   vin:'',
    //   motStatus:'',
    //   colour:'',
    //   vehicleRegistration:'',
    //   collectionAddress: '',
    //   townCity: '',
    //   postCode: '',
      
    //   contactName: '',
    //   contactPhone: '',
    //   dropoffAddress: '',
    //   dropofftownCity: '',
    //   dropoffpostCode: '',
    //   dropoffcontactName: '',
    //   dropoffcontactPhone: '',
    //   fromDate: '',
    //   fromTime: '',
    //   toDate: '',
    //   toTime: '',
    //   notes: '',
    //   releaseNotes: '',
    //   jobId: '', // Add jobId to formData
    // });
    const [formData, setFormData] = useState<Record<string, any>>({})
    const token = sessionStorage.getItem("Transport Admin AuthToken");
      
    
    const [price, setPrice] = useState("£");
const handleInputChange = (e:any, index:any) => {
      const { name, value } = e.target;
    
      const updatedVehicles = [...formData.Onwardvehicle];
    
      if (
        name === "collectionContactName" ||
        name === "collectionContactPhone" ||
        name === "Address" ||
        name === "collectionTownCity" ||
        name === "collectionPostCode"
      ) {
        updatedVehicles[index] = {
          ...updatedVehicles[index],
          collectionAddress: {
            ...updatedVehicles[index].collectionAddress,
            [name]: value,
          },
        };
      } else if (
        name === "dropContactName" ||
        name === "dropContactPhone" ||
        name === "dropAddress" ||
        name === "dropTownCity" ||
        name === "dropPostCode"
      ) {
        updatedVehicles[index] = {
          ...updatedVehicles[index],
          [name]: value, // drop fields are top-level
        };
      } else {
        // Everything else — carMake, carModel, regNo, etc.
        updatedVehicles[index] = {
          ...updatedVehicles[index],
          [name]: value,
        };
      }
    
      setFormData({
        ...formData,
        Onwardvehicle: updatedVehicles,
      });
    };
    const handleReturnVehiclesInputChange = (e:any, index:any) => {
      const { name, value } = e.target;
    
      const updatedVehicles = [...formData.returnVehicles];
    
      if (
        name === "collectionContactName" ||
        name === "collectionContactPhone" ||
        name === "Address" ||
        name === "collectionTownCity" ||
        name === "collectionPostCode"
      ) {
        updatedVehicles[index] = {
          ...updatedVehicles[index],
          collectionAddress: {
            ...updatedVehicles[index].collectionAddress,
            [name]: value,
          },
        };
      } else if (
        name === "dropContactName" ||
        name === "dropContactPhone" ||
        name === "dropAddress" ||
        name === "dropTownCity" ||
        name === "dropPostCode"
      ) {
        updatedVehicles[index] = {
          ...updatedVehicles[index],
          [name]: value, // drop fields are top-level
        };
      } else {
        // Everything else — carMake, carModel, regNo, etc.
        updatedVehicles[index] = {
          ...updatedVehicles[index],
          [name]: value,
        };
      }
    
      setFormData({
        ...formData,
        returnVehicles: updatedVehicles,
      });
    };
    const handleVehiclesInputChange = (e:any, index:any) => {
      const { name, value } = e.target;
    
      const updatedVehicles = [...formData.vehicles];
    
      if (
        name === "collectionContactName" ||
        name === "collectionContactPhone" ||
        name === "Address" ||
        name === "collectionTownCity" ||
        name === "collectionPostCode"
      ) {
        updatedVehicles[index] = {
          ...updatedVehicles[index],
          collectionAddress: {
            ...updatedVehicles[index].collectionAddress,
            [name]: value,
          },
        };
      } else if (
        name === "dropContactName" ||
        name === "dropContactPhone" ||
        name === "dropAddress" ||
        name === "dropTownCity" ||
        name === "dropPostCode"
      ) {
        updatedVehicles[index] = {
          ...updatedVehicles[index],
          [name]: value, // drop fields are top-level
        };
      } else {
        // Everything else — carMake, carModel, regNo, etc.
        updatedVehicles[index] = {
          ...updatedVehicles[index],
          [name]: value,
        };
      }
    
      setFormData({
        ...formData,
        vehicles: updatedVehicles,
      });
    };
    const handleMultiInputChange = (e:any, index:any) => {
      const { name, value } = e.target;
    
      const updatedVehicles = [...formData.multidropoff];
    
      if (
        name === "collectionContactName" ||
        name === "collectionContactPhone" ||
        name === "Address" ||
        name === "collectionTownCity" ||
        name === "collectionPostCode"
      ) {
        updatedVehicles[index] = {
          ...updatedVehicles[index],
          collectionAddress: {
            ...updatedVehicles[index].collectionAddress,
            [name]: value,
          },
        };
      } else if (
        name === "dropContactName" ||
        name === "dropContactPhone" ||
        name === "dropAddress" ||
        name === "dropTownCity" ||
        name === "dropPostCode"
      ) {
        updatedVehicles[index] = {
          ...updatedVehicles[index],
          [name]: value, // drop fields are top-level
        };
      } else {
        // Everything else — carMake, carModel, regNo, etc.
        updatedVehicles[index] = {
          ...updatedVehicles[index],
          [name]: value,
        };
      }
    
      setFormData({
        ...formData,
        multidropoff: updatedVehicles,
      });
    };
    const handlePriceChange = (e:any) => {
      let value = e.target.value;
  
      // Ensure the input always starts with "£"
      if (!value.startsWith("£")) {
        value = "£" + value.replace(/£/g, ""); // Remove any extra £ signs
      }
  
      setPrice(value);
    };
  
    const [deletionloading,setDeletionLoading]=useState(false);
        const [deletemessage, setdeletemessage]=useState("")
    const [includeVat, setIncludeVat] = useState(false);

const handleVatChange = (e:any) => {
  setIncludeVat(e.target.checked);
};
        
    const handleSubmit = async () => {
      try {
        const numericPriceString = price.replace("£", "").trim(); // still a string
const numericPrice = Number(numericPriceString); // convert to number

setDeletionLoading(true);
setdeletemessage(`Activating JobID ${jobId}`);

if (!numericPrice || isNaN(numericPrice) || numericPrice <= 0) {
  alert("Please enter a valid price.");
  setDeletionLoading(false);
  return;
}

        
        
        await axios.patch(
          `https://zoomautos.co.uk/api/Subcontract/${jobId}`,
          {
            ...formData, // Spread existing form data
            status: "Active",
            price: parseFloat(price.replace("£", "").trim()),
vat:includeVat,
            viewbyadmin: false,
            viewbyclient: false,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add JWT token
              "Content-Type": "application/json", // Ensure JSON format
            },
          }
        );
        
        alert("Job details updated successfully");
        setDeletionLoading(false);
  
        // Fetch updated records
        const response = await axios.get("https://zoomautos.co.uk/api/Subcontract", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
        },
          params: { _t: new Date().getTime() } // Add timestamp to bypass cache
      });
        setRecord(response.data);
  
        
        router.push(`/admindashboard/pending`)
        const response2 = await axios.post("https://zoomautos.co.uk/api/Email/sendActivation-email", 
          {
            ...formData,  // Spread existing form data
            status: 'Active',
            price: parseFloat(price),
            
          } ,
          {
              headers: {
                  "Content-Type": "application/json",
              },
          });
      
          if (response2.status === 200) {
              console.log("✅ Email sent successfully!");
          } else {
              console.log("⚠️ Unexpected response:", response2.status);
          }
      }
       catch (error) {
        console.error("Error updating job details:", error);
      }
    }
      const [activeButton, setActiveButton] = useState(null);
    
      const handleButtonClick = (button:any) => {
        setActiveButton(button);
        console.log(`${button} clicked`);
      };

      const handleChange = (e:any) => {
        const { name, value } = e.target; // Extract name and value from event
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
      
  useEffect(() => {
    const fetchRecordById = async () => {
      console.log('Fetching record for jobId:', jobId); // Log the jobId being used
      try {
        const response = await axios.get(`https://zoomautos.co.uk/api/Subcontract/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
        },
          params: { _t: new Date().getTime() } // Add timestamp to bypass cache
      });
        console.log('Fetched record:', response.data); // Log the fetched record

        setFormData(response.data); // Set the fetched record to state
        console.log(formData.carType);
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
        <h1>JOB ID: {formData.jobId}</h1>
        <h1>Service Type: {formData.servicetype}</h1>
        <div className="move-container">
        
        <div className="mve-form">
<div className='form-row'>
  <div className='form-group'>
    <label htmlFor="price">Price</label>
    <input
      type="text"
      id="price"
      value={price}
      onChange={handlePriceChange}
      placeholder="£0.00"
    />
    
  </div>
  <div className="vat-checkbox">
      <input
        type="checkbox"
        id="includeVat"
        checked={includeVat}
        onChange={handleVatChange}
      />
      <label htmlFor="includeVat">Include VAT</label>
    </div>
</div>
        {formData.servicetype==="MULTI DROP OFF" &&(
            <>
             <h2>Customer Details</h2>
             <div className="form-row">
               <div className="form-group">
                 <label htmlFor="customername">Customer Name</label>
                 <input
                   type="text"
                   id="customername"
                   name="customername"
                   value={formData.customername}
                   
                   required
                 />
               </div>
               <div className="form-group">
                 <label htmlFor="customercontact">Contact</label>
                 <input
                   type="text"
                   id="customercontact"
                   name="customercontact"
                   value={formData.customercontact}
                   
                   required
                 />
               </div>
             </div>
             <div className="form-row">
               <div className="form-group">
                 <label htmlFor="customeremail">Email</label>
                 <input
                   type="text"
                   id="customeremail"
                   name="customeremail"
                   value={formData.customeremail}
                   
                   required
                 />
               </div>
               <div className="form-group">
                 <label htmlFor="customeraddress">Address</label>
                 <input
                   type="text"
                   id="customeraddress"
                   name="customeraddress"
                   value={formData.customeraddress}
                   
                   required
                 />
               </div>
               </div>
               <h2>Services</h2>
               <div className='form-row'>
             <div className="form-group">
                     <label htmlFor="roadworthy">Vehicle MOT/ Roadworthy?</label>
                     <select id="roadworthy" name="roadworthy" value={formData.roadworthy} onChange={handleChange} required>
                     <option value="" disabled selected hidden>
                     Vehicle MOT/ Roadworthy?
           </option>
         <option value="yes">Yes</option>
         <option value="no">No</option>
       </select>
       
       
                   </div>
                   <div className="form-group">
                     <label htmlFor="fuel">Fuel Required?</label>
                     <select id="fuel" name="fuel" value={formData.fuel} onChange={handleChange} required>
                     <option value="" disabled selected hidden>
                     Fuel Required?
           </option>
         <option value="yes">Yes</option>
         <option value="no">No</option>
       </select>
       
                   </div>
                 
                   </div>
                   <div className='form-row'>
            <div className="form-group">
              <label htmlFor="movement">Movement Type?</label>
              <select id="movement" name="movement" value={formData.movement} onChange={handleChange} required>
              <option value="" disabled selected hidden>
              Movement Type?
    </option>
    <option value="INTERNAL TRANSFER">INTERNAL TRANSFER</option>
<option value="TRADE VEHICLE">TRADE VEHICLE</option>
<option value="MOTABILITY">MOTABILITY</option>
<option value="RETAIL DELIVERY">RETAIL DELIVERY</option>
<option value="FLEET DELIVERY">FLEET DELIVERY</option>
<option value="BREAKDOWN RECOVERY">BREAKDOWN RECOVERY</option>
<option value="OTHERS" >OTHERS</option>


</select>


            </div>
            <div className="form-group">
              <label htmlFor="service">Service Type?</label>
              <select id="service" name="service" value={formData.service} onChange={handleChange} required>
              <option value="" disabled selected hidden>
              Service Type?
    </option>
    <option value="DRIVEN">DRIVEN</option>
<option value="TRANSPORT">TRANSPORT</option>
<option value="ANY" >ANY</option>

</select>


            </div>
            
            </div>
    
               {formData.multidropoff.map((form:any, index:any) => (
         <div key={form.id} className="vehicle-form-section">
                
           {/* Primary Vehicle Details */}
           <h2>Vehicle Details {index + 1}</h2>
                  <div className="form-row" style={{ alignContent: 'center' }}>
                <div className="form-group">
         <label >Car Type</label>
         <div className="buttonb-bar">
         {["New Car", "Used Car"].map((button) => (
         <button
           key={button}
           type="button"
           className={`buttonb ${
             formData.multidropoff[index] &&
       formData.multidropoff[index].carType === button
         ? "active"
         : ""
       
           }`}
           onClick={() => handleButtonClick( button)} // Pass correct index
         >
           {button}
         </button>
       ))}
       
         </div>
       </div>
       
           </div>
           {
           
           formData.multidropoff[index].carType==="New Car" &&(
             <>
                  
                  <div className="form-row">
             <div className="form-group">
               <label>Make</label>
               <input
                 type="text"
                 name="manufacturer"
                 required
                 onChange={(e) => handleMultiInputChange(e, index)}
                 value={formData?.multidropoff[index]?.manufacturer}
                 
               />

             </div>
             
             <div className="form-group">
               <label>Model</label>
               <input
                 type="text"
                 name="model"
                 required
                 value={formData?.multidropoff[index]?.model}
                 onChange={(e) => handleMultiInputChange(e, index)}
               />
               
             </div>
       
             </div>
             <div className="form-row">
           <div className="form-group">
               <label>Chassis/VIN</label>
               <input
                 type="text"
                 name="vin"
                 required
                 value={formData?.multidropoff[index]?.vin}
                 onChange={(e) => handleMultiInputChange(e, index)}
                 
               />
             </div>
             <div className="form-group">
               <label>Colour</label>
               <input
                 type="text"
                 name="colour"
                 value={formData?.multidropoff[index]?.colour}
                 required
                 onChange={(e) => handleMultiInputChange(e, index)}
               />
             </div>
           </div> 
       
       
                  </>
           )}
       
       {formData.multidropoff[index].carType==="Used Car" &&(
             <>
                  
           {/* Vehicle Registration Input */}
           <div className="form-group">
           <label htmlFor={`vehicleRegistration-${index}`}>Vehicle Registration</label>
         <input
           type="text"
           id={`vehicleRegistration-${index}`}
           name="vehicleRegistration"
           value={formData?.multidropoff[index]?.vehicleRegistration || ''}
           onChange={(e) => handleMultiInputChange(e, index)}
           required
         />
         
           </div>
       
           {/* Make and Model Inputs */}
           <div className="form-row">
             <div className="form-group">
               <label>Make</label>
               <input
                 type="text"
                 name="manufacturer"
                 value={formData?.multidropoff[index]?.manufacturer || ""} // Bind the value to the state
               required
               onChange={(e) => handleMultiInputChange(e, index)}
               />
               
             </div>
       
             <div className="form-group">
               <label>Model<span style={{color:'red', fontSize:'0.8rem'}}> (Required)</span></label>
               <input
                 type="text"
                 name="model"
                 value={formData?.multidropoff[index]?.model || ""} // Bind the value to the state
                 // Handle onChange for dynamic vehicles
                 required
                 onChange={(e) => handleMultiInputChange(e, index)}
               />
               
             </div>
             <div className="form-group">
               <label>Chassis/VIN</label>
               <input
                 type="text"
                 name="vin"
                 value={formData?.multidropoff[index]?.vin || ""} // Bind the value to the state
                 // Handle onChange for dynamic vehicles
                 onChange={(e) => handleMultiInputChange(e, index)}
               />
             </div>
           </div>
       
           {/* Chassis/VIN and Vehicle Registration */}
           <div className="form-row">
             
             <div className="form-group">
               <label>Tax Status</label>
               <input
                 type="text"
                 name="taxStatus"
                 value={formData?.multidropoff[index]?.taxStatus || ""} // Bind the value to the state
                 // Handle onChange for dynamic vehicles
                 required
                 onChange={(e) => handleMultiInputChange(e, index)}
               />
             </div>
             <div className="form-group">
               <label>MOT Status</label>
               <input
                 type="text"
                 name="motStatus"
                 value={formData?.multidropoff[index]?.motStatus || ""} // Bind the value to the state
                 // Handle onChange for dynamic vehicles
                 required
                 onChange={(e) => handleMultiInputChange(e, index)}
               />
             </div>
             <div className="form-group">
               <label>Colour</label>
               <input
                 type="text"
                name="colour"
                 value={formData?.multidropoff[index]?.colour || ""} // Bind the value to the state
                 // Handle onChange for dynamic vehicles
                 required
                 onChange={(e) => handleMultiInputChange(e, index)}
               />
             </div>
           </div> 
           </>
           )}
           </div>
       
       ))}
         
               
       <h2>Collection Details</h2>
             <div className='form-row'>
             <div className='form-group'>
               <label htmlFor="contactName">Contact Name</label>
               <input
                   type="text"
                   id="contactName"
                   name="contactName"
                   value={formData.contactName}
                   onChange={handleChange}
                   required
                 />
             </div>
             <div className='form-group'>
               <label htmlFor="contactPhone">Contact Phone</label>
               <input
                   type="text"
                   id="contactPhone"
                   name="contactPhone"
                   value={formData.contactPhone}
                   onChange={handleChange}
                   required
                 />
             </div>
             </div>
             
       
           
               
             <div className="form-row">
               <div className="form-group">
                 <label htmlFor="collectionAddress">Collection Address:</label>
                 <input
                   type="text"
                   id="collectionAddress"
                   name="collectionAddress"
                   value={formData.collectionAddress}
                   onChange={handleChange}
                   required
                 />
               </div>
               <div className="form-group">
               <label htmlFor="City">City:</label>
                 <input
                   type="text"
                   id="City"
                   name="City"
                   value={formData.City}
                   onChange={handleChange}
                   required
                 />
               </div>
               <div className="form-group">
               <label htmlFor="postCode">Post Code:</label>
                 <input
                   type="text"
                   id="postCode"
                   name="postCode"
                   value={formData.postCode}
                   onChange={handleChange}
                   required
                 />
               </div>
             </div>
       
             <h2>Drop-Off Details</h2>
             
             <div className='form-row'>
             <div className='form-group'>
               <label htmlFor="dropoffcontactName">Contact Name</label>
               <input
                   type="text"
                   id="dropoffcontactName"
                   name="dropoffcontactName"
                   value={formData.dropoffcontactName}
                   onChange={handleChange}
                   required
                 />
             </div>
             <div className='form-group'>
               <label htmlFor="dropoffcontactPhone">Contact Phone</label>
               <input
                   type="text"
                   id="dropoffcontactPhone"
                   name="dropoffcontactPhone"
                   value={formData.dropoffcontactPhone}
                   onChange={handleChange}
                   required
                 />
             </div>
             </div>
             <div className="form-row">
               <div className="form-group">
                 <label htmlFor="dropoffAddress">Drop Off Address:</label>
                 <input
                   type="text"
                   id="dropoffAddress"
                   name="dropoffAddress"
                   value={formData.dropoffAddress}
                   onChange={handleChange}
                   required
                 />
               </div>
               <div className="form-group">
                 <label htmlFor="dropofftownCity">Town/City:</label>
                 <input
                   type="text"
                   id="dropofftownCity"
                   name="dropofftownCity"
                   value={formData.dropofftownCity}
                   onChange={handleChange}
                   required
                 />
               </div>
               <div className="form-group">
                 <label htmlFor="dropoffpostCode">Post Code:</label>
                 <input
                   type="text"
                   id="dropoffpostCode"
                   name="dropoffpostCode"
                   value={formData.dropoffpostCode}
                   onChange={handleChange}
                   required
                 />
               </div>
             </div>
       
        {/* Date and Time Section */}
        <h2>Date and Time</h2>
             <div className="form-row">
               <div className="form-group">
               <label>Collection Not Earlier Than:</label>
       <input
         type="date"
         name="fromDate"
         value={formData.fromDate}
         min={new Date().toISOString().split('T')[0]} // Set today's date as the minimum
         onChange={(e) =>
           setFormData((prevData) => ({
             ...prevData,
             fromDate: e.target.value,
           }))
         }
       />
       
               </div>
               <div className="form-group">
                 <label>To Date:</label>
                 <input
                   type="date"
                   name="toDate"
                   value={formData.toDate}
                   min={formData.fromDate} // Set today's date as the minimum
         
                   onChange={(e) =>
                     setFormData((prevData) => ({
                       ...prevData,
                       toDate: e.target.value,
                     }))
                   }
                 />
               </div>
             </div>
             <div className="form-row">
  {/* From Time Section */}
  <div className="form-group">
    <label htmlFor="fromTime">From Time:</label>
    <div className="input-container">
      <select
        id="fromTime"
        name="fromTime"
        value={formData.fromTime}
        onChange={handleChange}
        required
      >
        <option value="ANYTIME">ANYTIME</option>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>

      {/* Checkbox and Label inside the same row */}
      <input
        type="checkbox"
        id="specificFromTime"
        name="specificFromTime"
        checked={formData.specificFromTime || false}
        onChange={handleChange}
      />
      <label htmlFor="specificFromTime">Specific Date</label>
    </div>
  </div>

  {/* To Time Section */}
  <div className="form-group">
    <label htmlFor="toTime">To Time:</label>
    <div className="input-container">
      <select
        id="toTime"
        name="toTime"
        value={formData.toTime}
        onChange={handleChange}
        required
      >
        <option value="ANYTIME">ANYTIME</option>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>

      {/* Checkbox and Label inside the same row */}
      <input
        type="checkbox"
        id="specificToTime"
        name="specificToTime"
        checked={formData.specificToTime || false}
        onChange={handleChange}
      />
      <label htmlFor="specificToTime">Specific Date</label>
    </div>
  </div>
</div>
       
             <h2>Additional Information</h2>
             <div className="form-group">
               <label htmlFor="notes">Notes:</label>
               <textarea
                 id="notes"
                 name="notes"
                 value={formData.notes}
                 onChange={handleChange}
                 placeholder="Additional notes"
                 
               />
             </div>
       
             <div className="form-group">
               <label htmlFor="releaseNotes">Release Notes:</label>
               <textarea
                 id="releaseNotes"
                 name="releaseNotes"
                 value={formData.releaseNotes}
                 onChange={handleChange}
                 placeholder="Release notes"
                 
               />
             </div>
             </>
        )}
     
        {formData.servicetype==="STANDARD" &&(
            <>
        <h2>Customer Details</h2>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="customername">Customer Name</label>
          <input
            type="text"
            id="customername"
            name="customername"
            value={formData.customername}
            
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customercontact">Contact</label>
          <input
            type="text"
            id="customercontact"
            name="customercontact"
            value={formData.customercontact}
            
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="customeremail">Email</label>
          <input
            type="text"
            id="customeremail"
            name="customeremail"
            value={formData.customeremail}
            
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customeraddress">Address</label>
          <input
            type="text"
            id="customeraddress"
            name="customeraddress"
            value={formData.customeraddress}
            
            required
          />
        </div>
        </div>
        <h2>Services</h2>
    <div className='form-row'>
      <div className="form-group">
              <label htmlFor="roadworthy">Vehicle MOT/ Roadworthy?</label>
              <select id="roadworthy" name="roadworthy" value={formData.roadworthy}onChange={handleChange}  required>
              <option value="" disabled>
              Vehicle MOT/ Roadworthy?
    </option>
  <option value="yes">Yes</option>
  <option value="no">No</option>
</select>


            </div>
            <div className="form-group">
              <label htmlFor="fuel">Fuel Required?</label>
              <select id="fuel" name="fuel" value={formData.fuel} onChange={handleChange} required>
              <option value="" disabled selected hidden>
              Fuel Required?
    </option>
  <option value="yes">Yes</option>
  <option value="no">No</option>
</select>

            </div>
            
    </div>
    <div className='form-row'>
            <div className="form-group">
              <label htmlFor="movement">Movement Type?</label>
              <select id="movement" name="movement" value={formData.movement} onChange={handleChange} required>
              <option value="" disabled selected hidden>
              Movement Type?
    </option>
    <option value="INTERNAL TRANSFER">INTERNAL TRANSFER</option>
<option value="TRADE VEHICLE">TRADE VEHICLE</option>
<option value="MOTABILITY">MOTABILITY</option>
<option value="RETAIL DELIVERY">RETAIL DELIVERY</option>
<option value="FLEET DELIVERY">FLEET DELIVERY</option>

<option value="BREAKDOWN RECOVERY">BREAKDOWN RECOVERY</option>
<option value="OTHERS" >OTHERS</option>

</select>


            </div>
            <div className="form-group">
              <label htmlFor="service">Service Type?</label>
              <select id="service" name="service" value={formData.service} onChange={handleChange} required>
              <option value="" disabled selected hidden>
              Service Type?
    </option>
    <option value="DRIVEN">DRIVEN</option>
<option value="TRANSPORT">TRANSPORT</option>
<option value="ANY" >ANY</option>

</select>


            </div>
            
            </div>
     
    {formData.carType === "Used Car" && (
  <>
{/* Vehicle Registration */}
<div className="form-row">
  <div className="form-group">
    <label htmlFor="vehicleRegistration">Vehicle Registration</label>
    <input
      type="text"
      id="vehicleRegistration"
      name="vehicleRegistration"
      value={formData.vehicleRegistration} // Corrected
      onChange={handleChange}
      required
    />
    <button
      
      type="button"
      className="contact-button"
    >
      Lookup
    </button>
  </div>
</div>

{/* Vehicle Details */}
<div className="form-row">
  <div className="form-group">
    <label htmlFor="manufacturer">Make</label>
    <input
      type="text"
      id="manufacturer"
      name="manufacturer"
      value={formData.manufacturer}
      onChange={handleChange}
      required
    />
  </div>
  <div className="form-group">
    <label htmlFor="model">Model</label>
    <input
      type="text"
      id="model"
      name="model"
      value={formData.model || ""} // Corrected
      onChange={handleChange}
      required
    />
  </div>
  <div className="form-group">
    <label htmlFor="vin">Chasis/VIN</label>
    <input
  type="text"
  id="vin"
  name="vin"
  value={formData.vin || ""}
  onChange={handleChange}
  required
/>

  </div>
</div>

{/* Tax and MOT Details */}
<div className="form-row">
  <div className="form-group">
    <label htmlFor="taxStatus">Tax Status</label>
    <input
      type="text"
      id="taxStatus"
      name="taxStatus"
      value={formData.taxStatus || ""} // Corrected
      onChange={handleChange}
      required
    />
  </div>
  <div className="form-group">
    <label htmlFor="motStatus">MOT Status</label>
    <input
      type="text"
      id="motStatus"
      name="motStatus"
      value={formData.motStatus || ""} // Corrected
      onChange={handleChange}
      required
    />
  </div>
  <div className="form-group">
    <label htmlFor="colour">Colour</label>
    <input
      type="text"
      id="colour"
      name="colour"
      value={formData.colour || ""} // Corrected
      onChange={handleChange}
      required
    />
  </div>
</div>

  </>
)}


{formData.carType==="New Car" &&(
            <>
            <h2>New Vehicle Details</h2>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="manufacturer">Make</label>
          <input
            type="text"
            id="manufacturer"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Model</label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="colour">Colour</label>
          <input
            type="text"
            id="colour"
            name="colour"
            value={formData.colour}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="vin">Chasis/VIN</label>
          <input
            type="text"
            id="vin"
            name="vin"
            value={formData.vin}
            onChange={handleChange}
            required
          />
        </div>
        </div>
        </>
          )}
          
      
      <h2>Collection Details</h2>
      <div className='form-row'>
      <div className='form-group'>
        <label htmlFor="contactName">Contact Name</label>
        <input
            type="text"
            id="contactName"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            required
          />
      </div>
      <div className='form-group'>
        <label htmlFor="contactPhone">Contact Phone</label>
        <input
            type="text"
            id="contactPhone"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            required
          />
      </div>
      </div>
      

    
        
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="collectionAddress">Collection Address:</label>
          <textarea
            
            id="collectionAddress"
            name="collectionAddress"
            value={formData.collectionAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
        <label htmlFor="City">City:</label>
          <input
            id="City"
            name="City"
            value={formData.City}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
        <label htmlFor="postCode">Post Code:</label>
          <input
            id="postCode"
            name="postCode"
            value={formData.postCode}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <h2>Drop-Off Details</h2>
      
      <div className='form-row'>
      <div className='form-group'>
        <label htmlFor="dropoffcontactName">Contact Name</label>
        <input
            type="text"
            id="dropoffcontactName"
            name="dropoffcontactName"
            value={formData.dropoffcontactName}
            onChange={handleChange}
            required
          />
      </div>
      <div className='form-group'>
        <label htmlFor="dropoffcontactPhone">Contact Phone</label>
        <input
            type="text"
            id="dropoffcontactPhone"
            name="dropoffcontactPhone"
            value={formData.dropoffcontactPhone}
            onChange={handleChange}
            required
          />
      </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dropoffAddress">Drop Off Address:</label>
          <textarea
            
            id="dropoffAddress"
            name="dropoffAddress"
            value={formData.dropoffAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dropofftownCity">Town/City:</label>
          <input
            type="text"
            id="dropofftownCity"
            name="dropofftownCity"
            value={formData.dropofftownCity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dropoffpostCode">Post Code:</label>
          <input
            type="text"
            id="dropoffpostCode"
            name="dropoffpostCode"
            value={formData.dropoffpostCode}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <h2>Date and Time</h2>
      <div className="form-row">
        <div className="form-group">
        <label>Collection Not Earlier Than:</label>
<input
  type="date"
  name="fromDate"
  value={formData.fromDate}
  min={new Date().toISOString().split('T')[0]} // Set today's date as the minimum
  onChange={(e) =>
    setFormData((prevData) => ({
      ...prevData,
      fromDate: e.target.value,
    }))
  }
/>

        </div>
        <div className="form-group">
          <label>Delivery Not Later Than:</label>
          <input
            type="date"
            name="toDate"
            value={formData.toDate}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                toDate: e.target.value,
              }))
            }
          />
        </div>
      </div>
      <div className="form-row">
  {/* From Time Section */}
  <div className="form-group">
    <label htmlFor="fromTime">From Time:</label>
    <div className="input-container">
      <select
        id="fromTime"
        name="fromTime"
        value={formData.fromTime}
        onChange={handleChange}
        required
      >
        <option value="ANYTIME">ANYTIME</option>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>

      {/* Checkbox and Label inside the same row */}
      <input
        type="checkbox"
        id="specificFromTime"
        name="specificFromTime"
        checked={formData.specificFromTime || false}
        onChange={handleChange}
      />
      <label htmlFor="specificFromTime">Specific Date</label>
    </div>
  </div>

  {/* To Time Section */}
  <div className="form-group">
    <label htmlFor="toTime">To Time:</label>
    <div className="input-container">
      <select
        id="toTime"
        name="toTime"
        value={formData.toTime}
        onChange={handleChange}
        required
      >
        <option value="ANYTIME">ANYTIME</option>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>

      {/* Checkbox and Label inside the same row */}
      <input
        type="checkbox"
        id="specificToTime"
        name="specificToTime"
        checked={formData.specificToTime || false}
        onChange={handleChange}
      />
      <label htmlFor="specificToTime">Specific Date</label>
    </div>
  </div>
</div>

      <h2>Additional Information</h2>
      <div className="form-group">
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional notes"
          
        />
      </div>

      <div className="form-group">
        <label htmlFor="releaseNotes">Release Notes:</label>
        <textarea
          id="releaseNotes"
          name="releaseNotes"
          value={formData.releaseNotes}
          onChange={handleChange}
          placeholder="Release notes"
          
        />
        </div>

</>
      
  )}

  {(formData.servicetype==="RETURN JOB" &&(
    <>
        <h2>Services</h2>
        <div className='form-row'>
         <div className="form-group">
                 <label htmlFor="roadworthy">Vehicle MOT/ Roadworthy?</label>
                 <select id="roadworthy" name="roadworthy" value={formData.roadworthy}  required>
                 <option value="" disabled selected hidden>
                 Vehicle MOT/ Roadworthy?
       </option>
     <option value="yes">Yes</option>
     <option value="no">No</option>
   </select>
   
   
               </div>
               <div className="form-group">
                 <label htmlFor="fuel">Fuel Required?</label>
                 <select id="fuel" name="fuel" value={formData.fuel}  required>
                 <option value="" disabled selected hidden>
                 Fuel Required?
       </option>
     <option value="yes">Yes</option>
     <option value="no">No</option>
   </select>
   
               </div>
               </div>
               <div className='form-row'>
            <div className="form-group">
              <label htmlFor="movement">Movement Type?</label>
              <select id="movement" name="movement" value={formData.movement} onChange={handleChange} required>
              <option value="" disabled selected hidden>
              Movement Type?
    </option>
    <option value="INTERNAL TRANSFER">INTERNAL TRANSFER</option>
<option value="TRADE VEHICLE">TRADE VEHICLE</option>
<option value="MOTABILITY">MOTABILITY</option>
<option value="RETAIL DELIVERY">RETAIL DELIVERY</option>
<option value="FLEET DELIVERY">FLEET DELIVERY</option>
<option value="BREAKDOWN RECOVERY">BREAKDOWN RECOVERY</option>
<option value="OTHERS" >OTHERS</option>


</select>


            </div>
            <div className="form-group">
              <label htmlFor="service">Service Type?</label>
              <select id="service" name="service" value={formData.service} onChange={handleChange} required>
              <option value="" disabled selected hidden>
              Service Type?
    </option>
    <option value="DRIVEN">DRIVEN</option>
<option value="TRANSPORT">TRANSPORT</option>
<option value="ANY" >ANY</option>

</select>


            </div>
            
            </div>
             {formData.vehicles.map((form:any, index:any) => (
     <div key={form.id} className="vehicle-form-section">
              <h2>Vehicle Details {index + 1}</h2>
              <div className='form-row' style={{alignContent:'center'}}>
               <div className='form-group'>
     <label htmlFor="Cartype">Car Type</label>
     <div className="buttonb-bar">
       {["New Car", "Used Car"].map((button) => (
         <button
           key={button}
           type="button"
           className={`buttonb ${formData.vehicles[index].carType === button ? "active" : ""}`}
           onClick={() => handleButtonClick(button)} // Pass index to handleButtonClick
         >
           {button}
         </button>
       ))}
     </div>
   </div>
   
       </div>  
       {
       
       formData.vehicles[index]?.carType==="New Car" &&(
         <>
              
              <div className="form-row">
         <div className="form-group">
           <label>Make</label>
           <input
             type="text"
             name="manufacturer"
             value={formData?.vehicles[index]?.manufacturer || ""} // Fallback to empty string if value is undefined or null
             onChange={(e) => handleVehiclesInputChange(e, index)}

             
             
           />

         </div>
         
         <div className="form-group">
           <label>Model</label>
           <input
             type="text"
             name="model"
             value={formData?.vehicles[index]?.model || ""}
             onChange={(e) => handleVehiclesInputChange(e, index)}
              // Handle onChange for dynamic vehicles
           />
           
         </div>
   
         </div>
         <div className="form-row">
       <div className="form-group">
           <label>Chassis/VIN</label>
           <input
             type="text"
             name="vin"
             onChange={(e) => handleVehiclesInputChange(e, index)}
             value={formData?.vehicles[index]?.vin || ""} // Bind the value to the state
              // Handle onChange for dynamic vehicles
           />
         </div>
         <div className="form-group">
           <label>Colour</label>
           <input
             type="text"
             name="colour"
             onChange={(e) => handleVehiclesInputChange(e, index)}
             value={formData?.vehicles[index]?.colour || ""} // Bind the value to the state
              // Handle onChange for dynamic vehicles
           />
         </div>
       </div> 
   
   
              </>
       )}
       {formData.vehicles[index]?.carType==="Used Car" &&(
         <>
   
       
       {/* Vehicle Registration Input */}
       <div className="form-group">
       <label htmlFor={`vehicleRegistration-${index}`}>Vehicle Registration</label>
     <input
       type="text"
       id={`vehicleRegistration-${index}`}
       name="vehicleRegistration"
       value={formData?.vehicles[index]?.vehicleRegistration || ''}
       onChange={(e) => handleVehiclesInputChange(e, index)}
       required
     />
   
       </div>
   
       {/* Make and Model Inputs */}
       <div className="form-row">
       <div className="form-group">
     <label>Manufacturer</label>
     <input
     type="text"
     name="manufacturer" // This is important to target the correct key in the state
     value={formData?.vehicles[index]?.manufacturer || ""} // Fallback to empty string if value is undefined or null
     onChange={(e) => handleVehiclesInputChange(e, index)}
   />
   </div>
   
   <div className="form-group">
     <label>Model</label>
     <input
       type="text"
       name="model"
       value={formData?.vehicles[index]?.model || ""}
       onChange={(e) => handleVehiclesInputChange(e, index)}
     />
   </div>
   
   <div className="form-group">
     <label>VIN</label>
     <input
       type="text"
       name="vin"
       onChange={(e) => handleVehiclesInputChange(e, index)}
       
     />
   </div>
   
   
   
       </div>
   
       {/* Chassis/VIN and Vehicle Registration */}
       <div className="form-row">
         
         <div className="form-group">
           <label>Tax Status</label>
           <input
             type="text"
             name="taxStatus"
             value={formData?.vehicles[index]?.taxStatus || ""} // Bind the value to the state
             onChange={(e) => handleVehiclesInputChange(e, index)}
           />
         </div>
         <div className="form-group">
           <label>MOT Status</label>
           <input
             type="text"
             name="motStatus"
             onChange={(e) => handleVehiclesInputChange(e, index)}
             value={formData?.vehicles[index]?.motStatus || ""} // Bind the value to the state
             
           />
         </div>
         <div className="form-group">
           <label>Colour</label>
           <input
             type="text"
             name="colour"
             onChange={(e) => handleVehiclesInputChange(e, index)}
             value={formData?.vehicles[index]?.colour || ""} // Bind the value to the state
           />
         </div>
       </div> 
       </>
           )}
     </div>
   ))}
   {/* <div className='form-group'>
   <button type="button" className="contact-button" onClick={addVehicleForm}>
     Add Another Vehicle
   </button>
   </div> */}
       <h2>Collection Details</h2>
      <div className='form-row'>
      <div className='form-group'>
        <label htmlFor="collectioncontactName">Contact Name</label>
        <input
            type="text"
            id="collectioncontactName"
            name="collectioncontactName"
            value={formData.collectioncontactName}
            onChange={handleChange}
            required
          />
      </div>
      <div className='form-group'>
        <label htmlFor="collectioncontactPhone">Contact Phone</label>
        <input
            type="text"
            id="collectioncontactPhone"
            name="collectioncontactPhone"
            value={formData.collectioncontactPhone}
            onChange={handleChange}
            required
          />
      </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="collectionAddress">Collection Address:</label>
          <textarea
            
            id="collectionAddress"
            name="collectionAddress"
            value={formData.collectionAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="collectiontownCity">Town/City:</label>
          <input
            type="text"
            id="collectiontownCity"
            name="collectiontownCity"
            value={formData.collectiontownCity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="collectionpostCode">Post Code:</label>
          <input
            type="text"
            id="collectionpostCode"
            name="collectionpostCode"
            value={formData.collectionpostCode}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <h2>Drop-Off Details</h2>
      
      <div className='form-row'>
      <div className='form-group'>
        <label htmlFor="dropoffcontactName">Contact Name</label>
        <input
            type="text"
            id="dropoffcontactName"
            name="dropoffcontactName"
            value={formData.dropoffcontactName}
            onChange={handleChange}
            required
          />
      </div>
      <div className='form-group'>
        <label htmlFor="dropoffcontactPhone">Contact Phone</label>
        <input
            type="text"
            id="dropoffcontactPhone"
            name="dropoffcontactPhone"
            value={formData.dropoffcontactPhone}
            onChange={handleChange}
            required
          />
      </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dropoffAddress">Drop Off Address:</label>
          <textarea
            
            id="dropoffAddress"
            name="dropoffAddress"
            value={formData.dropoffAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dropofftownCity">Town/City:</label>
          <input
            type="text"
            id="dropofftownCity"
            name="dropofftownCity"
            value={formData.dropofftownCity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dropoffpostCode">Post Code:</label>
          <input
            type="text"
            id="dropoffpostCode"
            name="dropoffpostCode"
            value={formData.dropoffpostCode}
            onChange={handleChange}
            required
          />
        </div>
      </div>
   
   {formData.returnVehicles.map((form:any, index:any) => (
     <div key={form.id} className="vehicle-form-section">
   <h2>Return Vehicle Details {index + 1}</h2>
   <div className='form-row' style={{alignContent:'center'}}>
               <div className='form-group'>
     <label htmlFor="Cartype">Car Type</label>
     <div className="buttonb-bar">
       {["New Car", "Used Car"].map((button) => (
         <button
           key={button}
           type="button"
           className={`buttonb ${formData.returnVehicles[index].carType === button ? "active" : ""}`}
           onClick={() => handleButtonClick(button)} // Pass index to handleButtonClick
         >
           {button}
         </button>
       ))}
     </div>
   </div>
   
       </div>
  
   
   {/* Vehicle Registration Input */}
   <div className="form-group">
   <label htmlFor={`vehicleRegistration-${index}`}>Vehicle Registration</label>
   <input
   type="text"
   id={`vehicleRegistration-${index}`}
   name="vehicleRegistration"
   value={formData?.returnVehicles[index]?.vehicleRegistration || ''}
   onChange={(e) => handleReturnVehiclesInputChange(e, index)}
   required
   />
   <button

   type="button"
   className="contact-button"
   >
   Lookup
   </button>
   
   </div>
   
        {
   
   formData.returnVehicles[index].carType==="New Car" &&(
   <>
   
   <div className="form-row">
   <div className="form-group">
   <label>Make</label>
   <input
   type="text"
   name="manufacturer"
   value={formData?.returnVehicles?.manufacturer}
   onChange={(e) => handleReturnVehiclesInputChange(e, index)}
   
   />

   </div>
   
   <div className="form-group">
   <label>Model</label>
   <input
   type="text"
   name="model"
   value={formData?.returnVehicles?.model}
   onChange={(e) => handleReturnVehiclesInputChange(e, index)}
   
   />

   </div>
   
   </div>
   <div className="form-row">
   <div className="form-group">
   <label>Chassis/VIN</label>
   <input
   type="text"
   name="vin"
   value={formData?.returnVehicles?.vin}
   onChange={(e) => handleReturnVehiclesInputChange(e, index)}
   
   />
   </div>
   <div className="form-group">
   <label>Colour</label>
   <input
   type="text"
   name="colour"
   value={formData?.returnVehicles?.colour}
   onChange={(e) => handleReturnVehiclesInputChange(e, index)}
   
   />
   </div>
   </div> 
   
   
   </>
   )}
     
   {formData.returnVehicles[index]?.carType==="Used Car" &&(
   <>
   
   {/* Make and Model Inputs */}
   <div className="form-row">
   <div className="form-group">
   <label>Manufacturer</label>
   <input
   type="text"
   name="manufacturer" // This is important to target the correct key in the state
   value={formData?.returnVehicles[index]?.manufacturer || ""} // Fallback to empty string if value is undefined or null
   onChange={(e) => handleReturnVehiclesInputChange(e, index)}
   />
   </div>
   
   <div className="form-group">
   <label>Model</label>
   <input
   type="text"
   name="model"
   value={formData?.returnVehicles[index]?.model || ""}
   onChange={(e) => handleReturnVehiclesInputChange(e, index)}
   />
   </div>
   
   <div className="form-group">
   <label>VIN</label>
   <input
   type="text"
   name="vin"
   value={formData?.returnVehicles[index]?.vin || ""}
   onChange={(e) => handleReturnVehiclesInputChange(e, index)}
   />
   </div>
   
   
   
   </div>
   
   {/* Chassis/VIN and Vehicle Registration */}
   <div className="form-row">
   
   <div className="form-group">
   <label>Tax Status</label>
   <input
   type="text"
   name="taxStatus"
   value={formData?.returnVehicles[index]?.taxStatus } // Bind the value to the state
   onChange={(e) => handleReturnVehiclesInputChange(e, index)}
   />
   </div>
   <div className="form-group">
   <label>MOT Status</label>
   <input
   type="text"
   name="motStatus"
   
   value={formData?.returnVehicles[index]?.motStatus || ""} // Bind the value to the state
   onChange={(e) => handleReturnVehiclesInputChange(e, index)}
   />
   </div>
   <div className="form-group">
   <label>Colour</label>
   <input
   type="text"
   name="colour"
   
   value={formData?.returnVehicles[index]?.colour || ""} // Bind the value to the state
   onChange={(e) => handleReturnVehiclesInputChange(e, index)}
   />
   </div>
   </div> 
   </>
   )}
   
     </div>
   ))}
   
   <h2>Collection Details</h2>
      <div className='form-row'>
      <div className='form-group'>
        <label htmlFor="returncollectioncontactName">Contact Name</label>
        <input
            type="text"
            id="returncollectioncontactName"
            name="returncollectioncontactName"
            value={formData.returncollectioncontactName=formData.dropoffcontactName}
            onChange={handleChange}
            required
          />
      </div>
      <div className='form-group'>
        <label htmlFor="returncollectioncontactPhone">Contact Phone</label>
        <input
            type="text"
            id="returncollectioncontactPhone"
            name="returncollectioncontactPhone"
            value={formData.returncollectioncontactPhone=formData.dropoffcontactPhone}
            onChange={handleChange}
            required
          />
      </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="returncollectionAddress">Collection Address:</label>
          <textarea
            
            id="returncollectionAddress"
            name="returncollectionAddress"
            value={formData.returncollectionAddress=formData.dropoffAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="returncollectiontownCity">Town/City:</label>
          <input
            type="text"
            id="returncollectiontownCity"
            name="returncollectiontownCity"
            value={formData.returncollectiontownCity=formData.dropofftownCity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="returncollectionpostCode">Post Code:</label>
          <input
            type="text"
            id="returncollectionpostCode"
            name="returncollectionpostCode"
            value={formData.returncollectionpostCode=formData.dropoffpostCode}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <h2>Drop-Off Details</h2>
      
      <div className='form-row'>
      <div className='form-group'>
        <label htmlFor="returndropoffcontactName">Contact Name</label>
        <input
            type="text"
            id="returndropoffcontactName"
            name="returndropoffcontactName"
            value={formData.returndropoffcontactName=formData.collectioncontactName}
            onChange={handleChange}
            required
          />
      </div>
      <div className='form-group'>
        <label htmlFor="returndropoffcontactPhone">Contact Phone</label>
        <input
            type="text"
            id="returndropoffcontactPhone"
            name="returndropoffcontactPhone"
            value={formData.returndropoffcontactPhone=formData.collectioncontactPhone}
            onChange={handleChange}
            required
          />
      </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="returndropoffAddress">Drop Off Address:</label>
          <textarea
            
            id="returndropoffAddress"
            name="returndropoffAddress"
            value={formData.returndropoffAddress=formData.collectionAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="returndropofftownCity">Town/City:</label>
          <input
            type="text"
            id="returndropofftownCity"
            name="returndropofftownCity"
            value={formData.returndropofftownCity=formData.collectiontownCity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="returndropoffpostCode">Post Code:</label>
          <input
            type="text"
            id="returndropoffpostCode"
            name="returndropoffpostCode"
            value={formData.returndropoffpostCode=formData.collectionpostCode}
            onChange={handleChange}
            required
          />
        </div>
      </div>

   
                           
         <h2>Date and Time</h2>
         <div className="form-row">
           <div className="form-group">
           <label>Collection Not Earlier Than:</label>
   <input
     type="date"
     name="fromDate"
     value={formData.fromDate}
     min={new Date().toISOString().split('T')[0]} // Set today's date as the minimum
     onChange={(e) =>
       setFormData((prevData) => ({
         ...prevData,
         fromDate: e.target.value,
       }))
     }
   />
   
           </div>
   
           
           <div className="form-group">
           <label>Delivery Not Later Than:</label>
   <input
     type="date"
     name="toDate"
     value={formData.toDate}
     min={formData.fromDate} // Set today's date as the minimum
     onChange={(e) =>
       setFormData((prevData) => ({
         ...prevData,
         toDate: e.target.value,
       }))
     }
   />
   
           </div>
   
                 </div>
        
                 <div className="form-row">
  {/* From Time Section */}
  <div className="form-group">
    <label htmlFor="fromTime">From Time:</label>
    <div className="input-container">
      <select
        id="fromTime"
        name="fromTime"
        value={formData.fromTime}
        onChange={handleChange}
        required
      >
        <option value="ANYTIME">ANYTIME</option>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>

      {/* Checkbox and Label inside the same row */}
      <input
        type="checkbox"
        id="specificFromTime"
        name="specificFromTime"
        checked={formData.specificFromTime || false}
        onChange={handleChange}
      />
      <label htmlFor="specificFromTime">Specific Date</label>
    </div>
  </div>

  {/* To Time Section */}
  <div className="form-group">
    <label htmlFor="toTime">To Time:</label>
    <div className="input-container">
      <select
        id="toTime"
        name="toTime"
        value={formData.toTime}
        onChange={handleChange}
        required
      >
        <option value="ANYTIME">ANYTIME</option>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>

      {/* Checkbox and Label inside the same row */}
      <input
        type="checkbox"
        id="specificToTime"
        name="specificToTime"
        checked={formData.specificToTime || false}
        onChange={handleChange}
      />
      <label htmlFor="specificToTime">Specific Date</label>
    </div>
  </div>
</div>
   
   
         <h2>Additional Information</h2>
         <div className="form-group">
           <label htmlFor="notes">Notes:</label>
           <textarea
             id="notes"
             name="notes"
             value={formData.notes}
             onChange={handleChange}
             placeholder="Additional notes"
             
           />
         </div>
   
         <div className="form-group">
           <label htmlFor="releaseNotes">Release Notes:</label>
           <textarea
             id="releaseNotes"
             name="releaseNotes"
             value={formData.releaseNotes}
             onChange={handleChange}
             placeholder="Release notes"
             
           />
         </div>
         </>
         
  ))}

{(formData.servicetype==="ONWARD VEHICLE" &&(
 <>
   <h2>Services</h2>
      <div className='form-row'>
      <div className="form-group">
              <label htmlFor="roadworthy">Vehicle MOT/ Roadworthy?</label>
              <select id="roadworthy" name="roadworthy" value={formData.roadworthy} onChange={handleChange} required>
              <option value="" disabled selected hidden>
              Vehicle MOT/ Roadworthy?
    </option>
  <option value="yes">Yes</option>
  <option value="no">No</option>
</select>


            </div>
            <div className="form-group">
              <label htmlFor="fuel">Fuel Required?</label>
              <select id="fuel" name="fuel" value={formData.fuel} onChange={handleChange} required>
              <option value="" disabled selected hidden>
              Fuel Required?
    </option>
  <option value="yes">Yes</option>
  <option value="no">No</option>
</select>

            </div>
            
            </div>
            <div className='form-row'>
            <div className="form-group">
              <label htmlFor="movement">Movement Type?</label>
              <select id="movement" name="movement" value={formData.movement} onChange={handleChange} required>
              <option value="" disabled selected hidden>
              Movement Type?
    </option>
    <option value="INTERNAL TRANSFER">INTERNAL TRANSFER</option>
<option value="TRADE VEHICLE">TRADE VEHICLE</option>
<option value="MOTABILITY">MOTABILITY</option>
<option value="RETAIL DELIVERY">RETAIL DELIVERY</option>
<option value="FLEET DELIVERY">FLEET DELIVERY</option>
<option value="BREAKDOWN RECOVERY">BREAKDOWN RECOVERY</option>
<option value="OTHERS" >OTHERS</option>


</select>


            </div>
            <div className="form-group">
              <label htmlFor="service">Service Type?</label>
              <select id="service" name="service" value={formData.service} onChange={handleChange} required>
              <option value="" disabled selected hidden>
              Service Type?
    </option>
    <option value="DRIVEN">DRIVEN</option>
<option value="TRANSPORT">TRANSPORT</option>
<option value="ANY" >ANY</option>

</select>


            </div>
            
            </div>
        {formData.Onwardvehicle.map((form:any, index:any) => (
          <div key={form.id} className="vehicle-form-section">
           <h2>Vehicle Details {index + 1}</h2>
           <div className='form-row' style={{alignContent:'center'}}>
            <div className='form-group'>
  <label htmlFor="Cartype">Car Type</label>
  <div className="buttonb-bar">
    {["New Car", "Used Car"].map((button) => (
      <button
        key={button}
        type="button"
        className={`buttonb ${formData.Onwardvehicle[index].carType === button ? "active" : ""}`}
       
      >
        {button}
      </button>
    ))}
  </div>
</div>

    </div>

    {formData?.Onwardvehicle[index]?.carType==="Used Car" &&(
      <>
      
           
    {/* Vehicle Registration Input */}
    <div className="form-group">
    <label htmlFor={`vehicleRegistration-${index}`}>Vehicle Registration</label>
  <input
    type="text"
    id={`vehicleRegistration-${index}`}
    name="vehicleRegistration"
    value={formData?.Onwardvehicle[index]?.vehicleRegistration || ''}
    onChange={(e) => handleInputChange(e, index)}
    required
  />
    </div>

    {/* Make and Model Inputs */}
    <div className="form-row">
    <div className="form-group">
  <label>Manufacturer</label>
  <input
  type="text"
  name="manufacturer" // This is important to target the correct key in the state
  value={formData?.Onwardvehicle[index]?.manufacturer || ""} // Fallback to empty string if value is undefined or null
  onChange={(e) => handleInputChange(e, index)} // Passing both event and index to handleChange
  required
/>
</div>

<div className="form-group">
  <label>Model<span style={{color:'red', fontSize:'0.8rem'}}> (Required)</span></label>
  <input
    type="text"
    name="model"
    value={formData?.Onwardvehicle[index]?.model || ""}
    onChange={(e) => handleInputChange(e, index)}
    required
  />
</div>

<div className="form-group">
  <label>VIN <span style={{color:'red', fontSize:'0.8rem'}}> (Optional)</span></label>
  <input
    type="text"
    name="vin"
    value={formData?.Onwardvehicle[index]?.vin || ""}
    onChange={(e) => handleInputChange(e, index)}
  />
</div>



    </div>

    {/* Chassis/VIN and Vehicle Registration */}
    <div className="form-row">
      
      <div className="form-group">
        <label>Tax Status</label>
        <input
          type="text"
          name="taxStatus"
          required
          value={formData?.Onwardvehicle[index]?.taxStatus || ""} // Bind the value to the state
          onChange={(e) => handleInputChange(e, index)}
        />
      </div>
      <div className="form-group">
        <label>MOT Status</label>
        <input
          type="text"
          name="motStatus"
          required
          value={formData?.Onwardvehicle[index]?.motStatus || ""} // Bind the value to the state
          onChange={(e) => handleInputChange(e, index)}
        />
      </div>
      <div className="form-group">
        <label>Colour</label>
        <input
          type="text"
          name="colour"
          required
          value={formData?.Onwardvehicle[index]?.colour || ""} // Bind the value to the state
          onChange={(e) => handleInputChange(e, index)}
        />
      </div>
    </div> 
    </>
    )}
    {formData.Onwardvehicle[index].carType==="New Car" &&(
      <>
           
    {/* Vehicle Registration Input */}
    
    {/* Make and Model Inputs */}
    <div className="form-row">
      <div className="form-group">
        <label>Make</label>
        <input
          type="text"
          name="manufacturer"
          required
          value={formData?.Onwardvehicle[index]?.manufacturer}
          onChange={(e) => handleInputChange(e, index)} // Handle onChange for dynamic vehicles
        />
        </div>

      <div className="form-group">
        <label>Model</label>
        <input
          type="text"
          name="model"
          required
          value={formData?.Onwardvehicle[index]?.model}
          onChange={(e) => handleInputChange(e, index)} // Handle onChange for dynamic vehicles
        />
        </div>
      
    </div>

    {/* Chassis/VIN and Vehicle Registration */}
    <div className="form-row">
    <div className="form-group">
        <label>Chassis/VIN</label>
        <input
          type="text"
          name="vin"
          required
          value={formData?.Onwardvehicle[index]?.vin}
          onChange={(e) => handleInputChange(e, index)} // Handle onChange for dynamic vehicles
        />
      </div>
      <div className="form-group">
        <label>Colour</label>
        <input
          type="text"
          name="colour"
          required
          value={formData?.Onwardvehicle[index]?.colour}
          onChange={(e) => handleInputChange(e, index)} // Handle onChange for dynamic vehicles
        />
      </div>
    </div> 
    </>
    )}

            <h2>Collection Details</h2>
            {index === 0 ?  (
                          // Editable fields for the first vehicle
                          <>
                            <div className="form-row">
                              <div className="form-group">
                                <label>Contact Name:</label>
                                <input
                                  type="text"
                                  name="collectionContactName"
                                  value={formData.Onwardvehicle[index].collectionAddress.collectionContactName}
                                  onChange={(e) => handleInputChange(e, index)}
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <label>Contact Phone:</label>
                                <input
                                  type="tel"
                                  name="collectionContactPhone"
                                  value={formData.Onwardvehicle[index].collectionAddress.collectionContactPhone}
                                  onChange={(e) => handleInputChange(e, index)}
                                  required
                                />
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="form-group">
                                <label>Collection Address:</label>
                                <input
                                  type="text"
                                  name="collectionAddress"
                                  value={formData.Onwardvehicle[index].collectionAddress.Address}
                                  onChange={(e) => handleInputChange(e, index)}
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <label>Town/City:</label>
                                <input
                                  type="text"
                                  name="collectionTownCity"
                                  value={formData.Onwardvehicle[index].collectionAddress.collectionTownCity}
                                  onChange={(e) => handleInputChange(e, index)}
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <label>Post Code:</label>
                                <input
                                  type="text"
                                  name="collectionPostCode"
                                  value={formData.Onwardvehicle[index].collectionAddress.collectionPostCode}
                                  onChange={(e) => handleInputChange(e, index)}
                                  required
                                />
                              </div>
                            </div>
                          </>
                        ) : (
              // Read-only fields for subsequent vehicles
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>Contact Name:</label>
                    <input
                      type="text"
                      value={formData.Onwardvehicle[index-1]?.dropContactName || ''}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact Phone:</label>
                    <input
                      type="tel"
                      value={formData.Onwardvehicle[index-1]?.dropContactPhone || ''}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Collection Address:</label>
                    <input
                      type="text"
                      value={formData.Onwardvehicle[index-1]?.dropAddress || ''}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Town/City:</label>
                    <input
                      type="text"
                      value={formData.Onwardvehicle[index-1]?.dropTownCity || ''}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Post Code:</label>
                    <input
                      type="text"
                      value={formData.Onwardvehicle[index-1]?.dropPostCode || ''}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly
                    />
                  </div>
                </div>
              </>
            )}

            {/* Drop-Off Details */}
            <h2>Drop-Off Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Contact Name:</label>
                <input
                  type="text"
                  name="dropContactName"
                  value={formData.Onwardvehicle[index]?.dropContactName || ''}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact Phone:</label>
                <input
                  type="tel"
                  name="dropContactPhone"
                  value={formData.Onwardvehicle[index]?.dropContactPhone || ''}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Drop-Off Address:</label>
                <input
                  type="text"
                  name="dropAddress"
                  value={formData.Onwardvehicle[index]?.dropAddress || ''}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Town/City:</label>
                <input
                  type="text"
                  name="dropTownCity"
                  value={formData.Onwardvehicle[index]?.dropTownCity || ''}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Post Code:</label>
                <input
                  type="text"
                  name="dropPostCode"
                  value={formData.Onwardvehicle[index]?.dropPostCode || ''}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                />
              </div>
            </div>
          </div>
        ))}

            
        
        <h2>Date and Time</h2>
      <div className="form-row">
        <div className="form-group">
        <label>Collection Not Earlier Than:</label>
<input
  type="date"
  name="fromDate"
  required
  value={formData.fromDate}
  min={new Date().toISOString().split('T')[0]} // Set today's date as the minimum
  onChange={(e) =>
    setFormData((prevData) => ({
      ...prevData,
      fromDate: e.target.value,
    }))
  }
/>

        </div>
        <div className="form-group">
          <label>To Date:</label>
          <input
            type="date"
            name="toDate"
            required
            value={formData.toDate}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                toDate: e.target.value,
              }))
            }
          />
        </div>
      </div>
      <div className="form-row">
  {/* From Time Section */}
  <div className="form-group">
    <label htmlFor="fromTime">From Time:</label>
    <div className="input-container">
      <select
        id="fromTime"
        name="fromTime"
        value={formData.fromTime}
        onChange={handleChange}
        required
      >
        <option value="ANYTIME">ANYTIME</option>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>

      {/* Checkbox and Label inside the same row */}
      <input
        type="checkbox"
        id="specificFromTime"
        name="specificFromTime"
        checked={formData.specificFromTime || false}
        onChange={handleChange}
      />
      <label htmlFor="specificFromTime">Specific Date</label>
    </div>
  </div>

  {/* To Time Section */}
  <div className="form-group">
    <label htmlFor="toTime">To Time:</label>
    <div className="input-container">
      <select
        id="toTime"
        name="toTime"
        value={formData.toTime}
        onChange={handleChange}
        required
      >
        <option value="ANYTIME">ANYTIME</option>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>

      {/* Checkbox and Label inside the same row */}
      <input
        type="checkbox"
        id="specificToTime"
        name="specificToTime"
        checked={formData.specificToTime || false}
        onChange={handleChange}
      />
      <label htmlFor="specificToTime">Specific Date</label>
    </div>
  </div>
</div>

      <h2>Additional Information</h2>
      <div className="form-group">
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional notes"
          
        />
      </div>

      <div className="form-group">
        <label htmlFor="releaseNotes">Release Notes:</label>
        <textarea
          id="releaseNotes"
          name="releaseNotes"
          value={formData.releaseNotes}
          onChange={handleChange}
          placeholder="Release notes"
          
        />
      </div>
      </>
))}
       
  <button className='contact-button' onClick={handleSubmit}>Confirm
    
    </button>
    
  </div>
  </div>
  </div>
  {deletionloading && (
        <div className='overlayStyle'>
          <div className='loadingStyle'>{deletemessage}</div>
        </div>
      )}

  </div>
  )}


export default RecordFormActive;