import { useState, useEffect } from "react";
import { FiUsers } from "react-icons/fi";
import { FaDollarSign } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import Button from "./Common/Button";
import ModalWrapper from "./Common/Modal-wrapper";
import AddAppointment from "./Form/addAppointment.jsx";

// API imports
import { getAllPatients } from "../service/patientAPI.js";
import { getAllAppointments } from "../service/appointmentAPI.js";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPatients, setTotalPatients] = useState(0);
  const [todayAppointments, setTodayAppointments] = useState(0);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    // Refresh data when modal closes (in case new appointment was added)
    fetchDashboardData();
  };

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      // Fetch total patients
      const patientsResponse = await getAllPatients(1, 1); // Just get meta data
      const totalPatientsCount = patientsResponse.data?.meta?.total || 0;
      setTotalPatients(totalPatientsCount);

      // Fetch appointments data
      const appointmentsResponse = await getAllAppointments(1, 50); // Get more to filter
      const appointmentsData = appointmentsResponse.data?.data || [];

      // Get today's date
      const today = new Date();
      const todayStr = today.toISOString().split("T")[0]; // YYYY-MM-DD format

      // Filter appointments for today
      const todayAppts = appointmentsData.filter((apt) => {
        const aptDate = new Date(apt.date_time || apt.dateTime)
          .toISOString()
          .split("T")[0];
        return aptDate === todayStr;
      });
      setTodayAppointments(todayAppts.length);

      // Filter upcoming appointments (today and future, not completed)
      const upcoming = appointmentsData
        .filter((apt) => {
          const aptDate = new Date(apt.date_time || apt.dateTime);
          const now = new Date();
          const status = apt.status || "Not Completed";

          return aptDate >= now && status !== "Completed";
        })
        .slice(0, 6); // Limit to 6 upcoming appointments

      setUpcomingAppointments(upcoming);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      setTotalPatients(0);
      setTodayAppointments(0);
      setUpcomingAppointments([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  const style = {
    infoCard: "border flex-1 p-3 py-5 rounded-md flex flex-col gap-2",
  };

  const cardData = [
    {
      title: "Total Patients",
      value: isLoading ? "..." : totalPatients.toLocaleString(),
      icon: FiUsers,
      color: {
        bg: "bg-(--color-bg-light-blue)",
        border: "border-(--color-blue)",
        text: "text-(--color-blue)",
        textDark: "text-(--color-dark-blue)",
      },
    },
    {
      title: "Appointments Today",
      value: isLoading ? "..." : todayAppointments.toString(),
      icon: MdOutlineDateRange,
      color: {
        bg: "bg-(--color-bg-light-yellow)",
        border: "border-(--color-yellow)",
        text: "text-(--color-yellow)",
        textDark: "text-(--color-dark-yellow)",
      },
    },
  ];

  // Helper function to format appointment date and time
  const formatAppointmentDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const dateStr = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const timeStr = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${dateStr} - ${timeStr}`;
  };

  // Helper function to get patient name
  const getPatientName = (appointment) => {
    if (appointment.patient) {
      return `${
        appointment.patient.firstName || appointment.patient.first_name || ""
      } ${
        appointment.patient.lastName || appointment.patient.last_name || ""
      }`.trim();
    }
    return `Patient #${
      appointment.patient_id || appointment.patientId || "Unknown"
    }`;
  };

  // Helper function to get doctor name
  const getDoctorName = (appointment) => {
    if (appointment.doctor) {
      return `Dr. ${
        appointment.doctor.firstName || appointment.doctor.first_name || ""
      } ${
        appointment.doctor.lastName || appointment.doctor.last_name || ""
      }`.trim();
    }
    return `Doctor #${
      appointment.doctor_id || appointment.doctorId || "Unknown"
    }`;
  };

  return (
    <div
      className="p-5 h-full flex flex-col gap-5"
      style={{ height: "calc(100% - 60px)" }}
    >
      <div className="flex flex-col md:flex-row gap-5 justify-between">
        {cardData.map((card, index) => {
          return (
            <InfoCard
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
              color={card.color}
              style={style}
            />
          );
        })}
      </div>
      <div className="flex-1 flex gap-3 rounded-md">
        <div className="flex-1 flex flex-col gap-3 p-3 border justify-between border-(--color-light-gray) rounded-md">
          <div className="flex items-center gap-3">
            <FaRegClock className="text-(--color-blue) text-[20px]" />
            <p className="text-[22px] font-bold">Upcoming Appointments</p>
          </div>
          <div
            className="flex-1 flex flex-col overflow-y-auto gap-3"
            style={{ maxHeight: "300px" }} // Set a fixed height for the scrollable area
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-gray-500">Loading appointments...</p>
              </div>
            ) : upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment, index) => (
                <AppointmentCard
                  key={index}
                  data={{
                    patient: getPatientName(appointment),
                    doctor: getDoctorName(appointment),
                    dateTime: formatAppointmentDateTime(
                      appointment.date_time || appointment.dateTime
                    ),
                    purpose: appointment.purpose || "General Consultation",
                  }}
                />
              ))
            ) : (
              <div className="flex items-center justify-center py-8">
                <p className="text-gray-500">No upcoming appointments</p>
              </div>
            )}
          </div>
          <Button
            content={"Add Appointment"}
            className={"w-full"}
            onClick={openModal}
          />
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
      </div>
    </div>
  );
}

const InfoCard = ({ title, value, icon: Icon, color, style }) => {
  return (
    <div className={`${style.infoCard} ${color.bg} ${color.border}`}>
      <div className={`flex justify-between items-center ${color.text}`}>
        <p>{title}</p>
        <Icon />
      </div>
      <div>
        <p className={`text-[22px] font-bold ${color.textDark}`}>{value}</p>
      </div>
    </div>
  );
};

const AppointmentCard = ({ data }) => {
  return (
    <div className="flex flex-col gap-2 p-2 rounded-md bg-gray-100">
      <div className="flex justify-between">
        <p className="text-[18px]">{data.patient}</p>
        <p className="text-(--color-blue)">{data.dateTime}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-(--color-gray)">{data.doctor}</p>
        <div className="border border-(--color-light-gray) rounded-lg text-[12px] font-bold px-2 flex items-center justify-center">
          {data.purpose}
        </div>
      </div>
    </div>
  );
};
