import { React } from "react";
import { useState } from "react";
import Button from "../Common/Button";
import Dropdown from "../Common/Dropdown";
import Label from "../Common/Label";
import Input from "../Common/Input";
import { Card, CardHeader, CardContent } from "../Common/Card";
import { motion } from "framer-motion";
import { createStaff } from "../../service/staffAPI.js";
import { success, error } from "../utils/toast.js";
//Icons
import { MdOutlineGroups } from "react-icons/md";
import { GiNetworkBars } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";

export default function AddStaff({ onClose, onAddStaff }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    role: "",
    contact: "",
    specialization: "",
    departmentId: "",
    doctorId: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.gender ||
      !formData.role ||
      !formData.contact ||
      !formData.departmentId
    ) {
      error("Please fill in all required fields.");
      return;
    }

    try {
      const newStaff = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        role: formData.role,
        contact: formData.contact,
        specialization: formData.specialization,
        departmentId: parseInt(formData.departmentId),
        doctorId: formData.doctorId ? parseInt(formData.doctorId) : null,
      };

      const response = await createStaff(newStaff);
      console.log("Staff created successfully:", response);

      if (onAddStaff) {
        onAddStaff(response.data || response);
      }
      if (onClose) {
        onClose();
      }

      success("Staff added successfully!");
    } catch (error) {
      console.error("Failed to create staff:", error);
      error("Failed to create staff. Please try again.");
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
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2">
              <MdOutlineGroups className="text-3xl text-blue-500" />
              <h1 className="text-xl font-semibold text-gray-900">New Staff</h1>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handlesubmit} className="space-y-6">
              {/*Staff Information*/}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <FaRegUser className="text-l text-blue-500" />
                      <h2 className="text-lg font-medium text-gray-900">
                        Staff Information
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label required>First Name</Label>
                        <Input
                          type="text"
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
                          type="text"
                          placeholder="Enter last name"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label required>Gender</Label>
                        <Dropdown
                          options={["Male", "Female"]}
                          defaultLabel="Select your Gender"
                          value={formData.gender}
                          onSelect={(value) =>
                            handleInputChange("gender", value)
                          }
                        />
                      </div>

                      <div>
                        <Label required>Contact Number</Label>
                        <Input
                          type="number"
                          placeholder="Phone number(e.g.069 924 540)"
                          value={formData.contact}
                          onChange={(e) =>
                            handleInputChange("contact", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/*Job Information*/}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <GiNetworkBars className="text-l text-blue-500" />
                      <h2 className="text-lg font-medium text-gray-900">
                        Job Information
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label required>Role/Position</Label>
                        <Input
                          type="text"
                          placeholder="Enter your role/postion"
                          value={formData.role}
                          onChange={(e) =>
                            handleInputChange("role", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>Specialization</Label>
                        <Input
                          type="text"
                          placeholder="Enter your specialization"
                          value={formData.specialization}
                          onChange={(e) =>
                            handleInputChange("specialization", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label required>Department ID</Label>
                        <Input
                          type="number"
                          placeholder="Enter Department ID"
                          value={formData.departmentId}
                          onChange={(e) =>
                            handleInputChange("departmentId", e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <Label>Doctor ID (Supervisor)</Label>
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

                  {/*Submit Button*/}
                  <motion.div className="mt-6">
                    <Button
                      content={"Create Patient Record"}
                      type="submit"
                      className="w-full"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
