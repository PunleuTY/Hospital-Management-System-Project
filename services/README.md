# Services Directory

This README documents every file in the `backend/src/services/` directory, explaining their roles, common methods, and how they interact with controllers and models.

---

## 📁 Directory Structure

```text
backend/
└── src/
    └── services/
        ├── patient_service.js
        ├── doctor_service.js
        ├── appointment_service.js
        ├── billing_service.js
        ├── staff_service.js
        ├── report_service.js
        └── settings_service.js
```

> **Note:** Each service file corresponds to a controller and uses Sequelize models to perform database operations.

---

## 🎯 Purpose of the Services Layer

Services encapsulate **business logic** and data-access operations. They:

1. **Interact** with Sequelize models (`db/models/*`) to create, read, update, and delete records.
2. **Enforce** application-specific rules (e.g., preventing double bookings).
3. **Compose** multi-step operations (transactions, nested queries).
4. **Maintain** clean separation: controllers handle HTTP, services handle the core logic.

---

## 📄 Service Files

Below is a summary of each service file:

### `patient_service.js`

* **Responsibilities**:

  * Fetch all patients or by ID: `Patient.findAll()`, `Patient.findByPk(id)`
  * Create/update/delete patients: `Patient.create()`, `.update()`, `.destroy()`
  * Additional logic: e.g., checking unique identifiers before creation.
* **Typical exports**:

  ```js
  const { Patient } = require('../../db/models');

  async function getAllPatients() {
    return Patient.findAll();
  }

  async function getPatientById(id) {
    return Patient.findByPk(id);
  }

  async function createPatient(data) {
    // validation or business rules
    return Patient.create(data);
  }

  async function updatePatient(id, data) {
    await Patient.update(data, { where: { id } });
    return getPatientById(id);
  }

  async function deletePatient(id) {
    return Patient.destroy({ where: { id } });
  }

  module.exports = { getAllPatients, getPatientById, createPatient, updatePatient, deletePatient };
  ```

---

### `doctor_service.js`

* **Responsibilities**:

  * CRUD operations for doctors via `Doctor` model.
  * Business rules: e.g., validating specialty codes.
* **Typical exports**:

  ```js
  const { Doctor } = require('../../db/models');

  async function getAllDoctors() { /* ... */ }
  async function getDoctorById(id) { /* ... */ }
  async function createDoctor(data) { /* ... */ }
  async function updateDoctor(id, data) { /* ... */ }
  async function deleteDoctor(id) { /* ... */ }

  module.exports = { /* functions above */ };
  ```

---

### `appointment_service.js`

* **Responsibilities**:

  * Manage appointments: `Appointment` model queries.
  * Apply business logic: prevent double-booking, time conflict checks.
* **Typical exports**:

  ```js
  const { Appointment, sequelize } = require('../../db/models');

  async function getAllAppointments() { /* ... */ }

  async function createAppointment(data) {
    return sequelize.transaction(async (t) => {
      // check conflicts...
      return Appointment.create(data, { transaction: t });
    });
  }

  // update & delete similar

  module.exports = { /* ... */ };
  ```

---

### `billing_service.js`

* **Responsibilities**:

  * Generate invoices, calculate totals using `Bill` model.
  * Process payments: update status, record transactions.
* **Typical exports**:

  ```js
  const { Bill } = require('../../db/models');

  async function getAllBills() { /* ... */ }
  async function createBill(data) { /* ... */ }
  async function payBill(id, paymentInfo) {
    // update Bill status
  }

  module.exports = { /* ... */ };
  ```

---

### `staff_service.js`

* **Responsibilities**:

  * CRUD on `Staff` model.
  * Assign roles, manage permissions logic.
* **Typical exports**:

  ```js
  const { Staff } = require('../../db/models');

  async function getAllStaff() { /* ... */ }
  async function createStaff(data) { /* ... */ }
  // ...

  module.exports = { /* ... */ };
  ```

---

### `report_service.js`

* **Responsibilities**:

  * Compile data for reports: join multiple models.
  * Store report metadata in `Report` model.
* **Typical exports**:

  ```js
  const { Report, Patient, Appointment } = require('../../db/models');

  async function generateReport(params) {
    // complex queries
  }

  async function getReportById(id) { /* ... */ }

  module.exports = { generateReport, getReportById };
  ```

---

### `settings_service.js`

* **Responsibilities**:

  * Read/update application settings stored in `Settings` model.
  * Provide defaults if none exist.
* **Typical exports**:

  ```js
  const { Settings } = require('../../db/models');

  async function getSettings() { /* ... */ }
  async function updateSettings(data) { /* ... */ }
  async function resetSettings() { /* ... */ }

  module.exports = { getSettings, updateSettings, resetSettings };
  ```

---

## ➕ Adding a New Service

1. Create `<feature>.service.js` in this folder.
2. Import required models from `db/models`.
3. Implement CRUD or business-specific functions.
4. Export functions and call them from controllers.

---

## 🛡️ Best Practices

* **Single Responsibility**: each service focuses on one entity or feature.
* **Transactions**: use `sequelize.transaction` for multi-step operations.
* **Error Handling**: throw custom errors to be caught by controllers or error middleware.
* **Reusability**: keep shared logic DRY by extracting helpers into `utils/`.

---

With these guidelines, your services layer will be well-structured, testable, and robust, forming the heart of your backend’s business logic and data access.
