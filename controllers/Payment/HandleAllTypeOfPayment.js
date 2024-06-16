const instanceForPlatformCharges = require("../../utils/payment/razorpayInstanceForPlatformCharges");
const instanceForCollegeFee = require("../../utils/payment/razorpayInstanceForCollegeFee");
const StudentSchool = require("../../models/userModel/student/studentTypeModel/StudentSchoolSchema");
const StudentJrCollege = require("../../models/userModel/student/studentTypeModel/StudentJrCollegeSchema");
const StudentCollege = require("../../models/userModel/student/studentTypeModel/StudentCollegeSchema");
const crypto = require("crypto");
const Payment = require("../../models/paymentModel/paymentSchema");

//getting key
const getKey = async (req, res) => {
  try {
    const to = req?.params?.to;
    if (to === "Company") {
      res.status(200).send({ key: process.env.RAZORPAY_API_KEY });
    } else {
      console.log(to);
      res.status(200).send({ key: process.env.RAZORPAY_API_KEY1 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//ordercreation
const checkOut = async (req, res) => {
  try {
    const to = req?.params?.to;
    const { amount } = req.body;
    const options = {
      amount: Number(amount * 100), // amount in the smallest currency unit.
      currency: "INR",
    };
    //order create
    let order;
    if (to === "Company") {
      order = await instanceForPlatformCharges.orders.create(options);
    } else {
      console.log(to);
      order = await instanceForCollegeFee.orders.create(options);
    }
    res.status(200).send(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const paymentVerification = async (req, res) => {
  try {
    const data = req?.params?.data;
    const to = req?.params?.to;

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // Verify the signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    let expectedSignature;
    if (to === "Company") {
      expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(body)
        .digest("hex");
    } else {
      console.log(to);
      expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET1)
        .update(body)
        .digest("hex");
    }

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      try {
        console.log("is Authentic");
        const data1 =
          typeof data === "string"
            ? JSON.parse(decodeURIComponent(data))
            : data;
        console.log(data1);

        if (to === "Company") {
          //handlePlatformCharges
          let student;
          if (data1?.studentType == "School") {
            student = await StudentSchool.findOne({
              email: data1.email,
            });
          } else if (data1?.studentType == "Jr College") {
            student = await StudentJrCollege.findOne({
              email: data1.email,
            });
          } else {
            student = await StudentCollege.findOne({
              email: data1?.email,
            });
          }

          console.log(student?.platformCharges?.paidStatus);
          const statusOfPlatformCharges = {
            paidStatus: true,
            order_id: razorpay_order_id,
            payment_id: razorpay_payment_id,
            date: Date.now(),
          };
          await student?.updateOne({
            $set: { platformCharges: statusOfPlatformCharges },
          });
          res.redirect(`http://localhost:3000/addStudent`);

        } else if (to === "CollegeDocumentFee") {
          //handleDocumentRequest
          try {

            const collection =
              data1?.studentType === "College"
                ? StudentCollege
                : data1?.studentType === "Jr College"
                ? StudentJrCollege
                : StudentSchool;
  
              await collection
              .findByIdAndUpdate(
                req?.user?.id,

                {
                  $push: {
                    documentRequests: {
                      $each: data1?.documentsIds?.map((documentId) => ({
                        document: documentId,
                        status: "pending",
                        paidStatus:true,
                        order_id:razorpay_order_id,
                        payment_id:razorpay_payment_id,
                        date:Date.now(),
                      })),
                    },
                  },
                },
                { new: true }
              )
              .select("documentRequests?.document");
              
            console.log("Documents updated successfully!");
            res.status(200).json("payment Successfull");

          } catch (error) {
            console.log("error in requesting document",error);
            res.status(500).json({ message: "Internal server error" });
          }

        } else {
          //handle school/JrCollege/College fee
          console.log(data1)
          data1.studentId = req?.user?.id;
          data1.payment_id = razorpay_payment_id;
          data1.order_id = razorpay_order_id;
          let payment = new Payment(data1);
          payment = await payment.save();
          res.send("fee successfully send to the College");
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
      }
    } else {
      console.log("log");
      res.status(500).json({ message: "Not Authentic" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getKey, checkOut, paymentVerification };
