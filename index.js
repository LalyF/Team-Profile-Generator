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

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;//reg expression for email id
const idRegex = /^[0-9]{4}$/;//accepts only 4 digits id
const nameRegex = /^[a-zA-Z\s]*$/;//accepts only string
const phnnoRegex= /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;//accepts 10 digit numbers
const githubRegex= /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;//Github username may only contain alphanumeric characters or hyphens,cannot have multiple consecutive hyphens,cannot begin or end with a hyphen,Maximum is 39 characters.


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
                return  "Please enter a valid name !!"
            }

        }
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is the team manager\'s employee ID?',
        validate: function (input){
            if(idRegex.test(input)){
                return true;
            }else
            {
                return  "Please enter a valid employee id(4 digits)!!! "
            }

        }
    },
      {
        type: 'input',
        name: 'email',
        message: 'What is the team manager\'s email address?',
        validate: function (input){
            if(emailRegex.test(input)){
                return true;
            }else
            {
                return  "Please enter a valid email id!! "
            }

        }
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
                return  "Please enter a valid 10 digit phone number "
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
              validate: function (input){
                if(nameRegex.test(input)){
                    return true;
                }else
                {
                    return  "Please enter a valid name !!"
                }
    
            }
            },
            {
              type: "input",
              name: "id",
              message: "What is the engineer's employee ID?",
              validate: function (input){
                if(idRegex.test(input)){
                    return true;
                }else
                {
                    return  "Please enter a valid employee id(4 digits)!! "
                }
    
            }
            },
            {
              type: "input",
              name: "email",
              message: "What is the engineer's email address?",
              validate: function (input){
                if(emailRegex.test(input)){
                    return true;
                }else
                {
                    return  "Please enter a valid email id !!"
                }
    
            }
            },
            {
              type: "input",
              name: "github",
              message: "What is the engineer's GitHub username?",
              validate: function (input){
                if(githubRegex.test(input)){
                    return true;
                }else
                {
                    return  "Please enter a valid GitHub username!!) "
                }
    
            }
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
              type: "input",
              name: "id",
              message: "What is the intern's employee ID?",
              validate: function (input){
                if(idRegex.test(input)){
                    return true;
                }else
                {
                    return  "Please enter a valid employee id(4 digits) "
                }
    
            }
            },
            {
              type: "input",
              name: "email",
              message: "What is the intern's email address?",
              validate: function (input){
                if(emailRegex.test(input)){
                    return true;
                }else
                {
                    return  "Please enter a valid email id!! "
                }
    
            }
            },
            {
              type: "input",
              name: "school",
              message: "What is the name of the intern's school?",
              validate: function (input){
                if(nameRegex.test(input)){
                    return true;
                }else
                {
                    return  "Please enter a valid school name!! "
                }
    
            }
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