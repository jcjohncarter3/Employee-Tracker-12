const inquirer = require("inquirer");
const db = require('./db');
// Import and require Pool (node-postgres)
// We'll be creating a Connection Pool. Read up on the benefits here: https://node-postgres.com/features/pooling
// const { Pool } = require('pg');


// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
// const pool = new Pool(
//   {
//     // TODO: Enter PostgreSQL username
//     user: 'postgres',
//     // TODO: Enter PostgreSQL password
//     password: 'J0hnc@rt3r!',
//     host: 'localhost',
//     port: 5432,
//     database: 'employee_tracker_db'
//   },
//   console.log(`Connected to the employee_tracker_db database.`)
// )

// pool.connect();

// Create a movie
// //app.post('/api/new-movie', ({ body }, res) => {
//   const sql = `INSERT INTO movies (movie_name)
//     VALUES ($1)`;
//   const params = [body.movie_name];

//   pool.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: body
//     });
//   });
// });

// Read all movies
// app.get('/api/movies', (req, res) => {
//   const sql = `SELECT id, movie_name AS title FROM movies`;

//   pool.query(sql, (err, { rows }) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// Delete a movie
// app.delete('/api/movie/:id', (req, res) => {
//   const sql = `DELETE FROM movies WHERE id = $1`;
//   const params = [req.params.id];

//   pool.query(sql, params, (err, result) => {
//     if (err) {
//       res.statusMessage(400).json({ error: err.message });
//     } else if (!result.rowCount) {
//       res.json({
//         message: 'Movie not found'
//       });
//     } else {
//       res.json({
//         message: 'deleted',
//         changes: result.rowCount,
//         id: req.params.id
//       });
//     }
//   });
// });

// Read list of all reviews and associated movie name using LEFT JOIN
// app.get('/api/movie-reviews', (req, res) => {
//   const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
//   pool.query(sql, (err, { rows }) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// BONUS: Update review
// app.put('/api/review/:id', (req, res) => {
//   const sql = `UPDATE reviews SET review = $1 WHERE id = $2`;
//   const params = [req.body.review, req.params.id];

//   pool.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     } else if (!result.rowCount) {
//       res.json({
//         message: 'Review not found'
//       });
//     } else {
//       res.json({
//         message: 'success',
//         data: req.body,
//         changes: result.rowCount
//       });
//     }
//   });
// });

// Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

function loadMainPrompts() { 
    inquirer.prompt([
       
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View All Employees',
                    value: 'VIEW_EMPLOYEES'
                },
                // {
                //     name: 'View All Employees By Department',
                //     value: 'VIEW_EMPLOYEES_BY_DEPARTMENT',
                // },
                // {
                //     name: 'View All Employees By Manager',
                //     value: 'VIEW_EMPLOYEES_BY_MANAGER',
                // },
                {
                    name: 'Add Employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Update Employee Role',
                    value: 'UPDATE_EMPLOYEE_ROLE',

                },
                {
                    name: 'View All Roles',
                    value: 'VIEW_ROLES',
                },
                {
                    name: 'Add Role',
                    value: 'ADD_ROLE'
                },
                // {
                //     name: 'Remove Role',
                //     value: 'REMOVE_ROLE'
                // },
                {
                    name: 'View All Departments',
                    value: 'VIEW_DEPARTMENTS',
                },
                {
                    name: 'Add Department',
                    value: 'ADD_DEPARTMENT'
                },
                // {
                //     name: 'Remove Department',
                //     value: 'REMOVE_DEPARTMENT',
                // },
                // {
                //     name: 'View Total Utilized Budget By Department',
                //     value: 'VIEW_UTILITIZED_BUDGET_BY_DEPARTMENT',
                // },
                {
                    name: 'Quit',
                    value: 'QUIT',
                },
            ],
        },
    ]).then((res) => { 
        console.log(res);
        
        switch(res.choice) {
            case "VIEW_EMPLOYEES":
              // code block
              viewEmployees();
              break;
            case "VIEW_EMPLOYEES_BY_DEPARTMENT":
              // code block
              break;
            case "VIEW_EMPLOYEES_BY_MANAGER":
                break;
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeInfo();
                break;
            case "ADD_EMPLOYEE":
                addNewEmployee();
                break;
            case "VIEW_ROLES":
                viewAllRoles();
                 break;
            case "ADD_ROLE":
                addANewRole();
                 break;     
            case "REMOVE_ROLE":
                 break;
            case "VIEW_DEPARTMENTS":
                viewAllDepartments();
                 break;  
            case "ADD_DEPARTMENT":
                addADepartment();
                break;  
            case "REMOVE_DEPARTMENT":
                break;             
            case "VIEW_UTILITIZED_BUDGET_BY_DEPARTMENT":
                break;  
            case "QUIT":
                // inquirer.comp
                break;          
            default:
              // code block
          }
    });
}
loadMainPrompts();
function viewEmployees (){
    db.findAllEmployees()
    .then(({ rows }) => {
        let employees = rows;
        console.log("\n");
        console.table(employees)
    })
    .then(() => {
        loadMainPrompts();
    });
}
function viewAllDepartments() {
    db.findAllDepartments()
    .then(({ rows }) => {
        let departments = rows;
        console.log("\n");
        console.table(departments)
    })
    .then(() => {
        loadMainPrompts();
    });
}

