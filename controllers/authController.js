const jwt = require("jsonwebtoken");
const User = require("../models/userModel/usersSchema");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    // Extracting Common user data
    const {
      firstName,
      middleName,
      lastName,
      phone,
      email,
      password,
      gender,
      bloodGroup,
    } = req.body;

    //check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with the email" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating new user based on role
    let newUser;
    switch (role) {
      case "Admin":
        //Create Admin user
        newUser = new Admin({
          firstName,
          middleName,
          lastName,
          phone,
          email,
          password: hashedPassword,
          gender,
          bloodGroup
        });
        break;
      case "Student":
        const { studentClass, studentBranch, castCategory } = req.body;
        newUser = new Student({
          firstName,
          middleName,
          lastName,
          phone,
          email,
          password: hashedPassword,
          gender,
          bloodGroup,
          educationalDetails: { branch: studentBranch, class: studentClass },
          castCategory,
        });
        break;
      case "Teacher":
        const { subjectSpeciality, teaching } = req.body;
        const { teacherBranch, teacherClass, subject } = teaching;
        newUser = new Teacher({
          firstName,
          middleName,
          lastName,
          phone,
          email,
          password: hashedPassword,
          gender,
          bloodGroup,
          subjectSpeciality,
          teaching: { branch: teacherBranch, class: teacherClass, subject }
        });
        break;
      case "Librarian":
        newUser = new Librarian({
          firstName,
          middleName,
          lastName,
          phone,
          email,
          password: hashedPassword,
          gender,
          bloodGroup,
        });
        break;

      default:
        break;
    }
  } catch (e) {
    res.send(e)
  }
};

//Login 

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    //check if the user exist
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      res.status(401).json({ message: "User does not exists" });
    }

    //check if password is correct
    const isPasswordValid = await bcrypt.compare(password, existingUser.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" })
    }

    //Generate JWT Token

    let token;
    token = jwt.sign({
      email: existingUser.email,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName
    },
      "My Secret Key",
      { expiresIn: "1d" }
    );

    //Send Token in response
    res.status(200).json({ token })

  } catch (e) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  signup, 
  login
}
