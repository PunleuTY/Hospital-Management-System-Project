import { React } from 'react';
import { useState } from 'react';
import Button from '../Common/Button';  
import Dropdown from '../Common/Dropdown';
import Label from '../Common/Label';
import Input from '../Common/Input';
import { Card, CardHeader, CardContent } from '../Common/Card';

//Icons
import { HiOutlineCalculator } from "react-icons/hi"; 
import { FaUserDoctor } from "react-icons/fa6";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export default function AddBilling() {
    const [formData, setFormData] = useState({
        patientID: "",
        receptionistID: "",
        treatmentFee: "",
        medicationFee: "",
        labTestFee: "",
        consultationFee: "",
        totalAmount: "",
        paymentStatus: "",
    });

    const handlesubmit = (e) => {
        e.preventDefault();
        alert("Billing Added Successfully");
    }

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }


    return (
        <div className='min-h-screen bg-gray-100 py-8 px-4'>
            <div className='max-w-2xl mx-auto bg-white p-8 rounded-lg'>
                <Card>
                    <CardHeader className="text-center">
                        <div className="flex items-center justify-center gap-2">
                            <HiOutlineCalculator className="text-2xl text-blue-1000" />
                            <h1 className="text-xl font-semibold text-gray-900">Billing Form</h1>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handlesubmit} className="space-y-6">
                            {/*Patient and Staff*/}
                            <div>
                                <div className='flex items-center gap-3 mb-3'>
                                    <FaUserDoctor className="text-l text-blue-1000" />
                                    <h2 className="text-lg font-semibold text-gray-900">Patient and Staff ID</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label required>Patient ID</Label>
                                        {/*PatientID from db*/}
                                        <Dropdown
                                            options={[1,2,3]}
                                            defaultLabel='Select PatientID'
                                            onSelect={(value) => handleInputChange("patientID", value)} />
                                    </div>
                                    <div>
                                        <Label required>Receptionist ID</Label>
                                        {/*ReceptionistID from db*/}
                                        <Dropdown
                                            options={[1,2,3]}
                                            defaultLabel='Select ReceptionistID'
                                            onSelect={(value) => handleInputChange("receptionistID", value)} />
                                    </div>
                                    
                                </div>
                            </div>

                            {/*Billing Fees*/}      
                            <div>
                                <div className='flex items-center gap-3 mb-3'>
                                    <RiMoneyDollarCircleLine className="text-2xl text-blue-1000" />
                                    <h2 className="text-lg font-semibold text-gray-900">Billing Fees</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                    <div>
                                        <Label required>Treatment Fee</Label>
                                        <Input
                                            type="number"
                                            placeholder="Enter Treatment Fee"
                                            value={formData.treatmentFee}
                                            onChange={(e) => handleInputChange("treatmentFee", e.target.value)} />
                                    </div>
                                    <div>
                                        <Label required>Medication Fee</Label>
                                        <Input
                                            type="number"
                                            placeholder="Enter Medication Fee"
                                            value={formData.medicationFee}
                                            onChange={(e) => handleInputChange("medicationFee", e.target.value)} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label required>Lab Test Fee</Label>
                                        <Input
                                            type="number"
                                            placeholder="Enter Lab Test Fee"
                                            value={formData.labTestFee}
                                            onChange={(e) => handleInputChange("labTestFee", e.target.value)} />
                                    </div>
                                    <div>
                                        <Label required>Consultation Fee</Label>
                                        <Input
                                            type="number"
                                            placeholder="Enter Consultation Fee"
                                            value={formData.consultationFee}
                                            onChange={(e) => handleInputChange("consultationFee", e.target.value)} />
                                    </div>
                                </div>
                            
                                {/*Payment Status*/}
                                <div className="mt-4">
                                    <Label required>Payment Status</Label>
                                    {/*PaymentStatus*/}
                                    <Dropdown
                                        options={["Paid", "Unpaid"]}
                                        defaultLabel='Select Payment Status'
                                        onSelect={(value) => handleInputChange("paymentStatus", value)} />
                                </div>

                                {/*Total Amount*/}
                                <div className="mt-4">
                                    <Label>Total Amount</Label>
                                    <Input
                                        type="number"
                                        placeholder="$ Total Amount"
                                        value={formData.totalAmount}
                                        readOnly
                                    />
                                </div>

                                {/*Button*/}
                                <div className="mt-6">
                                    <Button
                                        content={"Create Billing Records"}
                                        onClick={handlesubmit}
                                        className="w-full"
                                    />
                                </div>         
                           </div>
                        </form>
                    </CardContent>                    
                </Card>
            </div>
        </div>
    );
};