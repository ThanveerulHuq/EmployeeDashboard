const express = require('express');
const router = express.Router();
const employee = require('../models/employeeModel')

router.get('/getAllEmployees', (req, res, next) => {//, auth.authorization('ApproverGroupMembers', 'All',false)
    return employee.getEmployees(req, res, next);
});

router.post('/addEmployee', (req, res, next) => {
    return employee.addEmployee(req, res, next);
});

router.get('/getAllSkills',(req,res,next)=>{
    return employee.getAllSkills(req,res,next);
});

router.get('/getEmpById/:id',(req,res,next)=>{
    return employee.getEmpById(req,res,next);
});

router.get('/deleteEmp/:id',(req,res,next)=>{
    return employee.deleteEmp(req,res,next);
});
module.exports = router;