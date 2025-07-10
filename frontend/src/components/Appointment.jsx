import { useState, useEffect } from "react";
import Button from "./Common/Button";
import Input from "./Common/Input";
import AddAppointment from "./Form/addAppointment.jsx";
import PageBlurWrapper from "./Common/Blur-wrapper.jsx";
import ModalWrapper from "./Common/Modal-wrapper.jsx";
import Dropdown from "./Common/Dropdown.jsx";
import { success, error } from "../components/utils/toast.js";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./Common/Table.jsx";
import { TiDelete } from "react-icons/ti";

import { getAllAppointments } from "../service/appointmentAPI.js";
import {
  deleteAppointment as deleteAppointmentAPI,
  updatedAppointment,
} from "../service/appointmentAPI.js";

export default function Appointment() {
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAllAppointment();
  }, []);

  // Helper functions to format date and time
  const formatDate = (dateTimeString) => {
    if (!dateTimeString) {
      return "N/A";
    }
    try {
      const date = new Date(dateTimeString);
      return date.toLocaleDateString(); // Returns just the date part (e.g., "12/25/2023")
    } catch (error) {
      return "N/A";
    }
  };

  const formatTime = (dateTimeString) => {
    if (!dateTimeString) {
      return "N/A";
    }
    try {
      const date = new Date(dateTimeString);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }); // Returns just time (e.g., "2:30 PM")
    } catch (error) {
      return "N/A";
    }
  };

  const fetchAllAppointment = async () => {
    try {
      const response = await getAllAppointments();
      console.log("Appointment API response:", response); // Debug log
      // Access the correct data structure based on backend response
      const appointmentsData = response.data?.data || response.data || [];
      console.log("Appointments data:", appointmentsData); // Debug log
      setAppointments(appointmentsData);
    } catch (err) {
      console.error("Failed to fetch appointments:", err.message);
      setAppointments([]);
    }
  };

  // Add appointment handler
  const handleAddAppointment = (newAppointment) => {
    setAppointments((prev) => [...prev, newAppointment]);
    success("Appointment added successfully!");
  };

  // Change status handler
  const handleStatusChange = async (id, newStatus) => {
    try {
      // Call API to update status in database
      await updatedAppointment(id, { status: newStatus });

      // Update local state
      setAppointments((prev) =>
        prev.map((a) => {
          const appointmentId = a.appointmentId || a.appointment_id || a.id;
          return appointmentId === id ? { ...a, status: newStatus } : a;
        })
      );

      console.log("Appointment status updated successfully");
    } catch (error) {
      console.error("Failed to update appointment status:", error);
      alert("Failed to update appointment status. Please try again.");
    }
  };

  // Filter logic
  const filteredAppointments = (appointments || []).filter((appointment) => {
    const appointmentDate =
      appointment.dateTime || appointment.date_time || appointment.date;
    const matchesDate = !filterDate || appointmentDate?.includes(filterDate);
    const matchesStatus =
      !filterStatus ||
      filterStatus === "All" ||
      appointment.status?.toLowerCase() === filterStatus.toLowerCase();
    return matchesDate && matchesStatus;
  });

  const deleteAppointment = async (id) => {
    try {
      await deleteAppointmentAPI(id); // call backend
      setAppointments((prev) =>
        prev.filter((a) => {
          const appointmentId = a.appointmentId || a.appointment_id || a.id;
          return appointmentId !== id;
        })
      ); // update state
      success("Appointment deleted successfully!");
    } catch (err) {
      console.error("Failed to delete appointment:", err.message);

      // Check if it's a constraint error
      const errorMessage = err.response?.data?.message || err.message || "";

      if (
        errorMessage.includes("Cannot delete appointment") ||
        errorMessage.includes("existing medical records")
      ) {
        error(
          "Cannot delete appointment: This appointment has existing medical records."
        );
      } else if (
        errorMessage.includes("constraint") ||
        errorMessage.includes("foreign key")
      ) {
        error(
          "Cannot delete appointment: This appointment has associated records in the system."
        );
      } else {
        error("Failed to delete appointment. Please try again.");
      }
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <PageBlurWrapper isBlurred={isModalOpen}>
        <div className="h-full flex flex-col max-w-7xl mx-auto p-4">
          {/*Header*/}
          <div className="flex items-center justify-between mb-6 flex-shrink-0">
            <h1 className="text-3xl font-bold">Appointments</h1>
            <Button content={"Book Appointment"} onClick={openModal} />
          </div>

          {/*Filter Date and Status*/}
          {/* <div className="flex gap-4 mb-6 flex-shrink-0">
            <div className="relative w-40">
              <Input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>
            <div className="relative z-11">
              <Dropdown
                options={["All", "Pending", "Confirmed", "Cancelled"]}
                defaultLabel="Filter by Status"
                value={filterStatus}
                onSelect={(option) => setFilterStatus(option)}
              />
            </div>
          </div> */}

          {/*Table Container with Fixed Height*/}
          <div className="bg-white rounded-lg shadow flex-1 flex flex-col min-h-0">
            {/* Single Scrollable Table - Fixed height */}
            <div className="overflow-auto" style={{ height: "400px" }}>
              <Table>
                <TableHeader className="sticky top-0 z-10">
                  <TableRow>
                    <TableHead className="bg-gray-50">APPOINTMENT ID</TableHead>
                    <TableHead className="bg-gray-50">PATIENT</TableHead>
                    <TableHead className="bg-gray-50">DOCTOR</TableHead>
                    <TableHead className="bg-gray-50">DATE</TableHead>
                    <TableHead className="bg-gray-50">TIME</TableHead>
                    <TableHead className="bg-gray-50">STATUS</TableHead>
                    <TableHead className="bg-gray-50">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => {
                      console.log("Appointment data:", appointment); // Debug log
                      return (
                        <TableRow
                          key={
                            appointment.id ||
                            appointment.appointmentId ||
                            appointment.appointment_id
                          }
                        >
                          <TableCell>
                            {appointment.appointmentId ||
                              appointment.appointment_id ||
                              appointment.id ||
                              "N/A"}
                          </TableCell>
                          <TableCell>
                            {appointment.patient
                              ? `${appointment.patient.firstName} ${appointment.patient.lastName}`
                              : appointment.patientId ||
                                appointment.patient_id ||
                                appointment.patientName ||
                                "N/A"}
                          </TableCell>
                          <TableCell>
                            {appointment.doctor
                              ? `Dr. ${appointment.doctor.firstName} ${appointment.doctor.lastName}`
                              : appointment.doctorId ||
                                appointment.doctor_id ||
                                appointment.doctorName ||
                                "N/A"}
                          </TableCell>
                          <TableCell>
                            {formatDate(
                              appointment.dateTime ||
                                appointment.date_time ||
                                appointment.date ||
                                appointment.appointmentDate
                            )}
                          </TableCell>
                          <TableCell>
                            {formatTime(
                              appointment.dateTime ||
                                appointment.date_time ||
                                appointment.time ||
                                appointment.appointmentTime
                            )}
                          </TableCell>
                          <TableCell>
                            <Dropdown
                              options={["Scheduled", "Confirmed", "Completed"]}
                              value={appointment.status || "Scheduled"}
                              defaultLabel={appointment.status || "Scheduled"}
                              onSelect={(value) =>
                                handleStatusChange(
                                  appointment.id ||
                                    appointment.appointmentId ||
                                    appointment.appointment_id,
                                  value
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <button
                              onClick={() =>
                                deleteAppointment(
                                  appointment.id ||
                                    appointment.appointmentId ||
                                    appointment.appointment_id
                                )
                              }
                              className="text-red-500 hover:text-red-700"
                            >
                              <TiDelete className="w-8 h-8" />
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan="7"
                        className="text-center text-gray-500 py-8"
                      >
                        No appointments found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </PageBlurWrapper>

      <ModalWrapper
        isOpen={isModalOpen}
        onClose={closeModal}
        size="md"
        showCloseButton={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
      >
        <AddAppointment
          onClose={closeModal}
          onAddAppointment={handleAddAppointment}
        />
      </ModalWrapper>
    </div>
  );
}
