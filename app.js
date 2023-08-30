const inquirer = require("inquirer");
const mysql = require("mysql2");

// Connect MySQL
const DBconnection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "employee_db",
});

DBconnection.connect((err) => {
    if(err) throw err;
    console.log("Connected to database")
    runTracker();
})

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
        if(err) throw err;
        console.table(res);
        runTracker();
    });
}

function viewRoles() {
    const query = "SELECT * FROM roles";
    DBconnection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        runTracker();
    });
}

function viewEmployees() {
    const query = "SELECT * FROM employees";
    DBconnection.query(query, (err, res) => {
        if(err) throw err;
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
                if(err) throw err;
                console.log("Department added!");
                runTracker();
            } 
        );
    });
}

function addRole() {
    const query = "SELECT * FROM departments";
    DBconnection.query(query, (err, res) => {
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
            type: "list",
            name: "departments",
            message: "Select the department for this role.",
            choices: res.map((departments) => departments.department_name),
        },
    ])
        .then((answer) => {
            const department = res.find((department) => department.department_name === answer.department);

            const query = "INSERT INTO roles SET ?";
            DBconnection.query(
                query,
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: department,
                },
                (err, res) => {
                    if (err) throw err;
                    console.log("Role added!");
                    runTracker();
                }
            );
        });
                
    });
}

