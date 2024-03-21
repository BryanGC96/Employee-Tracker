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

        // Close the db connection.
        db.end();
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

        // Close the db connection.
        db.end();
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

        // Close the db connection.
        db.end();
    })
};

module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees };