import { React } from "react";
import { useState } from "react";
import Button from "../Common/Button";
import Dropdown from "../Common/Dropdown";
import Label from "../Common/Label";
import Input from "../Common/Input";
import Textarea from "../Common/Textarea";
import { Card, CardHeader, CardContent } from "../Common/Card";
import { createMedicalRecord } from "../../service/medicalrecordAPI.js";
import { success, error } from "../utils/toast.js";

//Icons
import { FaUserDoctor } from "react-icons/fa6";
import { FaNotesMedical } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";

export default function AddMedicalRecord({ onClose, onAddMedicalRecord }) {
  const [formData, setFormData] = useState({
    prescription: "",
    diagnosis: "",
    labResult: "",
    treatment: "",
    appointmentId: "",
    patientId: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.diagnosis ||
      !formData.treatment ||
      !formData.prescription ||
      !formData.patientId ||
      !formData.appointmentId
    ) {
      error("Please fill in all required fields.");
      return;
    }

    try {
      const newMedicalRecord = {
        diagnosis: formData.diagnosis,
        treatment: formData.treatment,
        prescription: formData.prescription,
        labResult: formData.labResult,
        patientId: parseInt(formData.patientId),
        appointmentId: parseInt(formData.appointmentId),
      };

      const response = await createMedicalRecord(newMedicalRecord);
      console.log("Medical record created successfully:", response);

      if (onAddMedicalRecord) {
        onAddMedicalRecord(response.data || response);
      }
      if (onClose) {
        onClose();
      }

      success("Medical record added successfully!");
    } catch (error) {
      console.error("Failed to create medical record:", error);
      error("Failed to create medical record. Please try again.");
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
            <div className="flex items-center justify-center gap-2">
              <FaNotesMedical className="text-2xl text-blue-500" />
              <h1 className="text-xl font-semibold text-gray-900">
                Medical Record Form
              </h1>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handlesubmit} className="space-y-6">
              {/*Patient and Staff*/}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <FaUserDoctor className="text-l text-blue-1000" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Patient and Staff ID
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label required>Patient ID</Label>
                    <Input
                      type="number"
                      placeholder="Enter Patient ID"
                      value={formData.patientId}
                      onChange={(e) =>
                        handleInputChange("patientId", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label required>Appointment ID</Label>
                    <Input
                      type="number"
                      placeholder="Enter Appointment ID"
                      value={formData.appointmentId}
                      onChange={(e) =>
                        handleInputChange("appointmentId", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/*Medical Record Details*/}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <GrNotes className="text-l text-blue-1000" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Medical Record Details
                  </h2>
                </div>
                <div className="space-y-6">
                  {/* Diagnosis */}
                  <div>
                    <Label required>Diagnosis</Label>
                    <Textarea
                      placeholder="Enter detailed diagnosis ..."
                      rows={4}
                      value={formData.diagnosis}
                      onChange={(e) =>
                        handleInputChange("diagnosis", e.target.value)
                      }
                      className="min-h-[100px]"
                    />
                  </div>

                  {/* Treatment */}
                  <div>
                    <Label required>Treatment Plan</Label>
                    <Textarea
                      placeholder="Enter the treatment plan ..."
                      rows={4}
                      value={formData.treatment}
                      onChange={(e) =>
                        handleInputChange("treatment", e.target.value)
                      }
                      className="min-h-[100px]"
                    />
                  </div>

                  {/* Prescription */}
                  <div>
                    <Label required>Prescription</Label>
                    <Textarea
                      placeholder="Enter all prescribed medications ..."
                      rows={5}
                      value={formData.prescription}
                      onChange={(e) =>
                        handleInputChange("prescription", e.target.value)
                      }
                      className="min-h-[120px]"
                    />
                  </div>

                  {/* Lab Results */}
                  <div>
                    <Label>Laboratory Results</Label>
                    <Textarea
                      placeholder="Enter laboratory test ..."
                      rows={4}
                      value={formData.labResult}
                      onChange={(e) =>
                        handleInputChange("labResult", e.target.value)
                      }
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                {/*Button*/}
                <div className="mt-6">
                  <Button
                    content={"Create Medical Records"}
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
}
