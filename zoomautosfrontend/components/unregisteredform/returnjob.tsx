import React, { useState, useEffect } from 'react';
import { set, useForm } from 'react-hook-form';
import axios from 'axios';

const ReturnJobform = () => {
  const [vehicleForms, setVehicleForms] = useState([{ id: Date.now() }]);
    const [returnVehicleForms, setReturnVehicleForms] = useState([{ id: Date.now() }]);
    const [isTermsChecked, setIsTermsChecked] = useState(false);
        
          const handleTermsCheckboxChange = (event:any) => {
            setIsTermsChecked(event.target.checked);
          };
        
  const [Failure,setFailure]=useState(false);
  const [failuremessage,setfailuremessage]=useState('');
    // const [formData, setFormData] = useState({
    //   servicetype: 'RETURN JOB',
    //   roadworthy: '',
      
    // customername:'',
    // customeremail:'',
    // customercontact:'',
    // customeraddress:'',
    // customerusername:'',
    // customercompanyName:'',
    // customerPostCode:'',
    // customercity:'',
    
    //   fuel: '',
      
    // fromDate: '',
    // fromTime: 'ANYTIME',
    //   toDate: '',
    //   toTime: 'ANYTIME',
    //   specificToTime:'',
    //   specificFromTime:'',
  
      
    //   // Vehicles and Return Vehicles arrays
    //   vehicles: [
    //     { vehicleRegistration: "", carType:'Used Car' }
    //   ],
    //   returnVehicles: [
    //     { vehicleRegistration: "", carType:'Used Car' }
    //   ],
      
    //   notes: '',
    //   releaseNotes: '',
    //   jobId:'',
    // });
    const [formData, setFormData] = useState<Record<string, any>>({
servicetype: 'RETURN JOB',
          vehicles: [
        { vehicleRegistration: "", carType:'Used Car' }
      ],
      returnVehicles: [
        { vehicleRegistration: "", carType:'Used Car' }
      ],
          fromDate: '',
    fromTime: 'ANYTIME',
    toDate: '',
    toTime: 'ANYTIME',
    })
    const { register, handleSubmit} = useForm();
  
  const handleVehicleChange = (index:any, e:any) => {
    const { name, value } = e.target;
    const updatedVehicles = [...formData.vehicles];
    updatedVehicles[index] = { ...updatedVehicles[index], [name]: value };
    setFormData((prevData) => ({
      ...prevData,
      vehicles: updatedVehicles,
    }));
  };
  
  const handlereturnVehicleChange = (index:any, e:any) => {
    const { name, value } = e.target;
    const updatedreturnvehicles = [...formData.returnVehicles];
    updatedreturnvehicles[index] = { ...updatedreturnvehicles[index], [name]: value };
    setFormData((prevData) => ({
      ...prevData,
      returnVehicles: updatedreturnvehicles,
    }));
  };
  //   // Add new vehicle forms
  const addVehicleForm = () => {
    const newVehicleForms = [...vehicleForms, { id: Date.now() }];
    setVehicleForms(newVehicleForms);
  
    // Initialize the corresponding entry in the vehicles array
    setFormData((prevData) => ({
      ...prevData,
      vehicles: [
        ...prevData.vehicles,
        {
          id: Date.now(), // Unique ID for the vehicle
          carType: '', // Default value for carType
          vehicleRegistration: '',
          manufacturer: '',
          model: '',
          vin: '',
          taxStatus: '',
          motStatus: '',
          colour: '',
        },
      ],
    }));
  };
  const addReturnVehicleForm = () => {
    const uniqueId = Date.now(); // Generate a unique ID once
  
    const newReturnVehicleForms = [...returnVehicleForms, { id: uniqueId }];
    setReturnVehicleForms(newReturnVehicleForms);
  
    // Initialize the corresponding entry in the returnVehicles array
    setFormData((prevData) => ({
      ...prevData,
      returnVehicles: [
        ...prevData.returnVehicles,
        {
          carType: 'Used Car', // Default value for carType
          vehicleRegistration: '',
          manufacturer: '',
          model: '',
          vin: '',
          taxStatus: '',
          motStatus: '',
          colour: '',
        },
      ],
    }));
  };
  
  
  // const [jobId, setJobId] = useState('');
  //   // Remove specific return vehicle form
    const removeReturnVehicleForm = (id:any) => {
      setReturnVehicleForms(returnVehicleForms.filter((form) => form.id !== id));
    };
    const removeVehicleForm = (id:any) => {
      setVehicleForms(vehicleForms.filter((form) => form.id !== id));
    };
    const removeBothForms = (id:any) => {
      setReturnVehicleForms((prev) => prev.filter((form) => form.id !== id));
      setVehicleForms((prev) => prev.filter((form) => form.id !== id));
    };

        const [errors, setErrors] = useState<Record<string, string>>({});
    
  const handleRegistrationChange = (index:any, value:any) => {
    setFormData((prevFormData) => {
      const updatedvehicles = [...prevFormData.vehicles];
      updatedvehicles[index] = {
        ...updatedvehicles[index],
        vehicleRegistration: value,
      };
      return { ...prevFormData, vehicles: updatedvehicles };
    });
  };

  const handlereturnRegistrationChange = (index:any, value:any) => {
    setFormData((prevFormData) => {
      const updatedreturnvehicles = [...prevFormData.returnVehicles];
      updatedreturnvehicles[index] = {
        ...updatedreturnvehicles[index],
        vehicleRegistration: value,
      };
      return { ...prevFormData, returnVehicles: updatedreturnvehicles };
    });
  };

  
  const handleButtonClick = (button:any, index:any) => {
    setFormData((prevData) => {
      const updatedVehicles = [...prevData.vehicles];
      if (!updatedVehicles[index]) {
        updatedVehicles[index] = {}; // Initialize if undefined
      }
      updatedVehicles[index] = {
        ...updatedVehicles[index],
        carType: button,
      };
      return { ...prevData, vehicles: updatedVehicles };
    });
  };
  const handlereturnButtonClick = (button:any, index:any) => {
    setFormData((prevData) => {
      const updatedreturnvehicles = [...prevData.returnVehicles];
      if (!updatedreturnvehicles[index]) {
        updatedreturnvehicles[index] = {}; // Initialize if undefined
      }
      updatedreturnvehicles[index] = {
        ...updatedreturnvehicles[index],
        carType: button,
      };
      return { ...prevData, returnVehicles: updatedreturnvehicles };
    });
  };
  const addVehicleAndReturnForm = () => {
    const uniqueId = Date.now(); // Generate a unique ID
  
    // Add a normal vehicle form
    setVehicleForms((prevForms) => [
      ...prevForms,
      { id: uniqueId },
    ]);
  
    // Add a return vehicle form
    setReturnVehicleForms((prevForms) => [
      ...prevForms,
      { id: uniqueId },
    ]);
  
    // Update formData for both vehicle types
    setFormData((prevData) => ({
      ...prevData,
      vehicles: [
        ...(prevData.vehicles || []),
        {
          id: uniqueId, // Ensure matching ID for tracking
          carType: 'Used Car', // Default value
          vehicleRegistration: '',
          manufacturer: '',
          model: '',
          vin: '',
          taxStatus: '',
          motStatus: '',
          colour: '',
        },
      ],
      returnVehicles: [
        ...(prevData.returnVehicles || []),
        {
          id: uniqueId, // Ensure matching ID for tracking
          carType: 'Used Car', // Default value
          vehicleRegistration: '',
          manufacturer: '',
          model: '',
          vin: '',
          taxStatus: '',
          motStatus: '',
          colour: '',
        },
      ],
    }));
  };
  const [returnvehicleerrors, setreturnvehicleErrors] =useState<Record<string, string>>({});

  const handlereturnEnquiry = async (index:any, registrationNumber:any) => {
    try {
      // Clear error for this specific index before request
      setreturnvehicleErrors((prevErrors) => ({ ...prevErrors, [index]: null }));
  
      if (!registrationNumber?.trim()) {
        throw new Error(`Please enter a registration number.`);
      }
  
      const response = await fetch('https://zoomautos.co.uk/vehicle-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationNumber }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const vehicleData = await response.json();
      console.log(vehicleData);
  
      if (!vehicleData || Object.keys(vehicleData).length === 0) {
        throw new Error('No vehicle data found for this registration number.');
      }
  
      setFormData((prevData) => {
        const updatedreturnvehicles = [...prevData.returnVehicles];
        updatedreturnvehicles[index] = {
          ...updatedreturnvehicles[index],
          manufacturer: vehicleData.make || '',
          model: vehicleData.model || '',
          vin: vehicleData.vin || '',
          taxStatus: vehicleData.taxStatus || '',
          motStatus: vehicleData.motStatus || '',
          colour: vehicleData.colour || '',
        };
        console.log(updatedreturnvehicles[index].colour);
        return { ...prevData, returnVehicles: updatedreturnvehicles };
      });
  
    } catch (error:any) {
      // Store error message for this specific index
      let errorMessage = error.message;

    // If response status is 404, override error message
    if (error.message.includes("404")) {
      errorMessage = "Vehicle not found. Please check the registration number or Enter Data Manually.";
    }
      setreturnvehicleErrors((prevErrors) => ({
        ...prevErrors,
        [index]: errorMessage,
      }));
    }
  };
  
  const [vehicleerrors, setvehicleErrors] =useState<Record<string, string>>({});

const handleEnquiry = async (index:any, registrationNumber:any) => {
  try {
    setErrors((prevErrors) => ({ ...prevErrors, [index]: null })); // Clear error for this index

    if (!registrationNumber?.trim()) {
      throw new Error(`Please enter a registration number.`);
    }

    const response = await fetch('https://zoomautos.co.uk/vehicle-enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ registrationNumber }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const vehicleData = await response.json();

    if (!vehicleData || Object.keys(vehicleData).length === 0) {
      throw new Error('No vehicle data found for this registration number.');
    }

    setFormData((prevData) => {
      const updatedVehicles = [...(prevData.vehicles || [])];

      updatedVehicles[index] = {
        ...(updatedVehicles[index] || {}),
        manufacturer: vehicleData.make || '',
        model: vehicleData.model || '',
        vin: vehicleData.vin || '',
        taxStatus: vehicleData.taxStatus || '',
        motStatus: vehicleData.motStatus || '',
        colour: vehicleData.colour || '',
      };

      return { ...prevData, vehicles: updatedVehicles };
    });
  } catch (error:any) {
    let errorMessage = error.message;

    // If response status is 404, override error message
    if (error.message.includes("404")) {
      errorMessage = "Vehicle not found. Please check the registration number or Enter Data Manually.";
    }
    setvehicleErrors((prevErrors) => ({ ...prevErrors, [index]: errorMessage }));
  }
};

  
  
  const [existingIds, setExistingIds] = useState(new Set());
  const [jobId, setJobId] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

  const validateDateTime = () => {
    const { fromDate, fromTime, toDate, toTime } = formData;
    let error = '';

    if (new Date(toDate) < new Date(fromDate)) {
      error = 'To Date must be after From Date.';
    } else if (fromDate === toDate && fromTime >= toTime) {
      error = 'To Time must be after From Time.';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      dateTime: error,
    }));

    return !error;
  };
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle changes for form inputs
const handleChange = (index:any, e:any) => {
  if (!e || !e.target) {
    console.error("Event or target is undefined", e);
    return;
  }

  const { name, value } = e.target; // Extract name and value

  setFormData((prevData) => {
    const updatedVehicles = [...prevData.vehicles];
    updatedVehicles[index] = {
      ...updatedVehicles[index],
      [name]: value, // Dynamically update the field
    };

    return {
      ...prevData,
      vehicles: updatedVehicles,
    };
  });
};

const handleChange2 = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  if (!e?.target) {
    console.error("Event or target is undefined", e);
    return;
  }

  const { name, value } = e.target;

  setFormData((prevData) => ({
    ...prevData,
    [name]: value, // Dynamically update the top-level field
  }));
};


