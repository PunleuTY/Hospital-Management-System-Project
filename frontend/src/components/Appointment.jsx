// Appointment Pgae
import { React } from 'react';
import Button from './Common/Button'; 
import { useState } from 'react';
import Input from './Common/Input';
import AddAppointment from './Form/addAppointment.jsx';
import PageBlurWrapper from './Common/Blur-wrapper.jsx'
import ModalWrapper from './Common/Modal-wrapper.jsx';
import Dropdown from './Common/Dropdown.jsx';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './Common/Table.jsx';

//Icons
import { TiDelete } from "react-icons/ti";


export default function Appointment() {
    const [filterDate, setFilterDate] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [appointments, setAppointments] = useState([
        {
            id: "A001",
            patient: "John Smith",
            doctor: "Dr. Johnson",
            date: "2024-01-16",
            time: "09:00",
            status: "confirmed",
        },
        {
            id: "A002",
            patient: "Sarah Wilson",
            doctor: "Dr. Brown",
            date: "2024-01-16",
            time: "10:30",
            status: "pending",
        },
        {
            id: "A003",
            patient: "Mike Davis",
            doctor: "Dr. Lee",
            date: "2024-01-17",
            time: "14:00",
            status: "confirmed",
        },
        {
            id: "A004",
            patient: "",
            doctor: "Dr. Wilson",
            date: "2024-01-17",
            time: "15:30",
            status: "cancelled",
        },
    ]);

    const deleteAppointment = (id) => {
        const newUpdatedAppointments = appointments.filter((a) => (a).id !== id);
        setAppointments(newUpdatedAppointments);
    }
    
    const handleStatusChange = (appointmentID, newStatus) => {
        setAppointments((prevAppointments) => 
            prevAppointments.map((appointment) => 
                appointment.id === appointmentID ? { ...appointment, status: newStatus } : appointment
            )
        );
    }

    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    return(
        <div className='min-h-screen bg-gray-50 p-6'>
            <PageBlurWrapper isBlurred={isModalOpen}>
                <div className='max-w-7xl mx-auto'>
                    {/*Header*/}
                    <div className='flex items-center justify-between mb-4'>
                        <h1 className='text-3xl font-bold'>Appointments</h1>
                        <Button 
                            content={"Book Appointment"}
                            onClick={openModal}
                        />
                    </div>

                    {/*Filter Date and Status*/}
                    <div className='flex gap-4 mb-2'>
                        <div className='relative w-40'>
                            <Input
                                type="date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)} />
                        </div>
                        <div className='relative z-11'>
                            <Dropdown
                                options={["All", "Pending", "Confirmed", "Cancelled"]}
                                defaultLabel='Filter by Status'
                                onSelect={(option) => setFilterStatus(option)} />
                        </div>
                    </div>

                    {/*Tables*/}
                    <div className='bg-white shadow-md rounded-lg mt-6 '>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="sticky top-0 bg-gray-200 z-10">APPOINTMENT ID</TableHead>
                                    <TableHead className="sticky top-0 bg-gray-200 z-10">PATIENT</TableHead>
                                    <TableHead className="sticky top-0 bg-gray-200 z-10">DOCTOR</TableHead>
                                    <TableHead className="sticky top-0 bg-gray-200 z-10">DATE</TableHead>
                                    <TableHead className="sticky top-0 bg-gray-200 z-10">TIME</TableHead>
                                    <TableHead className="sticky top-0 bg-gray-200 z-10">STATUS</TableHead>
                                    <TableHead className="sticky top-0 bg-gray-200 z-10">ACTIONS</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {appointments && appointments.map((appointment) => (
                                    <TableRow key={appointment.id}>
                                        <TableCell>{appointment.id}</TableCell>
                                        <TableCell>{appointment.patient}</TableCell>
                                        <TableCell>{appointment.doctor}</TableCell>
                                        <TableCell>{appointment.date}</TableCell>
                                        <TableCell>{appointment.time}</TableCell>
                                        <TableCell>
                                            <Dropdown
                                                options={appointment.status === "Pending" ? ["Pending", "Confirmed", "Cancelled"] : ["Confirmed", "Cancelled"]  }
                                                value={appointment.status}
                                                onSelect={(value) => {handleStatusChange(appointment.id, value)}}
                                                
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <button onClick={() => deleteAppointment(appointment.id)} className='text-red-500 hover:text-red-700'>
                                                <TiDelete className='w-8 h-8' />
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
                size="md" // Options: sm, md, lg, xl, full
                showCloseButton={true}
                closeOnBackdropClick={true}
                closeOnEscape={true}
            >
                <AddAppointment onClose={closeModal} />
            </ModalWrapper>
        </div>
    );
}
