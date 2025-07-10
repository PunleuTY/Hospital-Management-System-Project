import { useState, useEffect } from "react";
import Button from "./Common/Button";
import Input from "./Common/Input";
import Pagination from "./Common/Pagination.jsx";
import PageBlurWrapper from "./Common/Blur-wrapper.jsx";
import ModalWrapper from "./Common/Modal-wrapper.jsx";
import Dropdown from "./Common/Dropdown.jsx";
import { getUserRole } from "../utils/auth.js";
import { success, error } from "../components/utils/toast.js";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./Common/Table.jsx";
import AddPatient from "./Form/addPatient.jsx";
import { TiDelete } from "react-icons/ti";

//API
import { getAllPatients, deletePatient } from "../service/patientAPI.js";

export default function Patient() {
  const [patients, setPatients] = useState([]);
  const [paginationMeta, setPaginationMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Get user role to determine permissions
  const userRole = getUserRole();

  useEffect(() => {
    fetchAllPatient(currentPage);
  }, [currentPage]);

  const fetchAllPatient = async (page = 1, limit = 10) => {
    setIsLoading(true);
    try {
      const response = await getAllPatients(page, limit);
      const patientsData = response.data.data || [];
      const meta = response.data.meta || {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
      };

      setPatients(patientsData);
      setPaginationMeta(meta);
    } catch (err) {
      console.error("Failed to fetch patients:", err.message);
      setPatients([]);
      setPaginationMeta({ total: 0, page: 1, limit: 10, totalPages: 1 });
    } finally {
      setIsLoading(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddPatient = (newPatient) => {
    setPatients((prev) => [...prev, newPatient]);
    // Refresh the current page to get updated data
    fetchAllPatient(currentPage);
    success("Patient added successfully!");
  };

  const handleDeletePatient = async (patientId) => {
    try {
      await deletePatient(patientId);
      // Remove from local state and refresh data
      fetchAllPatient(currentPage);
      success("Patient deleted successfully!");
      console.log("Patient deleted successfully");
    } catch (err) {
      console.error("Failed to delete patient:", err.message);

      // Check if it's a constraint error
      const errorMessage = err.response?.data?.message || err.message || "";

      if (
        errorMessage.includes("Cannot delete patient") ||
        errorMessage.includes(
          "existing appointments, medical records, or billings"
        )
      ) {
        error(
          "Cannot delete patient: This patient has existing appointments, medical records, or billing records."
        );
      } else if (
        errorMessage.includes("constraint") ||
        errorMessage.includes("foreign key")
      ) {
        error(
          "Cannot delete patient: This patient has associated records in the system."
        );
      } else {
        error("Failed to delete patient. Please try again.");
      }
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <PageBlurWrapper>
        <div className="h-full flex flex-col max-w-6xl mx-auto p-4">
          {/*Header*/}
          <div className="flex items-center justify-between mb-6 flex-shrink-0">
            <h1 className="text-3xl font-bold">Patient</h1>
            {/* Only hide Add Patient button for doctors */}
            {userRole && userRole !== "doctor" && (
              <Button content={"Add Patient"} onClick={openModal} />
            )}
          </div>

          {/*Search and Filter*/}
          {/* <div className="flex flex-col sm:flex-row gap-4 mb-6 flex-shrink-0">
            <div className="flex-1">
              <SearchBar
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative z-11">
              <Dropdown
                options={["All status", "Active", "Inactive"]}
                defaultLabel="Filter by Status"
                value={filterStatus}
                onSelect={(option) => setFilterStatus(option)}
              />
            </div>
          </div> */}

          {/*Table Container with Fixed Height*/}
          <div className="bg-white rounded-lg shadow flex-1 flex flex-col min-h-0">
            {/* Single Scrollable Table - Fixed height for 5 rows */}
            <div className="overflow-auto" style={{ height: "400px" }}>
              <Table>
                <TableHeader className="sticky top-0 z-10">
                  <TableRow>
                    <TableHead className="bg-gray-50">Patient ID</TableHead>
                    <TableHead className="bg-gray-50">Last Name</TableHead>
                    <TableHead className="bg-gray-50">First Name</TableHead>
                    <TableHead className="bg-gray-50">Height (m)</TableHead>
                    <TableHead className="bg-gray-50">Weight (kg)</TableHead>
                    <TableHead className="bg-gray-50">Date of Birth</TableHead>
                    <TableHead className="bg-gray-50">Address</TableHead>
                    <TableHead className="bg-gray-50">Contact</TableHead>
                    <TableHead className="bg-gray-50">Email</TableHead>
                    <TableHead className="bg-gray-50">Doctor</TableHead>
                    <TableHead className="bg-gray-50">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell
                        colSpan="11"
                        className="text-center text-gray-500 py-8"
                      >
                        Loading patients...
                      </TableCell>
                    </TableRow>
                  ) : patients.length > 0 ? (
                    patients.map((patient) => {
                      console.log("Patient data:", patient); // Debug log
                      return (
                        <TableRow
                          key={
                            patient.patientId ||
                            patient.patient_id ||
                            patient.id
                          }
                        >
                          <TableCell className="font-medium">
                            {patient.patientId ||
                              patient.patient_id ||
                              patient.id ||
                              "N/A"}
                          </TableCell>
                          <TableCell className="font-medium">
                            {patient.last_name || patient.lastName || "N/A"}
                          </TableCell>
                          <TableCell className="font-medium">
                            {patient.first_name || patient.firstName || "N/A"}
                          </TableCell>
                          <TableCell className="font-medium">
                            {patient.height || "N/A"}m
                          </TableCell>
                          <TableCell className="font-medium">
                            {patient.weight || "N/A"}kg
                          </TableCell>
                          <TableCell className="font-medium">
                            {patient.date_of_birth ||
                              patient.dateOfBirth ||
                              "N/A"}
                          </TableCell>
                          <TableCell className="font-medium">
                            {patient.address || "N/A"}
                          </TableCell>
                          <TableCell className="font-medium">
                            {patient.contact || "N/A"}
                          </TableCell>
                          <TableCell className="font-medium">
                            {patient.email || "N/A"}
                          </TableCell>
                          <TableCell className="font-medium">
                            {patient.doctors && patient.doctors.length > 0
                              ? patient.doctors
                                  .map(
                                    (doctor) =>
                                      `Dr. ${doctor.firstName} ${doctor.lastName}`
                                  )
                                  .join(", ")
                              : "No Doctor Assigned"}
                          </TableCell>
                          <TableCell>
                            <button
                              onClick={() =>
                                handleDeletePatient(
                                  patient.patientId ||
                                    patient.patient_id ||
                                    patient.id
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
                        colSpan="11"
                        className="text-center text-gray-500 py-8"
                      >
                        No patients found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t bg-gray-50">
              <Pagination
                currentPage={paginationMeta.page}
                totalPages={paginationMeta.totalPages}
                totalItems={paginationMeta.total}
                itemsPerPage={paginationMeta.limit}
                onPageChange={handlePageChange}
                showItemsInfo={true}
                showPageNumbers={true}
                maxVisiblePages={5}
                className="justify-between"
              />
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