const handleReturnVehicleChange = (index:any, e:any) => {
  if (!e || !e.target) {
    console.error("Event or target is undefined", e);
    return;
  }

  const { name, value } = e.target;

  setFormData((prevData) => {
    const updatedReturnVehicles = [...prevData.returnVehicles];
    updatedReturnVehicles[index] = {
      ...updatedReturnVehicles[index],
      [name]: value,
    };
    return {
      ...prevData,
      returnVehicles: updatedReturnVehicles,
    };
  });
};

const handleChangegen = (e:any) => {
  const { name, value, type, checked } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value,
  }));
};

  // Submission handler
  const onSubmit = async (data:any) => {
    data.preventDefault();

    setLoading(true);
    if (formData.collectionAddress===formData.dropoffAddress ){
      setLoading(false);
      setFailure(true)
      setfailuremessage(failuremessage+'The Collection Address cannot be same with the delivery Address');

    }
    const hasDuplicate =
  // Check duplicates within the vehicles array
  formData.vehicles.some((vehicle:any, index:any, array:any) =>
    array.some(
      (v:any, i:any) =>
        i !== index &&
        (v.vehicleRegistration === vehicle.vehicleRegistration || v.vin && v.vin === vehicle.vin)
    )
  ) ||
  // Check duplicates within the returnVehicles array
  formData.returnVehicles.some((returnVehicle:any, index:any, array:any) =>
    array.some(
      (rv:any, i:any) =>
        i !== index &&
        (rv.vehicleRegistration === returnVehicle.vehicleRegistration || rv.vin && rv.vin === returnVehicle.vin)
    )
  ) ||
  // Check duplicates between vehicles and returnVehicles arrays
  formData.vehicles.some((vehicle:any) =>
    formData.returnVehicles.some(
      (returnVehicle:any) =>
        returnVehicle.vehicleRegistration === vehicle.vehicleRegistration || vehicle.vin === returnVehicle.vin
    )
  );

if (hasDuplicate) {
  setLoading(false);
  setFailure(true);
  setfailuremessage("Duplication found in return vehicles");
  
}
else{

    try {
      // Construct the payload
      const payload = {
        formType: 'Sub Contract Jobs',
        ...formData, // Spread formData to include its fields
        status:'pending',
        Review:'No',
      }
      const response = await axios.post('https://zoomautos.co.uk/car',payload);
      


      
      const { message, data } = response.data;
      const jobId2 = data;  // 'data' is the jobId in this case
      setJobId(jobId2);  // Set the jobId in state
      setLoading(false)
          setSuccess(true);
          
      try {
        const response2 = await axios.post("https://zoomautos.co.uk/api/Email/send-email", 
        {
        ...payload,
        jobId:data,
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
  }
  };
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
    <p>A car is taken from the collection point and delivered to its delivery point. From delivery point taking another vehicle and returned to the collection point.</p>
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
            This process describes a two-way vehicle transport system:
</p>
<p>
<strong>Outbound Trip:</strong> A car is picked up from the collection point and transported to its delivery point.
</p>
<p>
<strong>Return Trip:</strong> After delivering the first car, another vehicle is picked up from the delivery point and returned to the collection point.
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
            onChange={handleChangegen}
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
            onChange={handleChangegen}
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
            onChange={handleChangegen}
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
            onChange={handleChangegen}
            required
          />
        </div>
        </div>
        <h2>Services</h2>
     <div className='form-row'>
      <div className="form-group">
              <label htmlFor="roadworthy">Vehicle MOT/ Roadworthy?</label>
              <select id="roadworthy" name="roadworthy" value={formData.roadworthy} onChange={handleChangegen} required>
              <option value="" disabled selected hidden>
              Vehicle MOT/ Roadworthy?
    </option>
  <option value="yes">Yes</option>
  <option value="no">No</option>
</select>


            </div>
            </div>
      
            <div className='form-row'>
            <div className="form-group">
              <label htmlFor="movement">Movement Type?</label>
              <select id="movement" name="movement" value={formData.movement} onChange={handleChangegen} required>
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
              <select id="service" name="service" value={formData.service} onChange={handleChangegen} required>
              <option value="" disabled selected hidden>
              Service Type?
    </option>
    <option value="DRIVEN">DRIVEN</option>
<option value="TRANSPORT">TRANSPORT</option>
<option value="ANY" disabled>ANY</option>

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
        className={`buttonb ${formData.vehicles[index].carType === button ? "active" : ""}`}
        onClick={() => handleButtonClick(button, index)} // Pass index to handleButtonClick
      >
        {button}
      </button>
    ))}
  </div>
</div>

    </div>
    {
    
    formData.vehicles[index].carType==="New Car" &&(
      <>
           <div className="form-row">
      <div className="form-group">
        <label>Make</label>
        <input
          type="text"
          name="manufacturer"
          
          
          onChange={(e) => handleVehicleChange(index, e)} // Handle onChange for dynamic vehicles
        />
          {(errors.vehicles as any)?.[index]?.manufacturer && (
  <p className="error-message">
    {(errors.vehicles as any)[index].manufacturer.message}
  </p>
)}
      </div>
      
      <div className="form-group">
        <label>Model</label>
        <input
          type="text"
          name="model"
          
          onChange={(e) => handleChange(index, e)} // Handle onChange for dynamic vehicles
        />
        {/* {errors?.vehicles?.[index]?.model && (
          <p className="error-message">{errors?.vehicles?.[index]?.model.message}</p>
        )} */}
      </div>

      </div>
      <div className="form-row">
    <div className="form-group">
        <label>Chassis/VIN</label>
        <input
          type="text"
          name="vin"
          
          onChange={(e) => handleChange(index, e)} // Handle onChange for dynamic vehicles
        />
      </div>
      <div className="form-group">
        <label>Colour</label>
        <input
          type="text"
          name="colour"
          
          onChange={(e) => handleChange(index, e)} // Handle onChange for dynamic vehicles
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
    onChange={(e) => handleRegistrationChange(index, e.target.value)}
    required
  />
  <button
    onClick={() =>
      handleEnquiry(index, formData?.vehicles[index]?.vehicleRegistration)
    }
    type="button"
    className="contact-button"
  >
    Lookup
  </button>
    </div>
    {vehicleerrors[index] && <p style={{color:'red'}}>{vehicleerrors[index]}</p>}

    {/* Make and Model Inputs */}
    <div className="form-row">
    <div className="form-group">
  <label>Manufacturer</label>
  <input
  type="text"
  name="manufacturer" // This is important to target the correct key in the state
  value={formData?.vehicles[index]?.manufacturer || ""} // Fallback to empty string if value is undefined or null
  onChange={(e) => handleVehicleChange(index,e)} // Passing both event and index to handleChange
  required
/>
</div>

<div className="form-group">
  <label>Model<span style={{color:'red', fontSize:'0.8rem'}}> (Required)</span></label>
  <input
    type="text"
    name="model"
    value={formData?.vehicles[index]?.model || ""}
    onChange={(e) => handleVehicleChange(index,e)} // Passing both event and index to handleChange
  
    required
  />
</div>

<div className="form-group">
  <label>VIN <span style={{color:'red', fontSize:'0.8rem'}}> (Optional)</span></label>
  <input
    type="text"
    name="vin"
    
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
          value={formData?.vehicles[index]?.taxStatus || ""} // Bind the value to the state
          onChange={(e) => handleVehicleChange(index,e)} // Passing both event and index to handleChange
  
          required
        />
      </div>
      <div className="form-group">
        <label>MOT Status</label>
        <input
          type="text"
          name="motStatus"
          required
          value={formData?.vehicles[index]?.motStatus || ""} // Bind the value to the state
          onChange={(e) => handleVehicleChange(index,e)} // Passing both event and index to handleChange
  
        />
      </div>
      <div className="form-group">
        <label>Colour</label>
        <input
          type="text"
          name="colour"
          required
          value={formData?.vehicles[index]?.colour || ""} // Bind the value to the state
          onChange={(e) => handleVehicleChange(index,e)} // Passing both event and index to handleChange
  
        />
      </div>
    </div> 
    </>
        )}
  
  {index >= 1 && (
    <div className='form-group'>
    <button
      type="button"
      className="contact-button"
      onClick={() => removeBothForms(form.id)}
    >
      Remove
    </button>
    </div>
  )}
  </div>
))}

<div className='form-group'>
<button type="button" className="contact-button" onClick={addVehicleAndReturnForm}>
  Add Another Vehicle
</button>
</div>


      <h2>Collection Details</h2>
      <div className='form-row'>
      <div className='form-group'>
        <label htmlFor="collectioncontactName">Contact Name</label>
        <input
            type="text"
            id="collectioncontactName"
            name="collectioncontactName"
            value={formData.collectioncontactName}
            onChange={handleChangegen}
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
            onChange={handleChangegen}
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
            onChange={handleChangegen}
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
            onChange={handleChangegen}
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
            onChange={handleChangegen}
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
            onChange={handleChangegen}
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
            onChange={handleChangegen}
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
            onChange={handleChangegen}
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
            onChange={handleChangegen}
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
            onChange={handleChangegen}
            required
          />
        </div>
      </div>

{returnVehicleForms.map((form, index) => (
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
onClick={() => handlereturnButtonClick(button, index)} // Pass index to handleButtonClick

>
{button}
</button>
))}
</div>
</div>

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
required

onChange={(e) => handlereturnVehicleChange(index, e)} // Handle onChange for dynamic vehicles
/>
{/* {errors?.vehicles?.[index]?.manufacturer && (
<p className="error-message">{errors?.vehicles?.[index]?.manufacturer.message}</p>
)} */}
</div>

