-- DEPARTMENT TABLE
CREATE TABLE department (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL, 
    location VARCHAR(255)                  
);

-- DOCTOR TABLE
CREATE TABLE doctor (
    doctor_id SERIAL PRIMARY KEY,
    last_name VARCHAR(50) NOT NULL,        
    first_name VARCHAR(50) NOT NULL,       
    contact VARCHAR(50),                   
    specialization VARCHAR(50),            
    email VARCHAR(50),                     
    department_id INT,                     
    CONSTRAINT fk_doctor_department FOREIGN KEY (department_id)
        REFERENCES department (department_id) ON DELETE CASCADE
);

-- PATIENT TABLE
CREATE TABLE patient (
    patient_id SERIAL PRIMARY KEY,
    last_name VARCHAR(50) NOT NULL,       
    first_name VARCHAR(50) NOT NULL,      
    height NUMERIC(10,2),                 
    weight NUMERIC(10,2),                 
    date_of_birth DATE NOT NULL,          
    address VARCHAR(255),                 
    contact VARCHAR(50),                  
    email VARCHAR(50),                     
    doctor_id INT,                         
    CONSTRAINT fk_patient_doctor FOREIGN KEY (doctor_id)
        REFERENCES doctor (doctor_id) ON DELETE CASCADE
);

-- STAFF TABLE
CREATE TABLE staff (
    staff_id SERIAL PRIMARY KEY,
    last_name VARCHAR(50) NOT NULL,        
    first_name VARCHAR(50) NOT NULL,       
    role VARCHAR(100),                     
    contact VARCHAR(50),                   
    department_id INT,                     
    doctor_id INT,                         
    CONSTRAINT fk_staff_department FOREIGN KEY (department_id)
        REFERENCES department (department_id) ON DELETE CASCADE,
    CONSTRAINT fk_staff_doctor FOREIGN KEY (doctor_id)
        REFERENCES doctor (doctor_id) ON DELETE CASCADE
);

-- APPOINTMENT TABLE
CREATE TABLE appointment (
    appointment_id SERIAL PRIMARY KEY,
    purpose VARCHAR(255),                  
    date_time TIMESTAMP NOT NULL,          
    status VARCHAR(50) DEFAULT 'Not Completed' NOT NULL, 
    doctor_id INT NOT NULL,                
    patient_id INT NOT NULL,               
    CONSTRAINT fk_appointment_doctor FOREIGN KEY (doctor_id)
        REFERENCES doctor (doctor_id) ON DELETE CASCADE,
    CONSTRAINT fk_appointment_patient FOREIGN KEY (patient_id)
        REFERENCES patient (patient_id) ON DELETE CASCADE
);

-- MEDICAL RECORD TABLE
CREATE TABLE medical_record (
    record_id SERIAL PRIMARY KEY,
    prescription TEXT,                     
    diagnosis TEXT,
    lab_result VARCHAR(255),
    treatment VARCHAR(255),
    patient_id INT NOT NULL,               
    appointment_id INT NOT NULL,           
    CONSTRAINT fk_record_patient FOREIGN KEY (patient_id)
        REFERENCES patient (patient_id) ON DELETE CASCADE,
    CONSTRAINT fk_record_appointment FOREIGN KEY (appointment_id)
        REFERENCES appointment (appointment_id) ON DELETE CASCADE
);

-- BILLING TABLE
CREATE TABLE billing (
    billing_id SERIAL PRIMARY KEY,
    treatment_fee NUMERIC(10, 2) DEFAULT 0.0 NOT NULL,     
    medication_fee NUMERIC(10, 2) DEFAULT 0.0 NOT NULL,
    lab_test_fee NUMERIC(10, 2) DEFAULT 0.0 NOT NULL,
    consultation_fee NUMERIC(10, 2) DEFAULT 0.0 NOT NULL,
    total_amount NUMERIC(10, 2) DEFAULT 0.0 NOT NULL,       
    payment_status VARCHAR(10) DEFAULT 'Unpaid' NOT NULL,   
    receptionist_id INT NOT NULL,                           
    patient_id INT NOT NULL,                                
    CONSTRAINT fk_billing_staff FOREIGN KEY (receptionist_id)
        REFERENCES staff (staff_id) ON DELETE CASCADE,
    CONSTRAINT fk_billing_patient FOREIGN KEY (patient_id)
        REFERENCES patient (patient_id) ON DELETE CASCADE
);



select * from department;