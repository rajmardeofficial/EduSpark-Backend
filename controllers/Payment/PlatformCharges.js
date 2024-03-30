const router = require("express").Router();
const instance = require("../../utils/razorpayInstance");
const StudentSchool = require("../../models/userModel/student/studentTypeModel/StudentSchoolSchema");
const StudentJrCollege = require("../../models/userModel/student/studentTypeModel/StudentJrCollegeSchema");
const StudentCollege = require("../../models/userModel/student/studentTypeModel/StudentCollegeSchema");
const crypto = require("crypto");

//getting key
const getKey = async (req, res) => {
  try {
    res.status(200).send({ key: process.env.RAZORPAY_API_KEY });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//ordercreation
const checkOut = async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: Number(amount * 100), // amount in the smallest currency unit.
      currency: "INR",
    };
    //order create
    const order = await instance.orders.create(options);
    res.status(200).send(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const paymentVerification = async (req, res) => {
  try {
    const data = req?.params?.data;    

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // Verify the signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if(isAuthentic){
        try {
            console.log("is Authentic");
            const dataOfStudent =
            typeof data === "string"
              ? JSON.parse(decodeURIComponent(data))
              : data;
            console.log(dataOfStudent);

            let student;
            if(dataOfStudent?.studentType == "School"){
                student = await StudentSchool.findOne({email:dataOfStudent.email});
            }else if(dataOfStudent?.studentType == "Jr College"){
                student = await StudentJrCollege.findOne({email:dataOfStudent.email});
            }else{
                student = await StudentCollege.findOne({email:dataOfStudent?.email});
            }
            console.log(student?.platformCharges?.paidStatus);
            const statusOfPlatformCharges = {
              paidStatus:true,
              payment_id:razorpay_payment_id,
              date:Date.now()
            }
            await student?.updateOne({$set: {platformCharges: statusOfPlatformCharges}});
            // res.send("success");
            res.redirect(
                `http://localhost:3000/addStudent`
              );
              
        } catch (error) {
            console.log(error);
        }
    }else{
        console.log("log");
    }
  } catch (error) {}
};

module.exports = {getKey,checkOut,paymentVerification};