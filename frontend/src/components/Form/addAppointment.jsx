import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../Common/Card.jsx';
import Label from '../Common/Label.jsx';
import Input from '../Common/Input.jsx';
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
    preferredDoctor: "",
    additionalNotes: "",
  });

  function handlesubmit(e){
    e.preventDefault();
    alert("Appointment scheduled successfully!");
  }




  return (
    <div className='min-h-screen bg-gray-100 py-8 px-4'>
      <div className='max-w-2xl mx-auto bg-white p-8 rounded-lg'>
        <Card>
          {/*Header of the form*/}
          <CardHeader className="text-center">
            <div className="flex items-center justify-between gab-3 mb-2">
              {/*for icons <div></div>*/}
              <h1 className="text-xl font-semibold text-gray-900">Appointment Form</h1>
            </div>
          </CardHeader>

          {/*Content of the form*/}
          <CardContent>
            <form on onSubmit={handlesubmit} className="space-y-6">
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

                </div>

                

                
              </div>  
            </form>
          </CardContent>
        </Card>
      </div>

    </div>


    

  );
}