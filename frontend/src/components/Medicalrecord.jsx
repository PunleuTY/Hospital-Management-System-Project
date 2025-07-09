import { useState, useEffect } from "react";
import Button from "./Common/Button";
import Input from "./Common/Input";

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
import { getAllMedicalRecords } from "../service/medicalrecordAPI.js";

//Icons
import { TiDelete } from "react-icons/ti";
import { IoEyeSharp } from "react-icons/io5";


export default function MedicalRecord() {
  const [medicalrecords, setMedicalRecords] = useState([]);

  useEffect(() => {
    fetchAllMedicalRecord()
  }, []);

  const fetchAllMedicalRecord = async () => {
    try{
      const medicalrecords = await getAllMedicalRecords();
      setMedicalRecords(medicalrecords);
    } catch(err){
      console.error("Failed to fetch medical records:", err.message);
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleAddMedicalRecord = (newMedicalRecord) => {
    setMedicalRecords((prev) => [...prev, newMedicalRecord]);
  };

  const [modalData, setModalData] = useState({
    isOpen: false,
    title: "",
    content: "",
  });

  const handleDeleteRecord = (recordId) => {
    setMedicalRecords((prev) =>
      prev.filter((record) => record.record_id !== recordId)
    );
  };

  const truncateText = (text, maxLength = 50) => {
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
    <div className="min-h-screen bg-gray-50 p-6">
      <PageBlurWrapper isBlurred={modalData.isOpen}>
        <div className="max-w-7xl mx-auto">
          {/*Header*/}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Medical Records</h1>
            <Button
              content={"Add Medical Record"}
              onClick={openModal}  
            />
          </div>

          {/* Medical Records Table */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="sticky top-0 bg-gray-200 z-10">Record ID</TableHead>
                    <TableHead className="sticky top-0 bg-gray-200 z-10">Patient ID</TableHead>
                    <TableHead className="sticky top-0 bg-gray-200 z-10">Appointment ID</TableHead>
                    <TableHead className="sticky top-0 bg-gray-200 z-10">Diagnosis</TableHead>
                    <TableHead className="sticky top-0 bg-gray-200 z-10">Prescription</TableHead>
                    <TableHead className="sticky top-0 bg-gray-200 z-10">Lab Results</TableHead>
                    <TableHead className="sticky top-0 bg-gray-200 z-10">Treatment</TableHead>
                    <TableHead className="sticky top-0 bg-gray-200 z-10">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicalrecords.map((record) => (
                    <TableRow key={record.record_id}>
                      <TableCell className="font-medium">
                        {record.record_id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {record.patient_id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {record.appointment_id}
                      </TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <div className="flex-1">
                            <div className="text-sm" title={record.diagnosis}>
                                {truncateText(record.diagnosis, 40)}
                            </div>
                            </div>
                            <button
                            onClick={() =>
                                openModalColumns("Diagnosis Details", record.diagnosis)
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
                              title={record.prescription}
                            >
                              {truncateText(record.prescription, 40)}
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              openModalColumns(
                                "Prescription Details",
                                record.prescription
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
                            <div className="text-sm" title={record.lab_result}>
                              {truncateText(record.lab_result, 40)}
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              openModalColumns(
                                "Lab Results",
                                record.lab_result
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
                            <div className="text-sm" title={record.treatment}>
                                {truncateText(record.treatment, 40)}
                            </div>
                            </div>
                            <button
                            onClick={() =>
                                openModalColumns(
                                "Treatment Details",
                                record.treatment
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
                          onClick={() => handleDeleteRecord(record.record_id)}
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
              <AddMedicalRecord onClose={closeModal} onAddMedicalRecord={handleAddMedicalRecord} />
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
