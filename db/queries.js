const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sqlpassword',
    database: 'employees_db'
},
console.log(`Connected to the employees_db database.`)
);

function viewAllDepartments() {
    const query = 'SELECT id AS Department_Id, name AS Department_Name FROM department';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching departments: ', err);
            return;
        }
        console.log('All departments: ');
        console.table(results); // Shows the results in a table.
    })
};

function viewAllRoles() {
    const query = `
    SELECT roles.id AS Role_id,
        roles.title AS Job_Title,
        department.name AS Department,
        roles.salary AS Salary
    FROM roles
    INNER JOIN department ON roles.department_id = department.id`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching roles: ', err);
            return;
        }
        console.log('All roles: ');
        console.table(results); // Shows the results in a table.
    })
};

function viewAllEmployees() {
    const query = `SELECT 
    employee.id AS Employee_id,
    employee.first_name AS First_Name,
    employee.last_name AS Last_Name,
    roles.title AS Job_Title,
    department.name AS Department,
    roles.salary AS Salary,
    CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
FROM 
    employee
INNER JOIN 
    roles ON employee.role_id = roles.id
INNER JOIN 
    department ON roles.department_id = department.id
LEFT JOIN 
    employee AS manager ON employee.manager_id = manager.id;
`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching roles: ', err);
            return;
        }
        console.log('All roles: ');
        console.table(results); // Shows the results in a table.

    })
};

function addDepartment(departmentName) {
    const query = 'INSERT INTO department (name) VALUES (?)';
    db.query(query, [departmentName], (err, results) => {
        if (err) {
            console.error('Error adding department: ', err);
            return;
        }
        console.log(`Department "${departmentName}" added succesfully.`);
    });
};

function addRole(title, salary, departmentId) {
    const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
    db.query(query, [title, salary, departmentId], (err, results) => {
        if (err) {
            console.error('Error adding role: ', err);
            return;
        }
        console.log(`Role "${title}" added successfully.`);
    });
};

function addEmployee(firstName, lastName, roleId, managerId) {
    // Check if managerId is empty or not provided
    const managerIdValue = managerId ? managerId : null; // Sets the managerId to 'NULL' in case theres no answer.
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)'; // Fills the content depending of the answers inside the query.
    db.query(query, [firstName, lastName, roleId, managerIdValue], (err, results) => {
        if (err) {
            console.error('Error adding employee: ', err);
            return;
        }
        console.log(`Employee "${firstName} ${lastName}" added successfully.`);
    });
};

function updateEmployeeRole(employeeId, roleId) {
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    db.query(query, [roleId, employeeId], (err, results) => {
        if (err) {
            console.error('Error updating employee role: ', err);
            return;
        }
        console.log('Employee role updated successfully.');
    });
};

module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole };
