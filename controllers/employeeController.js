const Employee = require('../models/Employee');

// GET /api/v1/emp/employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/v1/emp/employees
exports.createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({
      message: "Employee created successfully.",
      employee_id: employee._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/v1/emp/employees/:eid
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/v1/emp/employees/:eid
exports.updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Employee not found." });
    }
    res.status(200).json({ message: "Employee details updated successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/v1/emp/employees?eid=xxx
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.query.eid);
    res.status(204).send(); // no content
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
