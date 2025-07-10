import { useState } from "react";
import { Card, CardHeader, CardContent } from "../Common/Card.jsx";
import Label from "../Common/Label.jsx";
import Input from "../Common/Input.jsx";
import Dropdown from "../Common/Dropdown.jsx";
import Button from "../Common/Button.jsx";
import { SiReacthookform } from "react-icons/si";
import { motion } from "framer-motion";
import { createAppointment } from "../../service/appointmentAPI.js";
import { success, error } from "../utils/toast.js";

export default function AddAppointment({ onClose, onAddAppointment }) {
  const [formData, setFormData] = useState({
    purpose: "",
    preferredDate: "",
    preferredTime: "",
    doctorId: "",
    patientId: "",
    status: "pending", // default to pending
  });

  async function handlesubmit(e) {
    e.preventDefault();

    // Basic validation
    if (
      !formData.purpose ||
      !formData.preferredDate ||
      !formData.preferredTime ||
      !formData.patientId ||
      !formData.doctorId
    ) {
      error("Please fill in all required fields.");
      return;
    }

    try {
      // Combine date and time into a single datetime string
      const appointmentDateTime = `${formData.preferredDate}T${formData.preferredTime}:00`;

      const newAppointment = {
        purpose: formData.purpose,
        dateTime: appointmentDateTime,
        patientId: parseInt(formData.patientId),
        doctorId: parseInt(formData.doctorId),
        status: formData.status || "pending",
      };

      const response = await createAppointment(newAppointment);
      console.log("Appointment created successfully:", response);

      if (onAddAppointment) {
        onAddAppointment(response.data || response);
      }
      if (onClose) {
        onClose();
      }

      success("Appointment created successfully!");
    } catch (error) {
      console.error("Failed to create appointment:", error);
      error("Failed to create appointment. Please try again.");
    }
  }

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
            <div className="flex items-center justify-center gap-2">
              <SiReacthookform className="text-2xl text-blue-1000" />
              <h1 className="text-xl font-semibold text-gray-900">
                Appointment Form
              </h1>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlesubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <div className="space-y-4">
                  <div>
                    <Label required>Purpose of Visit</Label>
                    <Input
                      placeholder="What is your purpose ..."
                      value={formData.purpose}
                      onChange={(e) =>
                        handleInputChange("purpose", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label required>Date</Label>
                      <Input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) =>
                          handleInputChange("preferredDate", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label required>Time</Label>
                      <Input
                        placeholder="Appointment Time (24:00)"
                        value={formData.preferredTime}
                        onChange={(e) =>
                          handleInputChange("preferredTime", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label required>Patient ID</Label>
                      <Input
                        placeholder="Enter Patient ID"
                        value={formData.patientId}
                        onChange={(e) =>
                          handleInputChange("patientId", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label required>Doctor ID</Label>
                      <Input
                        placeholder="Enter Doctor ID"
                        value={formData.DoctorID}
                        onChange={(e) =>
                          handleInputChange("DoctorID", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label required>Status</Label>
                    <Dropdown
                      options={["Pending", "Confirmed", "Cancelled"]}
                      defaultLabel="Choose Status"
                      onSelect={(value) => handleInputChange("status", value)}
                      value={formData.status}
                    />
                  </div>
                  <motion.div
                    className="flex flex-col gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <Button
                      content={"Create Appointment"}
                      className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      type="submit"
                      isAddIcon={false}
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