function viewAllRoles() {
    db.findAllRoles()
    .then(({ rows }) => {
        let roles = rows;
        console.log("\n");
        console.table(roles)
    })
    .then(() => {
        loadMainPrompts();
    });
}

function addADepartment() {
    inquirer.prompt([ {
        type: "input",
        name: "department",
        message: "Enter new department name: ",
    }])
    .then((answer) => { 
        // console.log(answer)
        if (!answer.department) {
            loadMainPrompts();
            return;
        }
        
        db.createDepartment(answer.department)
        .then(({ rows }) => {
            loadMainPrompts();
        })
        .catch(err => {
            console.log("There's an error in addADepartment(): ", err);
        })
    });
}

function addANewRole() {
    inquirer.prompt([{
        type: "input",
        name: "title",
        message: "Enter new role title: ",
    }, {
        type: "number",
        name: "salary",
        message: "Enter new role salary: ",
    }, {
        type: "number",
        name: "department_id",
        message: "Enter new role department id: ",
    }])
    .then((answers) => { 
        console.log(answers)
        if (!answers) {
            loadMainPrompts();
            return;
        }
     
        db.createRole(answers)
        .then(({ rows }) => {
            loadMainPrompts();
        })
        .catch(err => {
            console.log("There's an error in addANewRole(): ", err);
        });
    });
  
}
function addNewEmployee(){
    inquirer.prompt([{
        type: "input",
        name: "first_name",
        message: "Enter new employee's first name: ",
    }, {
        type: "input",
        name: "last_name",
        message: "Enter new employee's last name: ",
    },{
        type: "number",
        name: "role_id",
        message: "Enter new employee's role: ",
    }, {
        type: "number",
        name: "manager_id",
        message: "Enter new employee's manager: ",
    }])
    .then((answers) => { 
        console.log(answers)
        if (!answers) {
            loadMainPrompts();
            return;
        }
     
        db.createEmployee(answers)
        .then(({ rows }) => {
            loadMainPrompts();
        })
        .catch(err => {
            console.log("There's an error in addANewEmployee(): ", err);
        });
    });
  

};
function updateEmployeeInfo(){
    db.findAllEmployees()
    .then(({ rows }) => {
        let employees = rows;
        // console.log(employees);
        const choices = [];
        for (let index = 0; index < employees.length; index++) {
            // console.log(employees[index].first_name)
            choices.push( {
                name: `${employees[index].first_name} ${employees[index].last_name}`,
                value: employees[index].id
            })
        }
        inquirer.prompt([{
            type: "list",
            name: "employeeId",
            message: "Choose employee to update: ",
            choices: choices
        }])
        .then((employeeIdAnswer) => { 
            console.log(employeeIdAnswer)

            db.findAllRoles()
            .then(({ rows }) => {
                let roles = rows;
                // console.log(employees);
                const roleChoices = [];
                for (let index = 0; index < roles.length; index++) {
                    // console.log(employees[index].first_name)
                    roleChoices.push({
                        name: roles[index].title,
                        value: roles[index].id
                    })
                }
                inquirer.prompt([{
                    type: "list",
                    name: "roleId",
                    message: "Employee's new role: ",
                    choices: roleChoices
                }])
                .then((roleIdAnswer) => { 
                    console.log(roleIdAnswer)

                    db.updateEmployeeRole(employeeIdAnswer.employeeId,roleIdAnswer.roleId)
                    .then(()=>{
                        loadMainPrompts()
                    }).catch(err => {
                        console.log("There's an error in updateEmployeeInfo()!!!", err)
                    })
                });
            });
        });

    })
};