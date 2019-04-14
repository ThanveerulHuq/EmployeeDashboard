const knex = require('../db')

const getEmployees = (req, res, next) => {
    knex.raw(`select employee.name as name,group_concat(skills.skill separator ',')as skills, employee.id as id,employee.dob as dob,employee.salary as salary from employee_skills
    join employee on employee.id=employee_skills.employee
    join skills on skills.id=employee_skills.skill
    where active='Y' group by employee `).then((result) => {
        return res.json(result[0]);
    })
};
const getAllSkills = (req, res, next) => {
    knex.raw('select id as value,skill as label from skills').then((result) => {
        return res.json(result[0])
    })
}

const addEmployee = async (req, res, next) => {
    if (req.body.id == 0) {
        knex.raw(`insert into employee (name,salary,dob) values('${req.body.name}',${req.body.salary},'${req.body.dob.substring(10, -1)}')`).then(result => {
            let query = getEmpSkillQuery(req.body.selectedSkills, result[0].insertId);
            knex.raw(query).then(sresult => {
                res.json({ message: 'employee added successfully' });
            })
        });
    } else {
        await knex.raw(`update employee set name='${req.body.name}',salary=${req.body.salary},dob='${req.body.dob.substring(10, -1)}' where id=${req.body.id}`)
            .then(result => console.log('emp updated'));
        let oldSkills = [], newSkills = req.body.selectedSkills,skillToDelete=[];
        await knex.raw(`select skill from employee_skills where employee=${req.body.id}`)
            .then(skills => oldSkills = skills[0].map(el=>el.skill));
        oldSkills.forEach((el,i) => {
            let index = newSkills.indexOf(el);
            if (index > -1) {
                newSkills.splice(index, 1);
            }else{
                skillToDelete.push(el);
            }
        });
        if (newSkills.length != 0) {
            let query = getEmpSkillQuery(newSkills, req.body.id);
            await knex.raw(query).then(result => console.log('newSkills inserted'));
        }
        if (skillToDelete.length != 0) {
            let query = `delete from employee_skills where employee= ${req.body.id} and skill in (`
            skillToDelete.forEach(el => {
                query = query + el + ',';
            });
            query = query.substring(query.length - 1, -1) + ');';
            console.log(query);
            await knex.raw(query).then(result => console.log('old skills deleted'));
        }
        return res.json({ message: 'Employee updated successfully' });
    }

}

const getEmpById = (req, res, next) => {
    knex.raw(`select * from employee where id=${req.params.id}`).then((result) => {
        let employee = result[0][0];
        if (employee) {
            knex.raw('select skill from employee_skills where employee=' + employee.id).then((skills) => {
                let selectedSkills = [];
                skills[0].forEach(el => {
                    selectedSkills.push(el.skill);
                })
                employee['selectedSkills'] = selectedSkills;
                return res.json(employee);
            })
        }
    });
}

const deleteEmp = (req, res, next) => {
    knex.raw(`update employee set active='N' where id= ${req.params.id}`).then((result) => {
        if (result) return res.json({ message: 'Employee deleted successfully' });
        else return res.json({ message: 'Error deleting employee' });
    })
}

const getEmpSkillQuery = (skills, empId) => {
    let query = 'insert into employee_skills (employee,skill) values';
    skills.forEach((el) => {
        query = query + `(${empId},${el}),`
    });
    query = query.substring(query.length - 1, -1);
    return query;
}


module.exports = { getEmployees, getAllSkills, addEmployee, getEmpById, deleteEmp }