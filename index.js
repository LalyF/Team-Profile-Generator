const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs/promises");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const Employee = require("./lib/Employee");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
let team=[];
startProgram();
async function startProgram(){
   let engineer= new Engineer("Andrew",55,"jbhjfbgj@gh.com","hjh")
   let en=engineer.getRole();
   let manager=new Manager("laly",56,"jsj@hjgjh.com",8566552)
let mn=manager.getRole();
team.push(engineer);
team.push(manager);
// team.push(new Engineer("jhjhj",55,"hjjhj@gh.com","jhj"));
// team.push(new Engineer("hbhhj",55,"bjhbj@gh.com","bjhh"));


// team.push(role);

let htmlDoc=render(team);


await fs.writeFile(outputPath,htmlDoc);


}