const inquirer = require('inquirer');
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole} = require('./db/queries');

// Options of choices inside the prompt from Inquirer
const depOptions = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'];

function mainMenu() {
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
            break;

        case 'View all roles':
            viewAllRoles();
            break;

        case 'View all employees':
            viewAllEmployees();
            break;

        case 'Add a department':
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'departmentName',
                    message: 'Enter the name of the department:'
                }
            ]).then((answer) => {
                addDepartment(answer.departmentName);
            });
            break;

            case 'Add a role':
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
            });
            break;

            default:
                console.log('Invalid selection. ');
    }

    // Repeats the prompt after each selection.
    mainMenu();
})
.catch((error) => {
    console.error('Error with prompt: ', error);
});

};

mainMenu();
