DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;


CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL (13,2),
  stock_quantity SMALLINT, 
  PRIMARY KEY (item_id)
);
insert into products (product_name, department_name, price, stock_quantity) 
    values ("ephedrine HCL 100g","USP", 24.95, 155);
insert into products (product_name, department_name, price, stock_quantity) 
    values ("toluene 1L","solvents", 24.95, 212);
insert into products (product_name, department_name, price, stock_quantity) 
    values ("dimenthylbenzine 1L","solvent", 24.95, 144);
insert into products (product_name, department_name, price, stock_quantity) 
    values ("dichloroethane 1L","solvent", 24.95, 133);
insert into products (product_name, department_name, price, stock_quantity) 
    values ("lithium aluminum hydride 10g","reduction", 24.95, 10);
insert into products (product_name, department_name, price, stock_quantity) 
    values ("indole 200g","organic", 124.95, 15);
insert into products (product_name, department_name, price, stock_quantity) 
    values ("piperidine 10g","organic", 24.95, 500);
insert into products (product_name, department_name, price, stock_quantity) 
    values ("safarole 10g","organic", 24.95, 900);
insert into products (product_name, department_name, price, stock_quantity) 
    values ("trinitrophenol 10g","4'th of July", 24.95, 23);
insert into products (product_name, department_name, price, stock_quantity) 
    values ("Iodine 10g","element", 4.95, 85);
