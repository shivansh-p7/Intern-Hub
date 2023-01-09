const CollegeModel=require("../models/collegeModel");
const InterModel=require("../models/internModel");


const createCollege= async (req,res)=>{
 try{
let data=req.body;

if(Object.keys(data).length===0) return res.status(400).send({status:false,message:"Put some data to create College"});

let collegeDetails= await CollegeModel.create(data);


return res.status(201).send({status:true,data: collegeDetails});
 }
 catch(error){
return res.status(500).send({status:false,message:error.message})

 }
}

module.exports={createCollege};

