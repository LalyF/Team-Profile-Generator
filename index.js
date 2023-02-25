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

const emailRegex1= "\A[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@↵(?:[A-Z0-9-]+\.)+[A-Z]{2,6}\Z";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const idRegex = /^MG\d{4}$/;
const nameRegex = /^[a-zA-Z\s]*$/;
const phnnoRegex= /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;


let team=[];
//function to gather information about the development team members, and render the HTML file.
profileGenerator();
 async function profileGenerator(){
    // Function to prompt user for manager information
 function promptManager() {
   return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the team manager\'s name?',
        validate: function (input){
            if(nameRegex.test(input)){
                return true;
            }else
            {
                return  "Please enter a valid name "
            }

        }
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is the team manager\'s employee ID?'
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is the team manager\'s email address?'
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: 'What is the team manager\'s office number?', 
        validate: function (input){
            if(phnnoRegex.test(input)){
                return true;
            }else
            {
                return  "Please enter a valid number "
            }

        }
      }
    ]).then((answers) => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);//create a manager object
        team.push(manager);//push the manager prompt answers to team array
        console.log("Add a team under Manager "+manager.name)
        promptTeamMember();
             });
            
            }
  //function to prompt add team member and prompt according to the answer whether engineer or intern and stop prompt once finished building team is selected 
   async function promptTeamMember() {
  return inquirer.prompt([
      {
        type: "list",
        name: "role",
        message: "What type of team member would you like to add?",
        choices: ["Add an Engineer", "Add an Intern", "Finished building the team"],
      },
    ]).then((answers) => {
      switch (answers.role) {
          case "Add an Engineer":
          inquirer.prompt([
            {
              type: "input",
              name: "name",
              message: "What is the engineer's name?",
            },
            {
              type: "input",
              name: "id",
              message: "What is the engineer's employee ID?",
            },
            {
              type: "input",
              name: "email",
              message: "What is the engineer's email address?",
            },
            {
              type: "input",
              name: "github",
              message: "What is the engineer's GitHub username?",
            },
          ]).then((answers) => {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);//create an Engineer object
            team.push(engineer);
            console.log("Added Engineer "+answers.name)

            promptTeamMember();
          });
          break;
        case "Add an Intern":
          inquirer.prompt([
            {
              type: "input",
              name: "name",
              message: "What is the intern's name?",
            },
            {
              type: "input",
              name: "id",
              message: "What is the intern's employee ID?",
            },
            {
              type: "input",
              name: "email",
              message: "What is the intern's email address?",
            },
            {
              type: "input",
              name: "school",
              message: "What is the name of the intern's school?",
            },
          ]).then((answers) => {
            const intern= new Intern(answers.name, answers.id, answers.email, answers.school);
            team.push(intern);
            promptTeamMember();
          });
          break;
        case "Finished building the team":
          // generate HTML using the teamMembers array
          
                 const htmlDoc=render(team);
  
                fs.writeFile(outputPath,htmlDoc);

          break;
        default:
          console.error("Invalid choice");
      }
    });
  }
  
  // start the prompt
//   await promptManager();
   await promptManager();



   
 
}