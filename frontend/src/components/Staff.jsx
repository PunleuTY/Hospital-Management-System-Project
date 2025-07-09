import { React } from 'react';
import Button from './Common/Button'; 
import { useState, useEffect } from 'react';
import Input from './Common/Input';
import PageBlurWrapper from './Common/Blur-wrapper.jsx'
import ModalWrapper from './Common/Modal-wrapper.jsx';
import StatisticCard from './Common/statisticCard.jsx';
import Dropdown from './Common/Dropdown.jsx';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './Common/Table.jsx';
import AddStaff from './Form/addStaff.jsx';

//API
import { getAllStaffs } from "../service/staffAPI.js"
import { deleteStaff as deleteStaffAPI } from "../service/staffAPI.js";

//Icons
import { TiDelete } from "react-icons/ti";

export default function Staff() {
  const [staff, setStaffs] = useState([]);

  useEffect(() => {
    fetchAllStaff();
  }, []);

  const fetchAllStaff = async () => {
    try{
      const staffs = await getAllStaffs();
      setStaffs(staffs);
    } catch(err){
      console.error("Failed to fetch staff:", err.message);
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const isOpenModal = () => {setIsModalOpen(true);}
  const closeModal = () => {setIsModalOpen(false);} 

  const deleteStaff = async (id) => {
    try {
      await deleteStaffAPI(id);
      setStaffs((prev) => prev.filter((s) => s.staff_id !== id));
    } catch (err) {
      console.error("Failed to delete staff:", err.message);
    }
  }

  const handleAddStaff = (newStaff) => {
    setStaffs((prev) => [...prev, newStaff]);
  };

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <PageBlurWrapper isBlurred={isModalOpen}>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-2xl font-bold text-gray-800'>Staff List</h1>
            <Button content="Add Staff" onClick={isOpenModal} />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='bg-gray-200 sticky z-5'>Staff ID</TableHead>
              <TableHead className='bg-gray-200 sticky z-5'>First Name</TableHead>
              <TableHead className='bg-gray-200 sticky z-5'>Last Name</TableHead>
              <TableHead className='bg-gray-200 sticky z-5'>Gender</TableHead>
              <TableHead className='bg-gray-200 sticky z-5'>Role</TableHead>
              <TableHead className='bg-gray-200 sticky z-5'>Contact</TableHead>
              <TableHead className='bg-gray-200 sticky z-5'>Specialization</TableHead>
              <TableHead className='bg-gray-200 sticky z-5'>Department_ID</TableHead>
              <TableHead className='bg-gray-200 sticky z-5'>Doctor_ID</TableHead>
              <TableHead className='bg-gray-200 sticky z-5'>Actions</TableHead>
            </TableRow>
          </TableHeader>  
          <TableBody>
            {staff.map((s) => (
              <TableRow key={s.staff_id}>
                <TableCell>{s.staff_id}</TableCell>
                <TableCell>{s.first_name}</TableCell>
                <TableCell>{s.last_name}</TableCell>
                <TableCell>{s.gender}</TableCell>
                <TableCell>{s.role}</TableCell>
                <TableCell>{s.contact}</TableCell>
                <TableCell>{s.specialization}</TableCell>
                <TableCell>{s.department_id}</TableCell>
                <TableCell>{s.doctor_id}</TableCell>
                <TableCell>
                  <button className='text-red-500 hover:text-red-700' onClick={() => deleteStaff(s.staff_id)}>
                    <TiDelete className='w-8 h-8' />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageBlurWrapper>

      <ModalWrapper
        isOpen={isModalOpen}
        onClose={closeModal}
        size='md'
        showCloseButton={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
      >
        <AddStaff onClose={closeModal} onAddStaff={handleAddStaff} />
      </ModalWrapper>
    </div>

  );
};
