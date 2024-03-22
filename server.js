const inquirer = require('inquirer');
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole} = require('./db/queries');

// Options of choices inside the prompt from Inquirer
const depOptions = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'];

function init() {
    
inquirer
.prompt([
    {
        type: 'list',
        name: 'actionToDo',
        message: 'What do you want to do?',
        choices: depOptions
    },
])
.then((answers) => {
    console.log('User Input:');
    console.log(answers);

    switch (answers.actionToDo) {

        case 'View all departments':
            viewAllDepartments();
            init();
            break;

        case 'View all roles':
            viewAllRoles();
            init();
            break;

        case 'View all employees':
            viewAllEmployees();
            init();
            break;

        case 'Add a department':
            addDepartmentPrompt();
            break;

        case 'Add a role':
            addRolePrompt();
            break;

        case 'Add an employee':
            addEmployeePrompt();
            break;

        case 'Update an employee role':
            updateEmployeeRolePrompt();
            break;

            default:
                process.exit();
    }

})
.catch((error) => {
    console.error('Error with prompt: ', error);
});
    
}

function addDepartmentPrompt() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter the name of the department:'
        }
    ]).then((answer) => {
        addDepartment(answer.departmentName);
        init(); // Display the depOptions again
    });
};

function addRolePrompt() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the new role:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for the new role:'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'Enter the department ID for the new role:'
        }
    ]).then((answers) => {
        addRole(answers.title, answers.salary, answers.departmentId);
        init(); // Display the depOptions again
    });
}

function addEmployeePrompt() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name of the new employee:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name of the new employee:'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter the role ID corresponding to the new employee:'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'Enter the manager ID in charge of the new employee (leave blank if none):'
        }
    ]).then((answers) => {
        addEmployee(answers.firstName, answers.lastName, answers.roleId, answers.managerId);
        init(); // Display the depOptions again
    });
}

function updateEmployeeRolePrompt() {
    // Defines again the const of mysql and db , so that its possible to obtain the info needed inside this function.
    const mysql = require('mysql2');
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Sqlpassword',
        database: 'employees_db'
    });

    //Gets the list of employees from the db
    db.query('SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employee', (err, employees) => {
        if (err) {
            console.error('Error fetching employees: ', err);
            return;
        }

        // Prompts the user to select the employee to update.
        inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Select the employee you want to update:',
                choices: employees.map(employee => ({
                    name: employee.full_name,
                    value: employee.id
                }))
            }
        ]).then((answers) => {
            // Prompts the user to select the new role of the employee.
            db.query('SELECT id, title FROM roles', (err, roles) => {
                if (err) {
                    console.error('Error fetching roles: ', err);
                    return;
                }

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'roleId',
                        message: 'Select the new role for the employee:',
                        choices: roles.map(role => ({
                            name: role.title,
                            value: role.id
                        }))
                    }
                ]).then((roleAnswer) => {
                    updateEmployeeRole(answers.employeeId, roleAnswer.roleId); // Function to update the employee's role in the db.
                    init(); // Display the questions again
                });
            });
        });
    });
};


init(); // Starts the app with the inquirer prompt.