<div className="form-group">
<label>Model</label>
<input
type="text"
name="model"
required
onChange={(e) => handlereturnVehicleChange(index, e)} // Handle onChange for dynamic vehicles
/>
{/* {errors?.vehicles?.[index]?.model && (
<p className="error-message">{errors?.vehicles?.[index]?.model.message}</p>
)} */}
</div>

</div>
<div className="form-row">
<div className="form-group">
<label>VIN <span style={{color:'red', fontSize:'0.8rem'}}> (Optional)</span></label>
<input
type="text"
required
name="vin"

onChange={(e) => handlereturnVehicleChange(index, e)} // Handle onChange for dynamic vehicles
/>
</div>
<div className="form-group">
<label>Colour</label>
<input
type="text"
name="colour"
required
onChange={(e) => handlereturnVehicleChange(index, e)} // Handle onChange for dynamic vehicles
/>
</div>
</div> 


</>
)}
{formData.returnVehicles[index]?.carType==="Used Car" &&(
<>

{/* Vehicle Registration Input */}
<div className="form-group">
<label htmlFor={`vehicleRegistration-${index}`}>Vehicle Registration</label>
<input
type="text"
id={`vehicleRegistration-${index}`}
name="vehicleRegistration"
value={formData?.returnVehicles[index]?.vehicleRegistration || ''}
onChange={(e) => handlereturnRegistrationChange(index, e.target.value)}
required
/>
<button
onClick={() =>
handlereturnEnquiry(index, formData?.returnVehicles[index]?.vehicleRegistration)
}
type="button"
className="contact-button"
>
Lookup
</button>
</div>
{returnvehicleerrors[index] && <p className="error-message">{returnvehicleerrors[index]}</p>}

{/* Make and Model Inputs */}
<div className="form-row">
<div className="form-group">
<label>Manufacturer</label>
<input
type="text"
name="manufacturer" // This is important to target the correct key in the state
value={formData?.returnVehicles[index]?.manufacturer || ""} // Fallback to empty string if value is undefined or null
onChange={(e) => handleReturnVehicleChange(index,e)} // Passing both event and index to handleChange
required
/>
</div>

<div className="form-group">
<label>Model <span style={{color:'red', fontSize:'0.8rem'}}> (Required)</span></label>
<input
type="text"
name="model"

value={formData?.returnVehicles[index]?.model || ""}
onChange={(e) => handleReturnVehicleChange( index,e)}
required
/>
</div>

<div className="form-group">
<label>VIN</label>
<input
type="text"
name="vin"
value={formData?.returnVehicles[index]?.vin || ""}
onChange={(e) => handleReturnVehicleChange( index,e)}
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
onChange={(e) => handleReturnVehicleChange( index,e)}
required
/>
</div>
<div className="form-group">
<label>MOT Status</label>
<input
type="text"
name="motStatus"

value={formData?.returnVehicles[index]?.motStatus || ""} // Bind the value to the state
onChange={(e) => handleReturnVehicleChange( index,e)}
required
/>
</div>
<div className="form-group">
<label>Colour</label>
<input
type="text"
name="colour"

value={formData?.returnVehicles[index]?.colour || ""} // Bind the value to the state
onChange={(e) => handleReturnVehicleChange( index,e)}
required
/>
</div>
</div> 
</>
)}

    {/* Remove Button */}
    {index >= 1 && (
      <div className='form-group'>
      <button
        type="button"
        className="contact-button"
        onClick={() => removeBothForms(form.id)}
      >
        Remove
      </button>
      </div>
    )}
  </div>
))}


