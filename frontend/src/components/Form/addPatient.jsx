import { React } from "react";
import { useState } from "react";
import Button from "../Common/Button";
import Dropdown from "../Common/Dropdown";
import Label from "../Common/Label";
import Input from "../Common/Input";
import Textarea from "../Common/Textarea";
import { Card, CardHeader, CardContent } from "../Common/Card";
import { createPatient } from "../../service/patientAPI.js";
import { success, error } from "../utils/toast.js";

//Icons
import { RiUserAddLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { GiBodyHeight } from "react-icons/gi";
import { IoIosMailUnread } from "react-icons/io";

export default function AddPatient({ onClose, onAddPatient }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    height: "",
    weight: "",
    dateOfBirth: "",
    address: "",
    contact: "",
    email: "",
    doctorId: "", // Change from staffID to doctorId for the patient-doctor relationship
  });
  const handlesubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.height ||
      !formData.weight ||
      !formData.dateOfBirth ||
      !formData.address ||
      !formData.contact ||
      !formData.email ||
      !formData.doctorId
    ) {
      error("Please fill in all required fields.");
      return;
    }

    try {
      const newPatient = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
        contact: formData.contact,
        email: formData.email,
        doctorId: parseInt(formData.doctorId), // This will be handled separately for patient-doctor relationship
      };

      const response = await createPatient(newPatient);
      console.log("Patient created successfully:", response);

      if (onAddPatient) {
        onAddPatient(response.data || response);
      }
      if (onClose) {
        onClose();
      }

      success("Patient added successfully!");
    } catch (error) {
      console.error("Failed to create patient:", error);
      error("Failed to create patient. Please try again.");
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <RiUserAddLine className="text-2xl text-blue-500" />
              <h1 className="text-xl font-semibold text-gray-900">
                Patient Registration Form
              </h1>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handlesubmit} className="space-y-6">
              {/*Patient Personal Information*/}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <FaRegUser className="text-l text-blue-500 gap-2" />
                  <h2 className="text-lg font-medium text-gray-900">
                    Patient Personal Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label required>First Name</Label>
                    <Input
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label required>Last Name</Label>
                    <Input
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                  <div>
                    {/*DOB*/}
                    <Label required>Date of Birth</Label>
                    <Input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        handleInputChange("dateOfBirth", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    {/*Doctor (staff table)*/}
                    <Label required>Doctor ID</Label>
                    <Input
                      type="number"
                      placeholder="Enter Doctor ID"
                      value={formData.doctorId}
                      onChange={(e) =>
                        handleInputChange("doctorId", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/*Patient Physical Information*/}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <GiBodyHeight className="text-2xl text-blue-500" />
                  <h2 className="text-lg font-medium text-gray-900">
                    Physical Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label required>Height (meters)</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 1.75"
                      value={formData.height}
                      onChange={(e) =>
                        handleInputChange("height", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label required>Weight (kilograms)</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 70"
                      value={formData.weight}
                      onChange={(e) =>
                        handleInputChange("weight", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/*Contact Information*/}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <IoIosMailUnread className="text-2xl text-blue-500" />
                  <h2 className="text-lg font-medium text-gray-900">
                    Contact Information
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    {/*Address */}
                    <Label required>Address</Label>
                    <Textarea
                      placeholder="Enter complete address including street, city, state, and postal code"
                      rows={3}
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      {/*Phone Number*/}
                      <Label required>Contact Number</Label>
                      <Input
                        type="tel"
                        placeholder="e.g.,069924540"
                        value={formData.contact}
                        onChange={(e) =>
                          handleInputChange("contact", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      {/*Email Address*/}
                      <Label required>Email Address</Label>
                      <Input
                        type="email"
                        placeholder="patient@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                      />
                    </div>
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
