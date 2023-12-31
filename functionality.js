const inquirer = require("inquirer");
const mysql = require("mysql2");

function runTracker() {
    inquirer.prompt({
        type: "list",
        name: "initiate",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",  
            "Exit",          
        ],
        })
        .then((answer) => {
            switch (answer.initiate) {
                case "View All Departments":
                    viewAllDepartments();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "Exit":
                    DBconnection.end();
                    break;
            }
        });
}

module.exports = { runTracker };