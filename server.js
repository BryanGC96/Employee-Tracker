const inquirer = require('inquirer');
const { viewAllDepartments, viewAllRoles, viewAllEmployees} = require('./db/queries');




// // Connects to the db
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to database: ', err);
//         return;
//     }
//     console.log(`Connected to the employee_db database. `);
// });

// Options of choices inside the prompt from Inquirer
const depOptions = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'];

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

            default:
                console.log('Invalid selection. ');
    }
})
.catch((error) => {
    console.error('Error with prompt: ', error);
});
