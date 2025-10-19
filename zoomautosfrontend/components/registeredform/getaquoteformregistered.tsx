"use client"
import React, { useState, useEffect } from 'react';


import "./styles/buttonbar.css";

import { useRouter } from 'next/navigation';
import RegisteredContactFormStandardMovex from './standardcontractform';
import RegisteredReturnJobform from './returnjob';
import RegisteredOnwardvehicle from './onwardvehicle';
import RegisteredMultidropoffVehicleForm from './multidropoff';
const RegisteredContactFormMovex = () => {
  const router=useRouter();

  const [formContent, setFormContent] = useState('STANDARD');


  
const [usertype, setUserType]=useState('Business')
const handleoptionPress=(e:any)=>{
  const selectedValue=e.target.value;
  switch (selectedValue){
    case 'Business':
      setUserType('Business');
      break;
      case 'Individual':
        setUserType('Individual');
      break;
  }
}
const handleloginpress =(e:any)=>{
  router.push("/login");
}
  const handleoptionPress2 = (e:any) => {
    const selectedValue = e.target.value; // Get the selected value from the event
    switch (selectedValue) {
      case 'STANDARD':
        
        setFormContent('STANDARD');
        break;
      case 'RETURN JOB':
        setFormContent('RETURN JOB');
        break;
      case 'ONWARD VEHICLES':
        setFormContent('ONWARD VEHICLES');
        break;
      case 'MULTI DROP OFF':
        setFormContent('MULTI DROP OFF');
        break;
      default:
        setFormContent('');

    }
      }
     

  return (
    <>
    <div>
    <img
              src="/Background Logistics Homepage.png"
              alt="Logistics Background"
              className="background-image"
            />
    
    <div className="move-container">
        
      <div className="mve-form">
   



  


        
          {/* Car Owner Details */}
          <div className="form-group">
  <h2>JOB Type</h2>
  <select 
 
    onChange={handleoptionPress2} 
    style={{ width: 'max-content' }}
  >
    <option value="STANDARD">STANDARD</option>
    <option value="RETURN JOB">RETURN JOB</option>
    <option value="ONWARD VEHICLES">ONWARD VEHICLES</option>
    <option value="MULTI DROP OFF">MULTI DROP OFF</option>
  </select>
</div>

            

{
            formContent ==='STANDARD' &&(
              <RegisteredContactFormStandardMovex/>
            )

          }
          {
            formContent === 'RETURN JOB' &&(
         <RegisteredReturnJobform/>
            )

          }
          
      
            {formContent === 'ONWARD VEHICLES' && (
<RegisteredOnwardvehicle/>

                                )}
            {formContent === 'MULTI DROP OFF' && (
              <RegisteredMultidropoffVehicleForm/>
              )
            }
      </div>
      
    </div>
    </div>
    
    </>
  );
};

export default RegisteredContactFormMovex;
