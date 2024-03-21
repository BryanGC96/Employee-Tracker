DELIMITER ;

INSERT INTO department (name)
VALUES 
("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES
("Sales Lead", 100000, 1),
("Lead Engineer", 150000, 2),  
("Account Manager", 160000, 3),  
("Accountant", 125000, 3), 
("Legal Team Lead", 250000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Norman", "Osborn", 3, NULL), 
("Tony", "Stark", 2, NULL),  
("Matt", "Murdock", 4, NULL),  
("Natasha", "Romanoff", 1, 2);

