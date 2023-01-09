const collegeModel = require("../models/collegeModel");
const CollegeModel = require("../models/collegeModel");
const InterModel = require("../models/internModel");
const { isValidName, isValidUrl } = require("../validators/validators")

const createCollege = async(req, res) => {
    try {
        let data = req.body;

        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "Put some data to create College" });

        let { name, fullName, logoLink } = data

        if (!name) return res.status(400).send({ status: false, message: "Name is required" })
        let validName = isValidName(name)
        if (!validName) return res.status(400).send({ status: false, message: "Name can contain only letters " })

        if (!fullName) return res.status(400).send({ status: false, message: "fullName is required" })
        let validFullName = isValidName(fullName)
        if (!validFullName) return res.status(400).send({ status: false, message: "FullName can contain only letters " })


        if (!logoLink) return res.status(400).send({ status: false, message: "logoLink is required" })
        let validLogoName = isValidUrl(logoLink)
        if (!validLogoName) return res.status(400).send({ status: false, message: "Link is not valid " })

        let collegeExist = await CollegeModel.findOne({ $or: [{ fullName: fullName }, { name: name }] }).select({ fullName: 1, name: 1, _id: 0 })

        if (collegeExist) return res.status(400).send({ status: false, message: "College already exist with this name ", data: collegeExist })
        let collegeDetails = await CollegeModel.create(data);


        return res.status(201).send({ status: true, data: collegeDetails });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}

module.exports = { createCollege };