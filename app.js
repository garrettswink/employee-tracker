const inquirer = require("inquirer");
const mysql = require("mysql2");
const cfonts = require("cfonts");



// Connect MySQL
const DBconnection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "employee_db",
});

DBconnection.connect((err) => {
    if (err) throw err;
    console.log("Connected to database")
    runTracker();
})

cfonts.say("Employee Tracker", {
    font: "block",
    align: "center",
    colors: ["green"],
    background: "transparent",
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: "0",
});


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
                    viewDepartments();
                    break;
                case "View All Roles":
                    viewRoles();
                    break;
                case "View All Employees":
                    viewEmployees();
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
                    updateEmployee();
                    break;
                case "Exit":
                    DBconnection.end();
                    break;
            }
        });
}

function viewDepartments() {
    const query = "SELECT * FROM departments";
    DBconnection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        runTracker();
    });
}

function viewRoles() {
    const query = "SELECT * FROM roles";
    DBconnection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        runTracker();
    });
}

function viewEmployees() {
    const query = "SELECT * FROM employees";
    DBconnection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        runTracker();
    });
}

function addDepartment() {
    inquirer.prompt({
        type: "input",
        name: "department",
        message: "Enter the department you would like to add.",
    })
        .then((answer) => {
            const query = `INSERT INTO departments (department_name) VALUES ("${answer.department}")`;
            DBconnection.query(query, (err, res) => {
                if (err) throw err;
                console.log("Department added!");
                runTracker();
            }
            );
        });
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter the role you would like to add.",
        },
        {
            type: "input",
            name: "salary",
            message: "Enter the salary for this role.",
        },
        {
            type: "input",
            name: "department",
            message: "Enter the numerical department ID for this role.",
        },
    ])
        .then((answer) => {
            const query = `INSERT INTO roles (title, salary, department_id) VALUES ("${answer.title}", "${answer.salary}", "${answer.department}")`;
            DBconnection.query(query, (err, res) => {
                if (err) throw err;
                console.log("Role added!");
                runTracker();
            }
            );
        });
};

function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "Enter the employee's first name.",
            },
            {
                type: "input",
                name: "last_name",
                message: "Enter the employee's last name.",
            },
            {
                type: "input",
                name: "role_id",
                message: "Enter the numerical role ID.",
            },
            {
                type: "input",
                name: "manager_id",
                message: "Enter the numerical manager ID.",
            },
        ])
        .then((answer) => {
            const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${answer.first_name}", "${answer.last_name}", "${answer.role_id}", "${answer.manager_id}")`;
            DBconnection.query(query, (err, res) => {
                if (err) throw err;
                console.log("Employee added!");
                runTracker();
            }
            );
        });
};

function updateEmployee() {
    const query = "SELECT employees.id, employees.first_name, employees.last_name, employees.role_id, employees.manager_id FROM employees";
    DBconnection.query(query, (err, employees) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Select the employee whose role you would like to update.",
                choices: employees.map((employees) => ({
                    name: `${employees.first_name} ${employees.last_name}`,   
                }
                )),
            }, 
            {
                type: "input",
                name:"role_id",
                message: "Please input the new employee role ID.", 
            },
            {
                type: "input",
                name:"manager_id",
                message: "Please input the new employee manager ID.",
            },
        ])  
        .then((answer) => {
            const updateQuery = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${answer.first_name}", "${answer.last_name}", "${answer.role_id}", "${answer.manager_id}")`;
            DBconnection.query(updateQuery, (err, res) => {
                if (err) throw err;
                console.log("Employee updated!");
                runTracker();
            });
        });
    });
};

process.on("exit", () => {
    DBconnection.end();
    console.log("Connection ended");
});


