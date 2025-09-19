"use strict"


 function getSum(...pars){
  let sum=0;
  for(const p of pars){
sum+=p;
  }
  console.log(sum);
  
 }

 

 let user = {
  name:'MoGo',
  age:30,
  salary:3000
 }

//  let userName=user.name;
//  let userAge=user.age;
//  let userSalary=user.salary;

let{name:userName,age:userAge,salary:userSalary}=user;

 console.log(userName);
 console.log(userAge);
 console.log(userSalary);

 let nums=[12,2,20,25,233,100,2569,2,11,20125,2]
 let sum=0;
 for (const num of nums) {
  sum+=num;
  
}
for(const val in user){
  console.log(val,user[val]);
  
}
console.log(nums.map(item=>item+100));
console.log(nums.filter(item=>item>100));
console.log(nums.find(item=>item<12));
console.log(nums.find(item=>item<2));


