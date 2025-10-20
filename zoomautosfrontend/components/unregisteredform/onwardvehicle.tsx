import React, { useState,  useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
const Onwardvehicle = () => {
  const [formData, setFormData] = useState<Record<string, any>>({
    servicetype: 'ONWARD VEHICLE',
    Onwardvehicle:  [{ vehicleRegistration: "" ,carType:'Used Car'},{ vehicleRegistration: "",carType:'Used Car' }],
        fromDate: '',
    fromTime: 'ANYTIME',
    toDate: '',
    toTime: 'ANYTIME',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
        const [isTermsChecked, setIsTermsChecked] = useState(false);
      
        const handleTermsCheckboxChange = (event:any) => {
          setIsTermsChecked(event.target.checked);
        };
  const [sharedCollectionAddress, setSharedCollectionAddress] = useState({
    collectionContactName: '',
    collectionContactPhone: '',
    collectionAddress: '',
    collectionTownCity: '',
    collectionPostCode: '',
  });
  const [vehicleForms, setVehicleForms] = useState([
    { id: Date.now() },
    { id: Date.now() + 1 } // Ensure at least two forms initially
  ]);
   const [Failure,setFailure]=useState(false);
    const [failuremessage,setfailuremessage]=useState('');
   
  const addVehicleForm = () => {
    const newVehicleForms = [...vehicleForms, { id: Date.now() }];
    setVehicleForms(newVehicleForms);
  
    const previousDropOff:any = formData.Onwardvehicle[vehicleForms.length - 1];
  
    if (previousDropOff) {
      const newVehicle = {
        ...previousDropOff.collectionAddress, // Copy previous drop-off details
        dropContactName: "",
        dropContactPhone: "",
        dropAddress: "",
        dropTownCity: "",
        dropPostCode: "",
      };
      setFormData((prevData) => ({
        ...prevData,
        Onwardvehicle: [...prevData.Onwardvehicle, newVehicle],
      }));
    } else {
      setFormData((prevData:any) => ({
        ...prevData,
        Onwardvehicle: [...prevData.Onwardvehicle, { dropContactName: '', dropContactPhone: '', dropAddress: '', dropTownCity: '', dropPostCode: '' }],
      }));
    }
  };
  
  const [existingIds, setExistingIds] = useState(new Set());
  const [jobId, setJobId] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const handleRegistrationChange = (index:any, value:any) => {
    setFormData((prevFormData) => {
      const updatedOnwardvehicle = [...prevFormData.Onwardvehicle];
      updatedOnwardvehicle[index] = {
        ...updatedOnwardvehicle[index],
        vehicleRegistration: value,
      };
      return { ...prevFormData, Onwardvehicle: updatedOnwardvehicle };
    });
  };
  
  const [vehicleData, setVehicleData] = useState({
    make: '',
    model: '',
    // other fields if needed
  });
  
    const [carerrors, setErrors] = useState<Record<string, string>>({});

  
    const handleEnquiry = async (index:any, registrationNumber:any) => {
      try {
        console.log("reg", registrationNumber);
    
        // Clear error for this vehicle before making the request
        setErrors((prevErrors) => ({ ...prevErrors, [index]: null }));
    
        if (!registrationNumber?.trim()) {
          throw new Error("Please enter a registration number.");
        }
    
        const response = await fetch('/api/vehicleenquiry', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ registrationNumber }),
});
    
        if (!response.ok) {
          if (response.status === 404) {
            
            throw new Error("Vehicle not found. Please check the registration number.");
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const vehicleData = await response.json();
    
        if (!vehicleData || Object.keys(vehicleData).length === 0) {
          throw new Error("No data returned for the provided registration number.");
        }
    
        setFormData((prevData:any) => {
          const updatedOnwardvehicle = [...prevData.Onwardvehicle];
          updatedOnwardvehicle[index] = {
            ...updatedOnwardvehicle[index],
            manufacturer: vehicleData.make || "",
            model: vehicleData.model || "",
            vin: vehicleData.vin || "",
            taxStatus: vehicleData.taxStatus || "",
            motStatus: vehicleData.motStatus || "",
            colour: vehicleData.colour || "",
          };
          return { ...prevData, Onwardvehicle: updatedOnwardvehicle };
        });
    
      } catch (error:any) {
        let errorMessage = error.message;

    // If response status is 404, override error message
    if (error.message.includes("404")) {
      errorMessage = "Vehicle not found. Please check the registration number or Enter Data Manually.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [index]: `Error for vehicle ${index + 1}: ${errorMessage}`,
    }));
      }
    };
  
  
  
      
  

          
                const [isModalOpen, setIsModalOpen] = useState(false);
                
                  const openModal = () => {
                    setIsModalOpen(true);
                  };
                
                  const closeModal = () => {
                    setIsModalOpen(false);
                  };
  
  
  const handleSharedAddressChange = (e:any) => {
    const { name, value } = e.target;
    setSharedCollectionAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChange = (e:any, index:any = null) => {
    if (!e?.target) {
      console.warn("Invalid event object");
      return; // Return early if the event is invalid or undefined
    }
  
    const { name, value, type, checked } = e.target;
  
    if (index !== null) {
      // Handle change for array items (e.g., Onwardvehicle)
      setFormData((prevData) => {
        // Ensure the array exists in state
        const updatedOnwardvehicle:any = [...(prevData.Onwardvehicle || [])];
  
        // Ensure the object exists at the specified index
        if (!updatedOnwardvehicle[index]) {
          updatedOnwardvehicle[index] = {}; // Initialize if undefined
        }
  
        // Update the specific field in the object
        updatedOnwardvehicle[index] = {
          ...updatedOnwardvehicle[index],
          [name]: type === "checkbox" ? checked : value,
        };
  
        return { ...prevData, Onwardvehicle: updatedOnwardvehicle };
      });
    } else {
      // Handle change for simple (non-array) fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };
  

  const handleVehicleChange = (index:any, e:any) => {
    const { name, value } = e.target;
    const updatedVehicles = [...formData.Onwardvehicle];
    updatedVehicles[index] = { ...updatedVehicles[index], [name]: value };
    setFormData((prevData) => ({
      ...prevData,
      Onwardvehicle: updatedVehicles,
    }));
  };
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (button:any, index:any) => {
    console.log("Button clicked:", button);
    console.log("Index:", index);
  
    setFormData((prevData) => {
      const updatedOnwardvehicle = [...prevData.Onwardvehicle];
  
      if (index < 0 || index >= updatedOnwardvehicle.length) {
        console.error("Index out of bounds:", index);
        return prevData; // Return the previous state if the index is invalid
      }
  
      updatedOnwardvehicle[index] = {
        ...updatedOnwardvehicle[index],
        carType: button, // Set the carType for the specific vehicle
      };
  
      return { ...prevData, Onwardvehicle: updatedOnwardvehicle };
    });
  };
  const removeVehicleForm = (id:any) => {
    if (vehicleForms.length > 2) {
      const updatedVehicleForms = vehicleForms.filter(vehicle => vehicle.id !== id);
      setVehicleForms(updatedVehicleForms);
  
      setFormData((prevData) => ({
        ...prevData,
        Onwardvehicle: prevData.Onwardvehicle.slice(0, updatedVehicleForms.length),
      }));
    }
  };
  
  
  const onSubmit = async (event:any) => {
    event.preventDefault();
    setLoading(true);
    
    const payload = {
  formType: "Sub Contract Jobs",
  ...formData,
  status:'pending',
  Review:'No',
  Onwardvehicle: formData.Onwardvehicle.map((vehicle:any, idx:any) => ({
    ...vehicle,
    collectionAddress: idx === 0
  ? {
    collectionContactName:sharedCollectionAddress.collectionContactName,
    collectionContactPhone:sharedCollectionAddress.collectionContactPhone,
    Address:sharedCollectionAddress.collectionAddress,
    collectionTownCity:sharedCollectionAddress.collectionTownCity,
    collectionPostCode:sharedCollectionAddress.collectionPostCode
  }
  : {
    collectionContactName: formData.Onwardvehicle[idx - 1].dropContactName,
      collectionContactPhone: formData.Onwardvehicle[idx - 1].dropContactPhone,
        
    Address: formData.Onwardvehicle[idx - 1].dropAddress,
      collectionTownCity: formData.Onwardvehicle[idx - 1].dropTownCity,
      collectionPostCode: formData.Onwardvehicle[idx - 1].dropPostCode,
    },

  })),
};



    try {
     const response = await axios.post('/api/subcontract', payload);

      
const { message, jobId } = response.data;

setJobId(jobId);

setLoading(false);
    setSuccess(true);
        
      
      try {
        const response2 = await axios.post("https://zoomautos.co.uk/api/Email/send-email", 
        {
        ...payload,
        jobId:jobId,
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
    } catch (error:any) {
        console.error("❌ Error sending email:", error.response ? error.response.data : error.message);
    }
    
      
    } catch (error) {
      console.error('Error submitting the form:', error);
    } finally {
      setLoading(false);
    }
  };

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
 useEffect(() => {
    if (success || Failure) {
      const timer = setTimeout(() => {
        if (success) {
          setSuccess(false);
          window.location.reload(); // Only reload if success is true
        } else {
          setFailure(false);
        }
      }, 2000);
  
      return () => clearTimeout(timer); // Cleanup on re-render
    }
  }, [success, Failure]); // Runs when `success` or `failure` changes
 
  return (
    <>

      <form onSubmit={onSubmit}>
         <h2>Service Details</h2>
   
      <p>It's a car delivery job where we drop off a car at one location, pick up another car from there, and deliver it to a different destination.</p>
      <p>
        Need more information?{" "}
        <button className="contact-button" type="button"onClick={openModal}>
          Click Here
        </button>
      </p>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>
            It's a multi-car delivery job where we transport vehicles between locations. We drop off a car at one destination, pick up another from the same location, and deliver it to a different destination. This process continues as part of a planned route, ensuring efficient vehicle transfers. 
            </p>
            <button className="close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
      <h2>Customer Details</h2>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="customername">Customer Name</label>
          <input
            type="text"
            id="customername"
            name="customername"
            value={formData.customername}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
<option value="BREAKDOWN RECOVERY" >BREAKDOWN RECOVERY</option>
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
        {vehicleForms.map((form, index) => (
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
        onClick={() => handleButtonClick(button, index)} // Pass index to handleButtonClick
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
    onChange={(e) => handleRegistrationChange(index, e.target.value)}
    required
  />
  <button
    onClick={() =>
      handleEnquiry(index, formData?.Onwardvehicle[index]?.vehicleRegistration)
    }
    type="button"
    className="contact-button"
  >
    Lookup
  </button>

    </div>
    {carerrors[index] && <p className="error-message">{carerrors[index]}</p>}
  
    {/* Make and Model Inputs */}
    <div className="form-row">
    <div className="form-group">
  <label>Manufacturer</label>
  <input
  type="text"
  name="manufacturer" // This is important to target the correct key in the state
  value={formData?.Onwardvehicle[index]?.manufacturer || ""} // Fallback to empty string if value is undefined or null
  onChange={(e) => handleChange(e, index)} // Passing both event and index to handleChange
  required
/>
</div>

<div className="form-group">
  <label>Model<span style={{color:'red', fontSize:'0.8rem'}}> (Required)</span></label>
  <input
    type="text"
    name="model"
    value={formData?.Onwardvehicle[index]?.model || ""}
    onChange={(e) => handleChange( e,index)}
    required
  />
</div>

<div className="form-group">
  <label>VIN <span style={{color:'red', fontSize:'0.8rem'}}> (Optional)</span></label>
  <input
    type="text"
    name="vin"
    value={formData?.Onwardvehicle[index]?.vin || ""}
    onChange={(e) => handleChange( e,index)}
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
          onChange={(e) => handleChange( e,index)}
        />
      </div>
      <div className="form-group">
        <label>MOT Status</label>
        <input
          type="text"
          name="motStatus"
          required
          value={formData?.Onwardvehicle[index]?.motStatus || ""} // Bind the value to the state
          onChange={(e) => handleChange( e,index)}
        />
      </div>
      <div className="form-group">
        <label>Colour</label>
        <input
          type="text"
          name="colour"
          required
          value={formData?.Onwardvehicle[index]?.colour || ""} // Bind the value to the state
          onChange={(e) => handleChange( e,index)}
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
          onChange={(e) => handleVehicleChange(index, e)} // Handle onChange for dynamic vehicles
        />
        
      </div>

      <div className="form-group">
        <label>Model</label>
        <input
          type="text"
          name="model"
          required
          onChange={(e) => handleVehicleChange(index, e)} // Handle onChange for dynamic vehicles
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
          onChange={(e) => handleVehicleChange(index, e)} // Handle onChange for dynamic vehicles
        />
      </div>
      <div className="form-group">
        <label>Colour</label>
        <input
          type="text"
          name="colour"
          required
          onChange={(e) => handleVehicleChange(index, e)} // Handle onChange for dynamic vehicles
        />
      </div>
    </div> 
    </>
    )}

            <h2>Collection Details</h2>
            {index === 0 ? (
              // Editable fields for the first vehicle
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>Contact Name:</label>
                    <input
                      type="text"
                      name="collectionContactName"
                      value={sharedCollectionAddress.collectionContactName}
                      onChange={handleSharedAddressChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact Phone:</label>
                    <input
                      type="tel"
                      name="collectionContactPhone"
                      value={sharedCollectionAddress.collectionContactPhone}
                      onChange={handleSharedAddressChange}
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
                      value={sharedCollectionAddress.collectionAddress}
                      onChange={handleSharedAddressChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Town/City:</label>
                    <input
                      type="text"
                      name="collectionTownCity"
                      value={sharedCollectionAddress.collectionTownCity}
                      onChange={handleSharedAddressChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Post Code:</label>
                    <input
                      type="text"
                      name="collectionPostCode"
                      value={sharedCollectionAddress.collectionPostCode}
                      onChange={handleSharedAddressChange}
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
                      onChange={(e) => handleVehicleChange(index, e)}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact Phone:</label>
                    <input
                      type="tel"
                      value={formData.Onwardvehicle[index-1]?.dropContactPhone || ''}
                      onChange={(e) => handleVehicleChange(index, e)}
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
                      onChange={(e) => handleVehicleChange(index, e)}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Town/City:</label>
                    <input
                      type="text"
                      value={formData.Onwardvehicle[index-1]?.dropTownCity || ''}
                      onChange={(e) => handleVehicleChange(index, e)}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Post Code:</label>
                    <input
                      type="text"
                      value={formData.Onwardvehicle[index-1]?.dropPostCode || ''}
                      onChange={(e) => handleVehicleChange(index, e)}
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
                  onChange={(e) => handleVehicleChange(index, e)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact Phone:</label>
                <input
                  type="tel"
                  name="dropContactPhone"
                  value={formData.Onwardvehicle[index]?.dropContactPhone || ''}
                  onChange={(e) => handleVehicleChange(index, e)}
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
                  onChange={(e) => handleVehicleChange(index, e)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Town/City:</label>
                <input
                  type="text"
                  name="dropTownCity"
                  value={formData.Onwardvehicle[index]?.dropTownCity || ''}
                  onChange={(e) => handleVehicleChange(index, e)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Post Code:</label>
                <input
                  type="text"
                  name="dropPostCode"
                  value={formData.Onwardvehicle[index]?.dropPostCode || ''}
                  onChange={(e) => handleVehicleChange(index, e)}
                  required
                />
              </div>
            </div>
            <button
      type="button"
      className="remove-button"
      onClick={() => removeVehicleForm(form.id)}
      disabled={vehicleForms.length <= 2} // Disable when only 2 remain
    >
      Remove
    </button>
          </div>
        ))}
<div className='form-group'>
        <button type="button"  className='contact-button' onClick={addVehicleForm}>Add Vehicle</button>
        </div>
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
          <label>Delivery Not Later Than:</label>
          <input
            type="date"
            name="toDate"
            required
            value={formData.toDate}
             min={formData.fromDate}
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
        <div className="terms-container">
  <label className="terms-label">
    <input
      type="checkbox"
      checked={isTermsChecked}
      onChange={handleTermsCheckboxChange}
      className="terms-checkbox"
    />
    I have read and agree to the
    <a
      href="/Termsandconditions"
      target="_blank"
      rel="noopener noreferrer"
      className="terms-link"
    >
      Terms and Conditions
    </a>
  </label>
</div>

      {!isTermsChecked &&(
      <button  type="submit" className="contact-button"
      style={{backgroundColor:'#333'}}
      >Please Check the Terms and conditions box</button>
    )}
      {isTermsChecked &&(
      <button  type="submit" className="contact-button"
      
      >Submit</button>
    )}
      </form>
      {loading && (
        <div className='overlayStyle'>
          <div className='loadingStyle'  >Submitting...</div>
        </div>
      )}

      {/* Success Overlay */}
      {success && (
        <div className='overlayStyle'>
          <div className='successStyle' >
          <p>{formData.servicetype} Form Submitted Successfully!</p>
            <p>Your jobId is {jobId}</p>
            
            </div>
        </div>
      )}
    </>
  );
};

export default Onwardvehicle;
