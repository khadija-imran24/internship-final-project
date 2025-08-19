// src/pages/admin/AdminEmployees.js
import React, { useEffect, useState } from "react";
import {
    getEmployees,
    deleteEmployee,
} from "../../data/adminEmployeesMock";
import AdminEmployeesForm from "./AdminEmployeesForm";
import "./AdminEmployees.css";

const AdminEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        const data = await getEmployees();
        setEmployees(data);
    };

    const handleDelete = async (id) => {
        await deleteEmployee(id);
        loadEmployees();
    };

    return (
        <div className="employees-container">
            <div className="employees-header">
                <h2>Employees</h2>
                <button onClick={() => { setEditingEmployee(null); setShowForm(true); }}>
                    + Add Employee
                </button>
            </div>

            {showForm && (
                <AdminEmployeesForm
                    editingEmployee={editingEmployee}
                    onClose={() => setShowForm(false)}
                    onSuccess={loadEmployees}
                />
            )}

            <table className="employees-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>CNIC</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.cnic}</td>
                            <td>{emp.contact}</td>
                            <td>{emp.email}</td>
                            <td>{emp.salary}</td>
                            <td>
                                <button onClick={() => { setEditingEmployee(emp); setShowForm(true); }}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(emp.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminEmployees;
