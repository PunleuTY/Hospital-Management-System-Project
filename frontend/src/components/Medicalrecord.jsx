import { useState } from "react";
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

//Icons
import { TiDelete } from "react-icons/ti";
import { IoEyeSharp } from "react-icons/io5";

export default function MedicalRecord() {
  const [medicalRecords, setMedicalRecords] = useState([
    {
      record_id: "MR001",
      patient_id: "PAT001",
      appointment_id: "APT001",
      prescription:
        "Lisinopril 10mg once daily in the morning, preferably with food. Hydrochlorothiazide 25mg once daily. Monitor blood pressure weekly and maintain a log. Avoid potassium supplements unless specifically prescribed. Report any dizziness, persistent cough, or swelling to healthcare provider immediately.",
      diagnosis:
        "Essential Hypertension (Primary Hypertension) - Patient presents with consistently elevated blood pressure readings above 140/90 mmHg over multiple visits spanning 3 months. No underlying secondary causes identified through comprehensive workup including renal function tests, thyroid function, and echocardiogram.",
      lab_result:
        "Blood Pressure: 150/95 mmHg (elevated), Total Cholesterol: 220 mg/dL (borderline high), LDL: 145 mg/dL (elevated), HDL: 38 mg/dL (low), Triglycerides: 180 mg/dL (elevated), Fasting Glucose: 95 mg/dL (normal), Serum Creatinine: 1.0 mg/dL (normal), BUN: 18 mg/dL (normal), Urinalysis: Normal",
      treatment:
        "Comprehensive lifestyle modification program including DASH diet implementation with sodium restriction to less than 2300mg daily, structured exercise program with 30 minutes of moderate aerobic activity 5 days per week, weight management with target BMI reduction, stress management techniques, smoking cessation counseling, and regular blood pressure monitoring with home measurements twice daily.",
    },
    {
      record_id: "MR002",
      patient_id: "PAT002",
      appointment_id: "APT002",
      prescription:
        "Acetaminophen 500mg every 6 hours as needed for fever and body aches, maximum 3000mg in 24 hours. Dextromethorphan cough syrup 15ml every 4 hours as needed for cough. Increase fluid intake to 8-10 glasses of water daily. Use humidifier or steam inhalation for congestion relief.",
      diagnosis:
        "Viral Upper Respiratory Tract Infection (Common Cold) - Acute onset of rhinorrhea, nasal congestion, mild sore throat, and low-grade fever. Physical examination reveals clear nasal discharge, mild erythema of throat, no lymphadenopathy. Symptoms consistent with viral etiology, no bacterial complications evident.",
      lab_result:
        "Temperature: 100.2°F (mild fever), Throat Culture: Negative for Group A Streptococcus, Rapid Strep Test: Negative, White Blood Cell Count: 7,500/μL (normal range), Neutrophils: 60% (normal), Lymphocytes: 35% (normal), No signs of bacterial infection on laboratory analysis",
      treatment:
        "Symptomatic supportive care with adequate rest, increased fluid intake of warm liquids, throat lozenges for comfort, saline nasal rinses for congestion, humidifier use during sleep. Return to clinic if symptoms worsen, fever exceeds 101.5°F, or symptoms persist beyond 10 days. Avoid antibiotics as condition is viral in nature.",
    },
    {
      record_id: "MR003",
      patient_id: "PAT003",
      appointment_id: "APT003",
      prescription:
        "Metformin 500mg twice daily with breakfast and dinner to minimize gastrointestinal side effects. Glipizide 5mg once daily 30 minutes before breakfast. Blood glucose monitoring kit provided - check fasting glucose daily and 2-hour post-meal glucose twice weekly. Maintain glucose log for review at follow-up visits.",
      diagnosis:
        "Type 2 Diabetes Mellitus, newly diagnosed - Patient presents with classic symptoms of polyuria, polydipsia, and unexplained weight loss. Laboratory findings confirm diagnosis with HbA1c of 8.2% and fasting plasma glucose consistently above 126 mg/dL on multiple occasions. No evidence of diabetic ketoacidosis or hyperosmolar state.",
      lab_result:
        "HbA1c: 8.2% (significantly elevated, target <7%), Fasting Plasma Glucose: 145 mg/dL (elevated, normal <100), Random Glucose: 210 mg/dL (elevated), Comprehensive Metabolic Panel: Normal kidney function, Lipid Panel: Total Cholesterol 240 mg/dL, LDL 155 mg/dL, HDL 35 mg/dL, Triglycerides 220 mg/dL, Microalbumin: Negative",
      treatment:
        "Comprehensive diabetes management program including referral to certified diabetes educator for intensive education on blood glucose monitoring, carbohydrate counting, and medication management. Nutritionist consultation for meal planning and weight management. Ophthalmology referral for diabetic retinal screening. Podiatry evaluation for foot care education. Target HbA1c <7% with gradual reduction over 6 months.",
    },
    {
      record_id: "MR004",
      patient_id: "PAT004",
      appointment_id: "APT004",
      prescription:
        "Albuterol metered-dose inhaler 2 puffs every 4-6 hours as needed for wheezing or shortness of breath, maximum 12 puffs in 24 hours. Fluticasone propionate nasal spray 2 sprays each nostril once daily. Loratadine 10mg once daily for allergic symptoms. Peak flow meter provided for daily monitoring.",
      diagnosis:
        "Allergic Asthma with Seasonal Component - Patient experiences recurrent episodes of wheezing, chest tightness, and shortness of breath, particularly during spring and fall seasons. Pulmonary function tests show reversible airway obstruction. Allergy testing positive for environmental allergens including tree pollen, grass pollen, and dust mites.",
      lab_result:
        "Peak Expiratory Flow Rate: 320 L/min (below personal best of 420 L/min), Spirometry: FEV1 75% predicted with 15% improvement post-bronchodilator, Total IgE: 180 IU/mL (elevated), Specific IgE: Positive for tree pollen, grass pollen, dust mites, Complete Blood Count: Eosinophils 6% (mildly elevated)",
      treatment:
        "Environmental allergen avoidance strategies including HEPA air filtration, dust mite-proof bedding covers, regular cleaning protocols. Inhaler technique education and demonstration. Peak flow monitoring with action plan for symptom management. Follow-up in 2 weeks to assess treatment response and adjust medications as needed. Consider allergy immunotherapy if symptoms persist.",
    },
  ]);

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
                    <TableHead>Record ID</TableHead>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Appointment ID</TableHead>
                    <TableHead>Diagnosis</TableHead>
                    <TableHead>Prescription</TableHead>
                    <TableHead>Lab Results</TableHead>
                    <TableHead>Treatment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicalRecords.map((record) => (
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
              <AddMedicalRecord onClose={closeModal} onAddAppointment={handleAddMedicalRecord} />
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
