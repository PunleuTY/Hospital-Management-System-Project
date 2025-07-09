import { useState } from "react";
import Button from "./Common/Button";
import Input from "./Common/Input";
import AddAppointment from "./Form/addAppointment.jsx";
import PageBlurWrapper from "./Common/Blur-wrapper.jsx";
import ModalWrapper from "./Common/Modal-wrapper.jsx";
import Dropdown from "./Common/Dropdown.jsx";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./Common/Table.jsx";
import { TiDelete } from "react-icons/ti";

import { getAllAppointment } from "../service/appointmentAPI.js";
import { deleteAppointment as deleteAppointmentAPI } from "../service/appointmentAPI.js";

export default function Appointment() {
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAllAppointment();
  }, []);

  const fetchAllAppointment = async () => {
    try {
      const appointments = await getAllAppointment();
      setAppointments(appointments);
    } catch (err) {
      console.error("Failed to fetch appointments:", err.message);
    }
  };

  // Add appointment handler
  const handleAddAppointment = (newAppointment) => {
    setAppointments((prev) => [...prev, newAppointment]);
  };

  // Change status handler
  const handleStatusChange = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  // Filter logic
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesDate = !filterDate || appointment.date === filterDate;
    const matchesStatus =
      !filterStatus ||
      filterStatus === "All" ||
      appointment.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesDate && matchesStatus;
  });

  const deleteAppointment = async (id) => {
    try {
      await deleteAppointmentAPI(id); // call backend
      setAppointments((prev) => prev.filter((a) => a.id !== id)); // update state
    } catch (err) {
      console.error("Failed to delete appointment:", err.message);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      className="min-h-screen bg-gray-50 p-6"
      style={{ height: "calc(100% - 60px)" }}
    >
      <PageBlurWrapper isBlurred={isModalOpen}>
        <div className="max-w-7xl mx-auto">
          {/*Header*/}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Appointments</h1>
            <Button content={"Book Appointment"} onClick={openModal} />
          </div>

          {/*Filter Date and Status*/}
          <div className="flex gap-4 mb-2">
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
          </div>

          {/*Tables*/}
          <div className="bg-white shadow-md rounded-lg mt-6 ">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky top-0 bg-gray-200 z-10">
                    APPOINTMENT ID
                  </TableHead>
                  <TableHead className="sticky top-0 bg-gray-200 z-10">
                    PATIENT
                  </TableHead>
                  <TableHead className="sticky top-0 bg-gray-200 z-10">
                    DOCTOR
                  </TableHead>
                  <TableHead className="sticky top-0 bg-gray-200 z-10">
                    DATE
                  </TableHead>
                  <TableHead className="sticky top-0 bg-gray-200 z-10">
                    TIME
                  </TableHead>
                  <TableHead className="sticky top-0 bg-gray-200 z-10">
                    STATUS
                  </TableHead>
                  <TableHead className="sticky top-0 bg-gray-200 z-10">
                    ACTIONS
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.id}</TableCell>
                    <TableCell>{appointment.patient}</TableCell>
                    <TableCell>{appointment.doctor}</TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>
                      <Dropdown
                        options={["Pending", "Confirmed", "Cancelled"]}
                        value={appointment.status}
                        onSelect={(value) =>
                          handleStatusChange(appointment.id, value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => deleteAppointment(appointment.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <TiDelete className="w-8 h-8" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
