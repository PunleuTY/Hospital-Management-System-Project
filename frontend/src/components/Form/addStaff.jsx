import { React } from 'react';
import { useState } from 'react';
import Button from '../Common/Button';  
import Dropdown from '../Common/Dropdown';
import Label from '../Common/Label';
import Input from '../Common/Input';
import { Card, CardHeader, CardContent } from '../Common/Card';

//Icons
import { MdOutlineGroups } from "react-icons/md";
import { GiNetworkBars } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";

export default function AddStaff() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        gender: "",
        role: "",
        contact: "",
        specialization: "",
        departmentID: "",
        doctorID: "",
    });

    const handlesubmit = () => {
        e.preventDefault();
        alert("Staff add sucessfully")
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    return (
        <div className='min-h-screen bg-gray-100 py-8 px-4'>
            <div className='max-w-4xl mx-auto bg-white p-8 rounded-lg'>
                <Card>
                    <CardHeader className='text-center'>
                        <div className='flex items-center justify-center gap-2'>
                            <MdOutlineGroups className='text-3xl text-blue-500' />
                            <h1 className='text-xl font-semibold text-gray-900'>New Staff</h1>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handlesubmit} className="space-y-6">
                            {/*Staff Information*/}
                            <div>
                                <div className='flex items-center gap-2'>
                                    <FaRegUser className='text-l text-blue-500' />
                                    <h2 className='text-lg font-medium text-gray-900'>Staff Information</h2>
                                </div>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                                    <div>
                                        <Label required>First Name</Label>
                                        <Input
                                            type="text"
                                            placeholder="Enter first name"
                                            value={formData.first_name}
                                            onChange={(e) => handleInputChange("first_name", e.target.value)}  /> 
                                    </div>

                                    <div>
                                        <Label required>Last Name</Label>
                                        <Input
                                            type="text"
                                            placeholder="Enter last name"
                                            value={formData.last_name}
                                            onChange={(e) => handleInputChange("last_name", e.target.value)}  />
                                    </div>
                                </div>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                                    <div>
                                        <Label required>Gender</Label>
                                        <Dropdown
                                            options={["Male","Female"]}
                                            defaultLabel="Select your Gender"
                                            value={formData.first_name}
                                            onSelect={(value) => handleInputChange("Gender", value)}  /> 
                                    </div>

                                    <div>
                                        <Label required>Contact Number</Label>
                                        <Input
                                            type="number"
                                            placeholder="Enter your phone number(e.g. 069 924 540)"
                                            value={formData.last_name}
                                            onChange={(e) => handleInputChange("contact", e.target.value)}  />
                                    </div>
                                </div>
                            </div>

                            {/*Job Information*/}
                            <div>
                                <div className='flex items-center gap-2 mb-2'>
                                    <GiNetworkBars className='text-l text-blue-500' />
                                    <h2 className='text-lg font-medium text-gray-900'>Job Information</h2>
                                </div>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                                    <div>
                                        <Label required>Role/Position</Label>
                                        <Input
                                            type="text"                                           
                                            placeholder="Enter your role/postion"
                                            value={formData.role}
                                            onChange={(e) => handleInputChange("role", e.target.value)}  />
                                    </div>
                                    <div>
                                        <Label required>Specialization</Label>
                                        <Input
                                            type="text"                                           
                                            placeholder="Enter your specialization"
                                            value={formData.specialization}
                                            onChange={(e) => handleInputChange("specialization", e.target.value)}  />
                                    </div>
                                </div>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                                    <div>
                                        <Label required>DepartmentID</Label>
                                        <Dropdown
                                            options={[1,2,3,4,5]}
                                            defaultLabel="Select DepartmentID"
                                            value={formData.departmentID}
                                            onSelect={(value) => handleInputChange("departmentID", value)}  />  
                                    </div>

                                    <div>
                                        <Label required>StaffID(Doctor)</Label>
                                        <Dropdown
                                            options={[1,2,3,4,5]}
                                            defaultLabel="Select DoctorID"
                                            value={formData.departmentID}
                                            onSelect={(value) => handleInputChange("doctorID", value)}  />  
                                    </div>
                                </div>
                            </div>

                            {/*Submit Button*/}
                            <div className="mt-6">
                                <Button
                                    content={"Create Patient Record"}
                                    onClick={handlesubmit}
                                    className="w-full"
                                />
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}