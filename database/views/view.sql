-- Upcoming appointment
CREATE OR REPLACE VIEW view_upcoming_appointments AS
SELECT 
    a.appointment_id,
    a.date_time,
    a.purpose,
    a.status,
    CONCAT(p.first_name, ' ', p.last_name) AS patient_name,
    CONCAT(s.first_name, ' ', s.last_name) AS doctor_name,
    s.specialization
FROM appointment a
JOIN patient p ON a.patient_id = p.patient_id
JOIN staff s ON a.doctor_id = s.staff_id
WHERE a.date_time > NOW()
ORDER BY a.date_time;

-- Billing summary view
CREATE OR REPLACE VIEW view_billing_summary AS
SELECT 
    b.billing_id,
    CONCAT(p.first_name, ' ', p.last_name) AS patient_name,
    CONCAT(r.first_name, ' ', r.last_name) AS receptionist_name,
    b.treatment_fee,
    b.medication_fee,
    b.lab_test_fee,
    b.consultation_fee,
    b.total_amount,
    b.payment_status
FROM billing b
JOIN patient p ON b.patient_id = p.patient_id
JOIN staff r ON b.receptionist_id = r.staff_id
ORDER BY b.billing_id DESC;

-- Department staff overview
CREATE OR REPLACE VIEW view_department_staff AS
SELECT 
    d.department_name,
    s.role,
    CONCAT(s.first_name, ' ', s.last_name) AS staff_name,
    s.specialization,
    s.contact
FROM department d
JOIN staff s ON d.department_id = s.department_id
ORDER BY d.department_name, s.role;

-- Patients appointment history
CREATE OR REPLACE VIEW view_patient_appointments AS
SELECT 
    p.patient_id,
    CONCAT(p.first_name, ' ', p.last_name) AS patient_name,
    a.appointment_id,
    a.date_time,
    a.purpose,
    a.status,
    CONCAT(s.first_name, ' ', s.last_name) AS doctor_name
FROM appointment a
JOIN patient p ON a.patient_id = p.patient_id
JOIN staff s ON a.doctor_id = s.staff_id
ORDER BY p.patient_id, a.date_time DESC;