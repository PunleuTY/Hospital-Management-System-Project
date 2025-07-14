import { useState, useEffect } from "react";
import Button from "./Common/Button";
import Input from "./Common/Input";
import Pagination from "./Common/Pagination.jsx";
import { success, error } from "../components/utils/toast.js";

import PageBlurWrapper from "./Common/Blur-wrapper.jsx";
import ModalWrapper from "./Common/Modal-wrapper.jsx";
import StatisticCard from "./Common/statisticCard.jsx";
import Dropdown from "./Common/Dropdown.jsx";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./Common/Table.jsx";
import AddBilling from "./Form/addBilling.jsx";
import ModalColumn from "./Form/ModalColumn.jsx";
import AddMedicalRecord from "./Form/addMedicalRecord.jsx";

//API
import {
  getAllMedicalRecords,
  deleteMedicalRecord,
} from "../service/medicalrecordAPI.js";

//Icons
import { TiDelete } from "react-icons/ti";
import { IoEyeSharp } from "react-icons/io5";

export default function MedicalRecord() {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [paginationMeta, setPaginationMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllMedicalRecord(currentPage);
  }, [currentPage]);

  const fetchAllMedicalRecord = async (page = 1, limit = 10) => {
    setIsLoading(true);
    try {
      const response = await getAllMedicalRecords(page, limit);
      const medicalRecordsData = response.data?.data || response.data || [];
      const meta = response.data?.meta || {
        total: medicalRecordsData.length,
        page: 1,
        limit: 10,
        totalPages: Math.ceil(medicalRecordsData.length / 10),
      };

      setMedicalRecords(medicalRecordsData);
      setPaginationMeta(meta);
    } catch (err) {
      console.error("Failed to fetch medical records:", err.message);
      setMedicalRecords([]);
      setPaginationMeta({ total: 0, page: 1, limit: 10, totalPages: 1 });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddMedicalRecord = (newMedicalRecord) => {
    setMedicalRecords((prev) => [...prev, newMedicalRecord]);
    success("Medical record added successfully!");
  };

  const [modalData, setModalData] = useState({
    isOpen: false,
    title: "",
    content: "",
  });

  const handleDeleteRecord = async (recordId) => {
    try {
      await deleteMedicalRecord(recordId);
      setMedicalRecords((prev) =>
        prev.filter((record) => record.record_id !== recordId)
      );
      success("Medical record deleted successfully!");
    } catch (err) {
      console.error("Failed to delete medical record:", err.message);
      const errorMessage = err.response?.data?.message || err.message || "";

      if (errorMessage.includes("constraint") || errorMessage.includes("foreign key")) {
        error("Cannot delete medical record: This record has associated data.");
      } else {
        error("Failed to delete medical record. Please try again.");
      }
    }
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return "N/A";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const openModalColumns = (title, content) => {
    setModalData({
      isOpen: true,
      title,
      content,
    });
  };

  const closeModalColumns = () => {
    setModalData({
      isOpen: false,
      title: "",
      content: "",
    });
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <PageBlurWrapper isBlurred={modalData.isOpen}>
        <div className="h-full flex flex-col max-w-7xl mx-auto p-4">
          {/*Header*/}
          <div className="flex items-center justify-between mb-6 flex-shrink-0">
            <h1 className="text-3xl font-bold">Medical Records</h1>
            <Button content={"Add Medical Record"} onClick={openModal} />
          </div>

          {/*Table Container with Fixed Height*/}
          <div className="bg-white rounded-lg shadow flex-1 flex flex-col min-h-0">
            {/* Single Scrollable Table - Fixed height */}
            <div className="overflow-auto" style={{ height: "400px" }}>
              <Table>
                <TableHeader className="sticky top-0 z-10">
                  <TableRow>
                    <TableHead className="bg-gray-50">Record ID</TableHead>
                    <TableHead className="bg-gray-50">Patient ID</TableHead>
                    <TableHead className="bg-gray-50">Appointment ID</TableHead>
                    <TableHead className="bg-gray-50">Diagnosis</TableHead>
                    <TableHead className="bg-gray-50">Prescription</TableHead>
                    <TableHead className="bg-gray-50">Lab Results</TableHead>
                    <TableHead className="bg-gray-50">Treatment</TableHead>
                    <TableHead className="bg-gray-50">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicalRecords.length > 0 ? (
                    medicalRecords.map((record) => {
                      console.log("Medical record data:", record); // Debug log
                      return (
                        <TableRow
                          key={record.record_id || record.recordId || record.id}
                        >
                          <TableCell className="font-medium">
                            {record.record_id ||
                              record.recordId ||
                              record.id ||
                              "N/A"}
                          </TableCell>
                          <TableCell className="font-medium">
                            {record.patient_id || record.patientId || "N/A"}
                          </TableCell>
                          <TableCell className="font-medium">
                            {record.appointment_id ||
                              record.appointmentId ||
                              "N/A"}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="flex-1">
                                <div
                                  className="text-sm"
                                  title={record.diagnosis || "N/A"}
                                >
                                  {truncateText(record.diagnosis || "N/A", 40)}
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  openModalColumns(
                                    "Diagnosis Details",
                                    record.diagnosis || "No diagnosis available"
                                  )
                                }
                                className="flex-shrink-0 p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                                title="View full diagnosis"
                              >
                                <IoEyeSharp className="w-6 h-6" />
                              </button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="flex-1">
                                <div
                                  className="text-sm"
                                  title={record.prescription || "N/A"}
                                >
                                  {truncateText(
                                    record.prescription || "N/A",
                                    40
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  openModalColumns(
                                    "Prescription Details",
                                    record.prescription ||
                                      "No prescription available"
                                  )
                                }
                                className="flex-shrink-0 p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                                title="View full prescription"
                              >
                                <IoEyeSharp className="w-6 h-6" />
                              </button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="flex-1">
                                <div
                                  className="text-sm"
                                  title={
                                    record.lab_result ||
                                    record.labResult ||
                                    "N/A"
                                  }
                                >
                                  {truncateText(
                                    record.lab_result ||
                                      record.labResult ||
                                      "N/A",
                                    40
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  openModalColumns(
                                    "Lab Results",
                                    record.lab_result ||
                                      record.labResult ||
                                      "No lab results available"
                                  )
                                }
                                className="flex-shrink-0 p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                                title="View full lab results"
                              >
                                <IoEyeSharp className="w-6 h-6" />
                              </button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="flex-1">
                                <div
                                  className="text-sm"
                                  title={record.treatment || "N/A"}
                                >
                                  {truncateText(record.treatment || "N/A", 40)}
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  openModalColumns(
                                    "Treatment Details",
                                    record.treatment || "No treatment available"
                                  )
                                }
                                className="flex-shrink-0 p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                                title="View full treatment"
                              >
                                <IoEyeSharp className="w-6 h-6" />
                              </button>
                            </div>
                          </TableCell>

                          <TableCell>
                            <button
                              className="text-red-500 hover:text-red-700"
                              onClick={() =>
                                handleDeleteRecord(
                                  record.record_id ||
                                    record.recordId ||
                                    record.id
                                )
                              }
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
                        colSpan="8"
                        className="text-center text-gray-500 py-8"
                      >
                        No medical records found
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
        <AddMedicalRecord
          onClose={closeModal}
          onAddMedicalRecord={handleAddMedicalRecord}
        />
      </ModalWrapper>

      {/* Modal for viewing full text */}
      <ModalWrapper
        isOpen={modalData.isOpen}
        onClose={closeModalColumns}
        size="md"
        showCloseButton={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
      >
        <ModalColumn
          isOpen={modalData.isOpen}
          onClose={closeModalColumns}
          title={modalData.title}
        >
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">{modalData.title}</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {modalData.content}
            </p>
          </div>
        </ModalColumn>
      </ModalWrapper>
    </div>
  );
}
