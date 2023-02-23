// TODO: Write code to define and export the Employee class

 //created a parent class Employee
class Employee{ 
   //constructor for property name, id, email
    constructor(name,id,email){
    this.name=name;
     this.id=id
     this.email=email; 
    }
    //methods to return the values
     getName(){

         return this.name;
     
        }
     getId(){
         return this.id;
     }
     getEmail(){
         return this.email
     }
     
     getRole(){
return "Employee"

     }
  }


  module.exports=Employee;