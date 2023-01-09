
const CollegeModel=require("../models/collegeModel");
const InterModel=require("../models/internModel");


const createIntern= async (req,res)=>{
 try{
let data=req.body;
const {name,email,mobile,collegeName}=data
if(Object.keys(data).length===0) return res.status(400).send({status:false,message:"Put some data to create College"});


let collegeDetails= await CollegeModel.findOne({collegeName:collegeName,isDeleted:false})
data.collegeId=collegeDetails._id


let interDetails= await InterModel.create(data);


return res.status(201).send({status:true,data: interDetails});
 }
 catch(error){
return res.status(500).send({status:false,message:error.message})

 }
}

module.exports={createIntern};