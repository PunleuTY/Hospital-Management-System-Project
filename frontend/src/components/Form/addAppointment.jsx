import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../Common/Card.jsx';
import Label from '../Common/Label.jsx';
import Input from '../Common/Input.jsx';
import Dropdown from '../Common/Dropdown.jsx';
import Button from '../Common/Button.jsx';
import { SiReacthookform } from "react-icons/si";

/*
import { Button } from '../Common/Button.jsx';
import { Dropdown } from '../Common/Dropdown.jsx';
import { Input } from '../Common/Input.jsx';
*/

export default function AddAppointment() {
  //const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    purposeOfVisit: "",
    preferredDate: "",
    preferredTime: "",
    DoctorID: "",
    PatientID:"",
  });

  function handlesubmit(e){
    e.preventDefault();
    alert("Appointment Added Successfully");
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }


  return (
    <div className='min-h-screen bg-gray-100 py-8 px-4'>
      <div className='max-w-2xl mx-auto bg-white p-8 rounded-lg'>
        <Card>
          {/*Header of the form*/}
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2">
              <SiReacthookform className="text-2xl text-blue-1000" />
              <h1 className="text-xl font-semibold text-gray-900">Appointment Form</h1>
            </div>
          </CardHeader>

          {/*Content of the form*/}
          <CardContent>
            <form onSubmit={handlesubmit} className="space-y-6">
              {/*nothing important just keep border of Patient information part*/}
              <div>
                <div className="space-y-4">
                  <div>
                    <Label required>Purpose of Visit</Label>
                    <Input
                      placeholder="What is your purpose ..."
                      value={formData.purposeOfVisit}
                      onChange={(e) => handleInputChange("purposeOfVisit", e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label required>Date</Label>
                      <Input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange("preferredDate", e.target.value)} />
                    </div>
                    <div>
                      <Label required>Time</Label>
                      <Input
                        placeholder="Appointment Time (24:00)"
                        value={formData.preferredTime}
                        onChange={(e) => handleInputChange("preferredTime", e.target.value)}
                        
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label required>Patient ID</Label>
                      <Dropdown
                      options={[1,2,3,4,5]}
                      defaultLabel='Select Patient ID'
                      onSelect={(value) => handleInputChange("PatientID", value)} />
                    </div>
                    <div> 
                      <Label required>Doctor ID</Label>
                      <Dropdown
                        options={[1,2,3,4,5]}
                        defaultLabel='Select Doctor ID'
                        onSelect={(value) => handleInputChange("DoctorID",value)}/>
                        
                    </div>
                  </div>

                  <div className='flex flex-col gap-4'>
                    <Button
                      content={"Submit Form"}
                      className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      onClick={handlesubmit}
                      // No need for + icon here  
                      isAddIcon={false} 
                    />
                      
                    
                  </div>



                </div>

                

                
              </div>  
            </form>
          </CardContent>
        </Card>
      </div>

    </div>


    

  );
}