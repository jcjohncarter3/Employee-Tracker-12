const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: 'J0hnc@rt3r!',
    database: "employee_tracker_db",
    port: 5432,
});

module.exports = pool;