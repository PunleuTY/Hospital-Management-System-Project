import { React } from "react";
import Button from "./Common/Button";
import { useState, useEffect } from "react";
import Input from "./Common/Input";
import Pagination from "./Common/Pagination.jsx";
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
import AddStaff from "./Form/addStaff.jsx";

//API
import {
  getAllStaffs,
  deleteStaff as deleteStaffAPI,
} from "../service/staffAPI.js";

//Icons
import { TiDelete } from "react-icons/ti";

export default function Staff() {
  const [staff, setStaffs] = useState([]);
  const [paginationMeta, setPaginationMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllStaff(currentPage);
  }, [currentPage]);

  const fetchAllStaff = async (page = 1, limit = 10) => {
    setIsLoading(true);
    try {
      const response = await getAllStaffs(page, limit);
      console.log("Staff API response:", response); // Debug log
      const staffData = response.data?.data || response.data || [];
      const meta = response.data?.meta || {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
      };

      setStaffs(staffData);
      setPaginationMeta(meta);
    } catch (err) {
      console.error("Failed to fetch staff:", err.message);
      setStaffs([]);
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
  const isOpenModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteStaff = async (id) => {
    try {
      await deleteStaffAPI(id);
      setStaffs((prev) => prev.filter((s) => s.staff_id !== id));
    } catch (err) {
      console.error("Failed to delete staff:", err.message);
    }
  };

  const handleAddStaff = (newStaff) => {
    setStaffs((prev) => [...prev, newStaff]);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <PageBlurWrapper isBlurred={isModalOpen}>
        <div className="h-full flex flex-col max-w-7xl mx-auto p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 flex-shrink-0">
            <h1 className="text-3xl font-bold">Staff Management</h1>
            <Button content="Add Staff" onClick={isOpenModal} />
          </div>

          {/* Table Container with Fixed Height */}
          <div className="bg-white rounded-lg shadow flex-1 flex flex-col min-h-0">
            {/* Single Scrollable Table - Fixed height */}
            <div className="overflow-auto" style={{ height: "400px" }}>
              <Table>
                <TableHeader className="sticky top-0 z-10">
                  <TableRow>
                    <TableHead className="bg-gray-50">Staff ID</TableHead>
                    <TableHead className="bg-gray-50">First Name</TableHead>
                    <TableHead className="bg-gray-50">Last Name</TableHead>
                    <TableHead className="bg-gray-50">Gender</TableHead>
                    <TableHead className="bg-gray-50">Role</TableHead>
                    <TableHead className="bg-gray-50">Contact</TableHead>
                    <TableHead className="bg-gray-50">Specialization</TableHead>
                    <TableHead className="bg-gray-50">Department ID</TableHead>
                    <TableHead className="bg-gray-50">Doctor ID</TableHead>
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
                        Loading staff...
                      </TableCell>
                    </TableRow>
                  ) : staff.length > 0 ? (
                    staff.map((s) => {
                      console.log("Staff data:", s); // Debug log
                      return (
                        <TableRow key={s.staff_id || s.staffId || s.id}>
                          <TableCell>
                            {s.staff_id || s.staffId || s.id || "N/A"}
                          </TableCell>
                          <TableCell>
                            {s.first_name || s.firstName || "N/A"}
                          </TableCell>
                          <TableCell>
                            {s.last_name || s.lastName || "N/A"}
                          </TableCell>
                          <TableCell>{s.gender || "N/A"}</TableCell>
                          <TableCell>{s.role || "N/A"}</TableCell>
                          <TableCell>{s.contact || "N/A"}</TableCell>
                          <TableCell>{s.specialization || "N/A"}</TableCell>
                          <TableCell>
                            {s.department
                              ? s.department.departmentName
                              : s.department_id || s.departmentId || "N/A"}
                          </TableCell>
                          <TableCell>
                            {s.doctor_id || s.doctorId || "N/A"}
                          </TableCell>
                          <TableCell>
                            <button
                              className="text-red-500 hover:text-red-700"
                              onClick={() =>
                                deleteStaff(s.staff_id || s.staffId || s.id)
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
                        No staff found
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
        <AddStaff onClose={closeModal} onAddStaff={handleAddStaff} />
      </ModalWrapper>
    </div>
  );
}
