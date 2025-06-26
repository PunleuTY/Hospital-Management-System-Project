 	-- Create a view that shows each doctor’s name, specialization, total number of appointments, and the count of completed appointments.
CREATE VIEW view_doctor_appointment_summary
AS SELECT CONCAT(d.FIRST_NAME, ' ', d.LAST_NAME) DOCTOR_NAME, d.SPECIALIZATION, COUNT(*) AS TOTAL_APPOINTMENT FROM DOCTOR d
JOIN APPOINTMENT USING (DOCTOR_ID)
GROUP BY d.DOCTOR_ID;

SELECT * FROM VIEW_DOCTOR_APPOINTMENT_SUMMARY;

	-- Create a view that displays patient details along with their latest diagnosis and prescription.
CREATE VIEW view_patient_detail
AS SELECT p.PATIENT_ID, CONCAT(p.FIRST_NAME, ' ', p.LAST_NAME) AS PATIENT_NAME, m.DIAGNOSIS, m.PRESCRIPTION FROM PATIENT p
JOIN MEDICAL_RECORD m USING (PATIENT_ID);

SELECT * FROM view_patient_detail;

	-- Create a view that lists all departments and includes the total number of doctors and staff working in each department.
CREATE VIEW department_summary
AS SELECT de.DEPARTMENT_ID, de.DEPARTMENT_NAME, COUNT(DISTINCT d.DOCTOR_ID) AS TOTAL_DOCTOR, COUNT(DISTINCT s.STAFF_ID) AS TOTAL_STAFF FROM DEPARTMENT de
LEFT JOIN DOCTOR d ON d.DEPARTMENT_ID = de.DEPARTMENT_ID
LEFT JOIN STAFF s ON s.DEPARTMENT_ID = de.DEPARTMENT_ID
GROUP BY de.DEPARTMENT_ID;

SELECT * FROM department_summary;