<div className='form-group'>
      <button type="button" className='contact-button' onClick={addVehicleAndReturnForm}>Add Another Return Vehicle</button>
      </div>
      <h2>Collection Details</h2>
      <div className='form-row'>
      <div className='form-group'>
        <label htmlFor="returncollectioncontactName">Contact Name</label>
        <input
            type="text"
            id="returncollectioncontactName"
            name="returncollectioncontactName"
            value={formData.returncollectioncontactName=formData.dropoffcontactName}
            onChange={handleChangegen}
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
            onChange={handleChangegen}
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
            onChange={handleChangegen}
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
            onChange={handleChangegen}
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
            onChange={handleChangegen}
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
            onChange={handleChangegen}
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
            onChange={handleChangegen}
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
            onChange={handleChangegen}
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
            onChange={handleChangegen}
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
            onChange={handleChangegen}
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
  required
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
        onChange={handleChangegen}
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
        onChange={handleChangegen}
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
        onChange={handleChangegen}
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
        onChange={handleChangegen}
      />
      <label htmlFor="specificToTime">Specific Date</label>
    </div>
  </div>
</div>

{errors.dateTime && <p className="error-message">{errors.dateTime}</p>}
      <h2>Additional Information</h2>
      <div className="form-group">
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChangegen}
          placeholder="Additional notes"
          
        />
      </div>

      <div className="form-group">
        <label htmlFor="releaseNotes">Release Notes:</label>
        <textarea
          id="releaseNotes"
          name="releaseNotes"
          value={formData.releaseNotes}
          onChange={handleChangegen}
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
      href="Termsandconditions"
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
      {Failure && (
        <div className='overlayStyle'
        onClick={() => setFailure(false)}>
          <div className='FailureStyle'
          onClick={() => setFailure(false)} >
          <p>{failuremessage}</p>
            
            </div>
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

export default ReturnJobform;
