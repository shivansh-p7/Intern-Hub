const CollegeModel=require("../models/collegeModel");
const InterModel=require("../models/internModel");
const {isValidEmail,isValidName,isValidUrl} = require ("../validators/validators")

const createCollege= async (req,res)=>{
 try{
let data=req.body;

if(Object.keys(data).length===0) return res.status(400).send({status:false,message:"Put some data to create College"});

const {name , fullName, logoLink} = data

if(!name)  return res.status(400).send({status:false, message:"Name is required"})
let validName = isValidName 

if(!fullName)  return res.status(400).send({status:false, message:"fullName is required"})
if(!logoLink)  return res.status(400).send({status:false, message:"logoLink is required"})


let collegeDetails= await CollegeModel.create(data);


return res.status(201).send({status:true,data: collegeDetails});
 }
 catch(error){
return res.status(500).send({status:false,message:error.message})

 }
}

module.exports={createCollege};

