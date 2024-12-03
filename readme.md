# Payroll Management System - Backend

## Overview

This is the backend for the **Payroll Management System** built with **Node.js**, **Express.js**, and **SQL**. The backend provides APIs for **authentication**, **user attendance management**, and **admin management**.

## SQL Queries

CREATE TABLE roles (
id SERIAL PRIMARY KEY,
role_name VARCHAR(50) UNIQUE NOT NULL -- 'user', 'admin'
);

CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
role_id INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
is_active BOOLEAN DEFAULT TRUE,
FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE attendance (
id SERIAL PRIMARY KEY,
user_id INT NOT NULL,
checkin_time TIMESTAMP,
checkout_time TIMESTAMP,
date DATE NOT NULL,
FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE salaries (
id SERIAL PRIMARY KEY,
user_id INT NOT NULL,
basic_salary DECIMAL(10, 2) NOT NULL,
allowances DECIMAL(10, 2),
deductions DECIMAL(10, 2),
FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE payroll (
id SERIAL PRIMARY KEY,
user_id INT NOT NULL,
salary_id INT NOT NULL,
total_salary DECIMAL(10, 2),
month DATE NOT NULL,
generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (salary_id) REFERENCES salaries(id)
);

CREATE TABLE payslips (
id SERIAL PRIMARY KEY,
payroll_id INT NOT NULL,
payslip_date DATE NOT NULL,
basic_salary DECIMAL(10, 2),
allowances DECIMAL(10, 2),
deductions DECIMAL(10, 2),
total_salary DECIMAL(10, 2),
FOREIGN KEY (payroll_id) REFERENCES payroll(id)
);

CREATE TABLE leaves (
id SERIAL PRIMARY KEY,
user_id INT NOT NULL,
leave_type VARCHAR(50), -- 'sick', 'vacation', etc.
leave_start_date DATE NOT NULL,
leave_end_date DATE NOT NULL,
status VARCHAR(20) DEFAULT 'pending', -- 'approved', 'rejected'
FOREIGN KEY (user_id) REFERENCES users(id)
);
