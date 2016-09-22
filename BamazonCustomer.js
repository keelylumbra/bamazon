var inquirer = require('inquirer');

var mysql = require('mysql');

var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "", //Your password
    database: "Bamazon"
});

connection.connect(function (err) {
    if (err) throw err;

    display();

});

function display() {

connection.query("SELECT * FROM Products", function (err, res) {
                if (err)
                    throw err;

                  
                

                    



var table = new Table({
    head: ['Item ID', 'Product Name', 'Department', 'Price', 'Quantity']
  , colWidths: [10, 20, 20, 10, 10]
});
 
// table is an Array, so you can `push`, `unshift`, `splice` and friends 

for (var i = 0; i < res.length; i++) {
table.push(
    [res[i].ItemID, res[i].ProductName, res[i].DepartmentName, res[i].Price, res[i].StockQuantity]
);
  };
console.log(table.toString());


})
};




//     inquirer.prompt([
//         {
//             type: "list",
//             message: "Would you like to [POST] an auction or [BID] on an auction?",
//             choices: ["POST", "BID"],
//             name: "choice"
//         }
//     ]).then(function (choice) {
//         if (choice.choice === "POST") {
//             inquirer.prompt([
//                 {
//                     type: "input",
//                     name: "name",
//                     message: "Item Name"
//                 },
//                 {
//                     type: "input",
//                     name: "quantity",
//                     message: "Item Quantity"
//                 },
//                 {
//                     type: "input",
//                     name: "price",
//                     message: "Item Price"
//                 }
//             ]).then(function (item) {

//                 connection.query('INSERT INTO items SET ?', {
//                     item_name: item.name,
//                     quantity: item.quantity,
//                     price: item.price
//                 }, function (err, res) {
//                     if (err)
//                         throw err;
//                 });
//                 connection.end();
//             });
//         } else if (choice.choice === "BID") {
//             connection.query("SELECT * FROM items", function (err, res) {
//                 if (err)
//                     throw err;
//                 var items = [];
//                 for (var i = 0; i < res.length; i++) {
//                     console.log("Item: " + res[i].item_name + "\nPrice: " + res[i].price + "\nQuantity: " + res[i].quantity);
//                     console.log("ID: " + res[i].id);
//                     console.log("---------------------");
//                     items.push(res[i].id.toString());
//                 }
//                 console.log('--------END--------');
//                 console.log("items", items);

//                 inquirer.prompt([
//                     {
//                         type: "list",
//                         message: "Which item[id] would you like to bid on?",
//                         choices: items,
//                         name: "choice"
//                     }
//                 ]).then(function (selection) {
//                     console.log(selection.choice);
//                     connection.query("SELECT * FROM items WHERE id=?", [selection.choice], function (err, res) {
//                         console.log("Item: " + res[0].item_name);
//                         console.log("Current Price: $" + res[0].price);
//                         inquirer.prompt([
//                             {
//                                 type: "input",
//                                 name: "bid",
//                                 message: "enter your bid",
//                                 validate: function (value) {
//                                     //also validate if a number
//                                     if (value >= res[0].price) {
//                                         return true;
//                                     } else {
//                                         return "Please enter a higher bid";
//                                     }
//                                 }
//                             }
//                         ]).then(function (test) {
//                             connection.query("UPDATE items SET ? WHERE?", [
//                                 {
//                                     price: test.bid
//                                 }, {
//                                     id: res[0].id
//                                 }], function(err, res) {});
//                             console.log("Item: " + res[0].item_name);
//                             console.log("Current Price: $" + test.bid);
//                             console.log("you are the high bidder");
//                             connection.end();
//                         });

//                     });
//                 });

//             });

//         }
//     });
// }

