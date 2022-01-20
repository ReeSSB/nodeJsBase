const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");
const date = new Date().toString();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;

console.log(`HI, WELCOME TO NODE!`);

// To list CPUs
// console.log(os.cpus());
// To know Home Directory
// console.log(os.homedir());
// To know the Host Name
// console.log(os.hostname());
// To know the UPtime of system
// console.log(os.uptime());

// TO READ FILE AYNCHRONOUSLY
// const readSample = fs.readFile('sample.txt','utf-8',(err, fileData) => {
//             if (err) {
//                   console.log(err);
//             } else {
//                   console.log(fileData);
//             }
//       });
// console.log(readSample);

// TO WRITE FILE ASYNCHRONOUSLY
// const writeMessage = `Hi, Welcome to Node.js
// If you are reading this message then,
// using FS you were able to execute write file function.` ;
// const writeSample = fs.writeFile('sample.txt',writeMessage,'utf-8',(err, fileData) => {
//       if (err){
//             console.log(err);
//       }else{
//             console.log(fileData);
//       }
// });
// console.log(writeSample);

// TO READ FILE SYNCHRONOUSLY
// No Callback for Synchronous Read File.
// function readsync() {
//       const readOutput = fs.readFileSync("sample.txt", "utf-8");
//       console.log(readOutput);
// }

// TO WRITE FILE SYNCHRONOUSLY
// No Callback for Synchronous Write File.
// function writesync(message) {
//       const writeOutput = fs.writeFileSync("sample2.txt", message);
//       console.log(writeOutput);
// }

// readsync();
// writesync(`You have written this file synchronously. Congrats 😀😁😊👌!`);

// TO CREATE SERVER AND WRITE HEADER MESSAGE AND SET PORT MANUALLY & STRINGIFY MESSAGE ALSO.
// http.createServer((req, res)=>{
//       res.writeHeader(200,{"Content-Type":"text/html"});
//       res.write("Welcome to the Backend Server! Congrats 😁, you have written your first server.");
//       res.write(JSON.stringify({message:"Note - Stringified message => Welcome to the Back End Server!"}))
//       res.end();
// }).listen(PORT,()=>{
//       console.log("Listening to port" + PORT);
// });

// EXAMPLE 1. ASYNCHRONOUS(Write Only)
// const dataToBeWritten = `Hi, Great Work!
//                          You have successfully written
//                          data from the server, you have created.`;

// fs.writeFile("sample.txt", dataToBeWritten, "UTF-8", (err, data) => {
//       if (err) throw err;
//       else {
//             console.log(data);
//       }
// });

// fs.readFile("sample.txt", "UTF-8", (err, data) => {
//       if (err) throw err;
//       else {
//             http.createServer((req, res) => {
//                   res.writeHeader(200, { "Content-Type": "text/html" });
//                   res.write(
//                         "Welcome to the Backend Server! Congrats 😁, you have written your first server."
//                   );
//                   res.write(data);
//                   res.end();
//             }).listen(PORT, () => {
//                   console.log("Listening to port" + PORT);
//             });
//       }
// });

// EXAMPLE 2. SYNCHRONOUSLY(Write Only)

// const dataToBeWritten = `Hi, Great Work!
//                          You have successfully written
//                          data from the server, you have created.`;

// fs.writeFileSync("sample.txt", dataToBeWritten, "UTF-8");

// fs.readFile("sample.txt", "UTF-8", (err, data) => {
//       if (err)
//             throw err;
//        else {
//             http.createServer((req, res) => {
//                   res.writeHeader(200, {"Content-Type": "text/html"});
//                   res.write("Welcome to the Backend Server! Congrats, you have written your first server.");
//                   res.write(data);
//                   res.end();
//             }).listen(PORT, () => {
//                   console.log("Listening to port" + PORT);
//             });
//       }
// });

// To Fetch and creat time stamp and store it in variable
// const timeStamp = Date.now();
// const dateObject = new Date(timeStamp);
// const month  = dateObject.push((e)=>e.getMonth());
// const year = dateObject.getFullYear();
// const day = dateObject.getDate();

// let timeStampArray;
// timeStampArray = [month, year, day, timeStamp];
// let newTimeStamp = Array.from(new Set(timeStampArray));
// let newTimeStamp = [month];

// function(x) {
//       for(let i=0; i<=4;i++ ){
//             newTimeStamp.push
//       }
// }
// console.log(newTimeStamp);

// create stream
// const createStream = fs.createWriteStream("timeStamp.txt");
// createStream.end();

// To write time stamp in text file
// fs.writeFileSync('timeStamp/timeStamp.txt',date);

// to read the written data on text file
// fs.readFile('timeStamp/timeStamp.txt','UTF-8',(err,data)=>{
//       if(err) throw err;
//       else{
//             http.createServer((req,res)=>{
//                   res.writeHeader(200, {"Content-Type":"text/html"});
//                   res.write(data);
//                   res.end();
//             }).listen(PORT,()=>{
//                   console.log('Listening on Port'+PORT);
//             });
//       }
// });



//USING EXPRESS
app.use(bodyParser.json()); // It should be above always...

const users = [];
let value = 0;

app.get("/allusers", (req, res) => { // res.send('Hello World!');
      res.json(users);
});

app.post("/add", (req, res) => {
      let {name, email, address, mobile} = req.body;
      // console.log(name, email, address, mobile);
      let id = value++;
      users.push({
            id,
            name,
            email,
            address,
            mobile
      });

      // users.push(req.body);
      res.send({message: " User Added Successfully!"});
});

app.put("/editusers/:id", (req, res) => {
      let id = req.params.id;
      console.log(id);
      // console.log(users[id]);

      let {name, email, address, mobile} = req.body;
      let userData = users.filter((e) => e.id == id);
      console.log(userData);

      // way to edit users using splice.
      users.splice(users.indexOf(userData[0]), 1, {
            id,
            name,
            email,
            address,
            mobile
      });

      res.send({
            message: "User edited successfully!", 
            data: users
      });
});


app.delete('/deleteUser/:id', (req, res) => {
      let id = req.params.id;
      console.log(id);
      // console.log(users[id]);
      let userData = users.filter((e) => e.id == id);
      console.log(userData);


      // way to edit users using splice.
      users.splice(users.indexOf(userData[0]), 1);

      res.send({
            message: "User deleted successfully!", 
            delData: userData
      });
});


app.listen(PORT, () => {
      console.log("Server is Up at " + PORT);
});
