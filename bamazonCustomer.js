const mysql = require("mysql");
const inquirer = require("inquirer");
const sprintf = require("sprintf-js").sprintf;
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "test",
  database: "bamazon"
});
var order = [];

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
  start();
});


function start() {
  inquirer
    .prompt({
      name: "main_option",
      type: "list",
      message: "Would you like to [BUY] or [EXIT]???????",
      choices: ["BUY", "EXIT"]
    })
    .then(function(answer) {
      if (answer.main_option === "BUY") {
        main();
      }
      else {
        let order_total = 0;
        console.log("order recap:")
        console.log(sprintf("%30s %10s %10s %10s","product", "quantity", "price", "subtotal"));
        order.map( function(order_line) {
             console.log(sprintf("%30s %10d %10.2f %10.2f", order_line.product,
                   order_line.quantity, order_line.price, order_line.price * order_line.quantity));
             order_total += order_line.price * order_line.quantity;
        });
      
        console.log(sprintf("Your order total:%46.2f" ,  order_total));
        db.end();
      }
    });
}


function main() {
  let query = "SELECT * FROM products";

  db.query(query, (err, result) => {
    if (err) {
      console.log("database error");
    }
    console.log(sprintf(" %3s %30s %18s %12s %11s", "ID#", "Name", "Dept", "price", "Quantity"));
    result.map((val) => {
      console.log(sprintf(" %2d. %30s %18s %12f %11d", val.item_id, val.product_name,
        val.department_name, val.price, val.stock_quantity));
    });
    inquirer
      .prompt([
        {
          name: "item",
          type: "number",
          message: "which product do you want"
        },
        {
          name: "quantity",
          type: "number",
          message: "how many of this item?",
        }
      ])
      .then(function (answer) {
        db.query("SELECT product_name, stock_quantity,price FROM products where item_id = ?", [answer.item], function (err, count) {
          if (err) throw err;
          if (parseInt(count[0].stock_quantity) < parseInt(answer.quantity) ) {
            console.log("Insufficient quantity on hand, try ordering less");
            start();
          }
            else {
                   db.query( "UPDATE products SET stock_quantity = stock_quantity - ? WHERE  item_id = ?",
                    [ answer.quantity, answer.item ], 
                    function(error) {
                      if (error) throw err;
                      console.log("Order placed successfully!" + count[0].price);
                      order.push({product: count[0].product_name, price : count[0].price, quantity: answer.quantity } );
                      start();
                    }
                   );
            }
        }
        ) 
      });
  });
}
