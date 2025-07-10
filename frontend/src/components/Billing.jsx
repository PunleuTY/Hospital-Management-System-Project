import { React } from "react";
import Button from "./Common/Button";
import { useState, useEffect } from "react";
//import Input from './Common/Input';
import Pagination from "./Common/Pagination.jsx";
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
import AddBilling from "./Form/addBilling.jsx";

//API
import { getAllBillings, updateBill } from "../service/billingAPI.js";

//Icons
import { TiDelete } from "react-icons/ti";

export default function Billing() {
  const [bills, setBills] = useState([]);
  const [paginationMeta, setPaginationMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllBilling(currentPage);
  }, [currentPage]);

  const fetchAllBilling = async (page = 1, limit = 10) => {
    setIsLoading(true);
    try {
      const response = await getAllBillings(page, limit);
      console.log("Billing API response:", response); // Debug log
      const billsData = response.data?.data || response.data || [];
      const meta = response.data?.meta || {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
      };

      setBills(billsData);
      setPaginationMeta(meta);
    } catch (err) {
      console.error("Failed to fetch billing data:", err.message);
      setBills([]);
      setPaginationMeta({ total: 0, page: 1, limit: 10, totalPages: 1 });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Add a new bill
  const handleAddBill = (newBill) => {
    setBills((prev) => [...prev, newBill]);
    // Refresh the current page to get updated data
    fetchAllBilling(currentPage);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleStatusChange = async (billId, newStatus) => {
    try {
      // Call API to update status in database
      await updateBill(billId, { paymentStatus: newStatus.toLowerCase() });

      // Update local state
      setBills((prev) =>
        prev.map((bill) => {
          const id = bill.billing_id || bill.billId || bill.id;
          if (id === billId) {
            return {
              ...bill,
              payment_status: newStatus.toLowerCase(),
              paymentStatus: newStatus.toLowerCase(),
              status: newStatus.toLowerCase(),
            };
          }
          return bill;
        })
      );

      console.log("Bill status updated successfully");
    } catch (error) {
      console.error("Failed to update bill status:", error);
      alert("Failed to update bill status. Please try again.");
    }
  };

  const handleDeleteBill = (billId) => {
    setBills((prev) =>
      prev.filter((bill) => {
        const id = bill.billing_id || bill.billId || bill.id;
        return id !== billId;
      })
    );
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <PageBlurWrapper isBlurred={isModalOpen}>
        <div className="h-full flex flex-col max-w-7xl mx-auto p-4">
          {/*Header*/}
          <div className="flex items-center justify-between mb-6 flex-shrink-0">
            <h1 className="text-3xl font-bold">Billings</h1>
            <Button content="Create Bill" onClick={openModal} />
          </div>

          {/*Table Container with Fixed Height*/}
          <div className="bg-white rounded-lg shadow flex-1 flex flex-col min-h-0">
            {/* Single Scrollable Table - Fixed height */}
            <div className="overflow-auto" style={{ height: "300px" }}>
              <Table>
                <TableHeader className="sticky top-0 z-10">
                  <TableRow>
                    <TableHead className="bg-gray-50">Bill ID</TableHead>
                    <TableHead className="bg-gray-50">
                      Receptionist ID
                    </TableHead>
                    <TableHead className="bg-gray-50">Patient ID</TableHead>
                    <TableHead className="bg-gray-50">Treatment Fee</TableHead>
                    <TableHead className="bg-gray-50">Medication Fee</TableHead>
                    <TableHead className="bg-gray-50">Lab Test Fee</TableHead>
                    <TableHead className="bg-gray-50">Consultant Fee</TableHead>
                    <TableHead className="bg-gray-50">Total Amount</TableHead>
                    <TableHead className="bg-gray-50">Status</TableHead>
                    <TableHead className="bg-gray-50">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell
                        colSpan="10"
                        className="text-center text-gray-500 py-8"
                      >
                        Loading bills...
                      </TableCell>
                    </TableRow>
                  ) : bills.length > 0 ? (
                    bills.map((bill) => {
                      console.log("Bill data:", bill); // Debug log
                      return (
                        <TableRow
                          key={bill.billing_id || bill.billId || bill.id}
                        >
                          <TableCell className="font-medium">
                            {bill.billing_id || bill.billId || bill.id || "N/A"}
                          </TableCell>
                          <TableCell>
                            {bill.receptionist
                              ? `${bill.receptionist.firstName} ${bill.receptionist.lastName}`
                              : bill.receptionist_id ||
                                bill.receptionistId ||
                                "N/A"}
                          </TableCell>
                          <TableCell>
                            {bill.patient
                              ? `${bill.patient.firstName} ${bill.patient.lastName}`
                              : bill.patient_id || bill.patientId || "N/A"}
                          </TableCell>
                          <TableCell className="font-medium">
                            $
                            {(
                              bill.treatment_fee ||
                              bill.treatmentFee ||
                              0
                            ).toFixed(2)}
                          </TableCell>
                          <TableCell className="font-medium">
                            $
                            {(
                              bill.medication_fee ||
                              bill.medicationFee ||
                              0
                            ).toFixed(2)}
                          </TableCell>
                          <TableCell className="font-medium">
                            $
                            {(
                              bill.lab_test_fee ||
                              bill.labTestFee ||
                              0
                            ).toFixed(2)}
                          </TableCell>
                          <TableCell className="font-medium">
                            $
                            {(
                              bill.consultation_fee ||
                              bill.consultationFee ||
                              0
                            ).toFixed(2)}
                          </TableCell>
                          <TableCell className="font-bold text-lg">
                            $
                            {(
                              bill.total_amount ||
                              bill.totalAmount ||
                              0
                            ).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Dropdown
                              options={["Paid", "Unpaid"]}
                              value={
                                (
                                  bill.payment_status ||
                                  bill.paymentStatus ||
                                  bill.status ||
                                  "unpaid"
                                ).toLowerCase() === "paid"
                                  ? "Paid"
                                  : "Unpaid"
                              }
                              defaultLabel={
                                (
                                  bill.payment_status ||
                                  bill.paymentStatus ||
                                  bill.status ||
                                  "unpaid"
                                ).toLowerCase() === "paid"
                                  ? "Paid"
                                  : "Unpaid"
                              }
                              onSelect={(value) =>
                                handleStatusChange(
                                  bill.billing_id || bill.billId || bill.id,
                                  value
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <button
                              className="text-red-500 hover:text-red-700"
                              onClick={() =>
                                handleDeleteBill(
                                  bill.billing_id || bill.billId || bill.id
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
                        colSpan="10"
                        className="text-center text-gray-500 py-8"
                      >
                        No bills found
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
        <AddBilling onClose={closeModal} onAddBill={handleAddBill} />
      </ModalWrapper>
    </div>
  );
}
