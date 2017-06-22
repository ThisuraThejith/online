/**
 * Created by thisura on 6/21/17.
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(cors());

//Database Connection
mongoose.connect('mongodb://localhost/university');

//Database schemas for department and program objects
var departments = mongoose.model('departments',{id: String, name: String});
var programs = mongoose.model('programs',{id: String, name: String});

//server startup
app.listen(8080, function (error) {
    console.log("[INFO] DEPARTMENT API RUNNING ON http://localhost:8080/");
});

//Fetch all departments
app.get("/departments",function (req,res) {
    console.log("[ROUTE CALLED][GET] /departments");
    departments.find(function (error,departments) {
        if(error){
            console.log("[ERROR] FETCHING DEPARTMENTS FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING DEPARTMENTS FROM DATABASE SUCCESS");
        res.json(departments);
    });
});

//Fetch all programs
app.get("/programs",function (req,res) {
    console.log("[ROUTE CALLED][GET] /programs");
    programs.find(function (error,programs) {
        if(error){
            console.log("[ERROR] FETCHING PROGRAMS FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING PROGRAMS FROM DATABASE SUCCESS");
        res.json(programs);
    });
});

//Returns one department by ID
app.get("/departments/:id",function (req,res) {
    var reqId=req.params.id;
    console.log("[ROUTE CALLED][GET] /departments/" + reqId);
    departments.findOne({id:reqId},function (error,departments) {
        if(error){
            console.log("[ERROR] FETCHING ONE DEPARTMENT FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING ONE DEPARTMENT FROM DATABASE SUCCESS");
        res.json(departments);
    });
});


//Returns one department by name not worked
app.get("/departments/:id",function (req,res) {
    var reqId=req.params.id;
    console.log("[ROUTE CALLED][GET] /departments/" + reqId);
    departments.findOne({name:reqId},function (error,departments) {
        if(error){
            console.log("[ERROR] FETCHING ONE DEPARTMENT FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING ONE DEPARTMENT FROM DATABASE SUCCESS");
        res.json(departments);
    });
});

//Add new department
app.post("/departments",function (req,res) {
    console.log("[ROUTE CALLED][POST] /departments");

    var newDepartment = new departments(req.body);

    newDepartment.save(function (error,newDepartment) {
        if(error){
            console.log("[ERROR] ADDING A NEW DEPARTMENT TO DATABASE FAILED");
            res.end();
        }
        console.log("[DB] ADDING A NEW DEPARTMENT TO DATABASE SUCCESS");
        res.json(newDepartment);
    });
});

//Delete a department
app.delete("/departments/:id",function (req,res) {

    var delId = req.params.id;

    console.log("[ROUTE CALLED][DELETE] /departments/" + delId);
    departments.deleteOne({id:delId},function (error,departments) {
        if(error){
            console.log("[ERROR] DELETING ONE DEPARTMENT FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] DELETING ONE DEPARTMENT FROM DATABASE SUCCESS");
        res.json(departments);
    });
});


//update department
app.put("/departments/:departmentId",function (req,res) {
    var reqId = req.params.departmentId;
    console.log("[ROUTE CALLED][PUT] /departments/" + reqId);
    departments.findOne({id:reqId}, function (error,department) {
        if(error){
            res.status(500);
            res.end();
        }
        department.name = req.body.name;
        department.save(function (error,department) {
            if(error){
                res.status(500).end();
            }
            res.json(department);
        });
    });
});

//Returns programs belonging to a specific department
app.get("/departments/programs/:departmentId", function(req, res){
	var reqId = req.params.departmentId;
	console.log("[ROUTE CALLED][GET] /departments/programs/" + reqId);
	programs.find({dept: reqId}, function(error, departments){
		if(error){
			console.log("[ERROR] FETCHING PROGRAMS FROM DATABASE FAILED");
			res.end();
		}
		console.log("[DB] FETCHING PROGRAMS FROM DATABASE SUCCESS");
		res.json(departments);
	});
});

