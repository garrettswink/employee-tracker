INSERT INTO departments (department_name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('HR');


INSERT INTO roles (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4),
    ('Lead HR', 250000, 5),
    ('HR', 150000, 5);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, 0),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, 0),
    ('Kevin', 'Tupik', 4, 2),
    ('Malia', 'Brown', 5, 0),
    ('Sarah', 'Lourd', 6, 3),
    ('Tom', 'Allen', 7, 3),
    ('Sam', 'Clemens', 8, 4),
    ('Samantha', 'Papadopoulos', 9, 5);