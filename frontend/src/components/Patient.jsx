import { useState,useMemo } from "react";
import Button from "./Common/Button";
import Input from "./Common/Input";
import SearchBar from "./Common/SearchBar";

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
import AddPatient from "./Form/addPatient.jsx"
import { TiDelete } from "react-icons/ti";

export default function Patient() {
  const [patients, setPatients] = useState([
    {
      patient_id: "P001",
      last_name: "Smith",
      first_name: "John",
      height: 1.75,
      weight: 78.5,
      date_of_birth: "1979-03-15",
      address: "123 Main Street, Springfield, IL 62701",
      contact: "+1 (555) 123-4567",
      email: "john.smith@email.com",
      doctor_id: "Dr. Sarah Johnson - Cardiology",
      status: "active",
      last_visit: "2024-01-15",
    },
    {
      patient_id: "P002",
      last_name: "Wilson",
      first_name: "Sarah",
      height: 1.62,
      weight: 65.0,
      date_of_birth: "1992-07-22",
      address: "456 Oak Avenue, Chicago, IL 60601",
      contact: "+1 (555) 234-5678",
      email: "sarah.wilson@email.com",
      doctor_id: "Dr. Michael Brown - Family Medicine",
      status: "active",
      last_visit: "2024-01-14",
    },
    {
      patient_id: "P003",
      last_name: "Davis",
      first_name: "Mike",
      height: 1.8,
      weight: 85.2,
      date_of_birth: "1966-11-08",
      address: "789 Pine Road, Milwaukee, WI 53202",
      contact: "+1 (555) 345-6789",
      email: "mike.davis@email.com",
      doctor_id: "Dr. Emily Lee - Endocrinology",
      status: "inactive",
      last_visit: "2024-01-10",
    },
    {
      patient_id: "P004",
      last_name: "Taylor",
      first_name: "Emma",
      height: 1.68,
      weight: 58.7,
      date_of_birth: "1996-05-30",
      address: "321 Elm Street, Detroit, MI 48201",
      contact: "+1 (555) 456-7890",
      email: "emma.taylor@email.com",
      doctor_id: "Dr. Robert Wilson - Pulmonology",
      status: "active",
      last_visit: "2024-01-16",
    },
    {
      patient_id: "P005",
      last_name: "Johnson",
      first_name: "Mark",
      height: 1.77,
      weight: 72.3,
      date_of_birth: "1987-09-12",
      address: "654 Maple Drive, Phoenix, AZ 85001",
      contact: "+1 (555) 567-8901",
      email: "mark.johnson@email.com",
      doctor_id: "Dr. Lisa Anderson - Dermatology",
      status: "active",
      last_visit: "2024-01-12",
    }
  ]);

  const [filterStatus, setFilterStatus] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleAddPatient = (newPatient) => {
    setPatients((prev) => [...prev, newPatient]);
  };

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const handleDeletePatient = (patientId) => {
    setPatients((prev) => prev.filter((patient) => patient.patient_id !== patientId))
  }

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const fullName = `${patient.first_name} ${patient.last_name}`.toLowerCase();
      const matchesSearch = fullName.includes(searchTerm.toLowerCase());
      // If filterStatus is "All status", show all, else match status (case-insensitive)
      const matchesStatus =
        filterStatus === "All status" ||
        filterStatus === "All" ||
        filterStatus === "" ||
        patient.status.toLowerCase() === filterStatus.toLowerCase();
        return matchesSearch && matchesStatus;
    });
  }, [patients, searchTerm, filterStatus]);

  // Change status handler
  const handleStatusChange = (id, newStatus) => {
    setPatients((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: newStatus } : a
      )
    );

    //Change using frontend can write logic here
    //-> Code <-
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <PageBlurWrapper>
        <div className="max-w-6xl mx-auto">
          {/*Header*/}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Patient</h1>
            <Button content={"Add Patient"} onClick={openModal} />
          </div>

          {/*Search and Filter*/}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <SearchBar
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className='relative z-11'>
              <Dropdown
                options={["All status", "Active", "Inactive"]}
                defaultLabel='Filter by Status'
                value={filterStatus}
                onSelect={(option) => setFilterStatus(option)}
              />
            </div>
          </div>

          {/*Table*/}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="sticky top-0 bg-gray-200 z-10">Patient ID</TableHead>
                    <TableHead className="sticky top-0 bg-gray-200 z-10">Last Name</TableHead>
                    <TableHead className="sticky top-0 bg-gray-200 z-10">First Name</TableHead>
                    <TableHead className="sticky top-0 bg-gray-200 z-10">Height (m)</TableHead>
                    <TableHead className="sticky top-0 bg-gray-200 z-10">Weight (kg)</TableHead>
                    <TableHead className="sticky top-0 bg-gray-200 z-10">Date of Birth</TableHead>
                    <TableHead className="sticky top-0 bg-gray-200 z-10">Address</TableHead>
                    <TableHead className="sticky top-0 bg-gray-200 z-10">Contact</TableHead>
                    <TableHead className="sticky top-0 bg-gray-200 z-10">Email</TableHead>
                    <TableHead className="sticky top-0 bg-gray-200 z-10">Doctor</TableHead>
                    <TableHead className="sticky top-0 bg-gray-200 z-10">Status</TableHead>
                    <TableHead className="sticky top-0 bg-gray-200 z-10">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.patient_id}>
                      <TableCell className="font-medium">{patient.patient_id}</TableCell>
                      <TableCell className="font-medium">{patient.last_name}</TableCell>
                      <TableCell className="font-medium">{patient.first_name}</TableCell>
                      <TableCell className="font-medium">{patient.height}m</TableCell>
                      <TableCell className="font-medium">{patient.weight}kg</TableCell>
                      <TableCell className="font-medium">{patient.date_of_birth}</TableCell>
                      <TableCell className="font-medium">{patient.address}</TableCell>        
                      <TableCell className="font-medium">{patient.contact}</TableCell>
                      <TableCell className="font-medium">{patient.email}</TableCell>
                      <TableCell className="font-medium">{patient.doctor_id}</TableCell>
                      <TableCell>
                        <Dropdown
                          options={["Active", "Inactive"]}
                          value={patient.status}
                          onSelect={(value) => handleStatusChange(patient.patient_id, value)}
                        />
                      </TableCell>
                      <TableCell>
                        <button onClick={() => handleDeletePatient(patient.patient_id)} className='text-red-500 hover:text-red-700'>
                          <TiDelete className='w-8 h-8' />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
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
        <AddPatient onClose={closeModal} onAddPatient={handleAddPatient} />
      </ModalWrapper>

    </div>
  );
}