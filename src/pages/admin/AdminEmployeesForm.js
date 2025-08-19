// src/pages/admin/AdminEmployeesForm.js
import React, { useState, useEffect } from "react";
import {
    addEmployee,
    updateEmployee,
} from "../../data/adminEmployeesMock";

const AdminEmployeesForm = ({ editingEmployee, onClose, onSuccess }) => {
    const [form, setForm] = useState({
        id: "",
        name: "",
        cnic: "",
        contact: "",
        email: "",
        salary: "",
    });

    useEffect(() => {
        if (editingEmployee) {
            setForm(editingEmployee);
        }
    }, [editingEmployee]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingEmployee) {
            await updateEmployee(editingEmployee.id, form);
        } else {
            await addEmployee(form);
        }
        onSuccess();
        onClose();
    };

    return (
        <div className="employee-form-modal">
            <div className="employee-form">
                <h3>{editingEmployee ? "Edit Employee" : "Add Employee"}</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        name="id"
                        placeholder="Employee ID"
                        value={form.id}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="cnic"
                        placeholder="CNIC"
                        value={form.cnic}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="contact"
                        placeholder="Contact"
                        value={form.contact}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="salary"
                        placeholder="Salary"
                        value={form.salary}
                        onChange={handleChange}
                        required
                    />

                    <div className="form-actions">
                        <button type="submit">{editingEmployee ? "Update" : "Add"}</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminEmployeesForm;
