const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userModel = require("../model/userSchema");
const {uploadToBucket} =require("../services/awsConfig")

const userSignup = async (req, res) => {
  try {
    const isUserExist = await userModel.findOne({
      userEmail: req.body.userEmail,
    });
    if (isUserExist) {
      res.status(409).json({
        success: false,
        message: "User  email already exist",
      });
    } else {
      let fileName=await uploadToBucket(req,res)
      console.log(filename)
      const newUser = new userModel(req.body);
      newUser.userPassword = await bcrypt.hash(req.body.userPassword, 10);
      newUser.profilePic = fileName;
      await newUser.save();
      res.status(201).json({
        success: true,
        message: "user registerd successfully",
        user: newUser,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error occured " + err.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    console.log(req.body);
    const isEmailExist = await userModel.findOne({
      userEmail: req.body.userEmail,
    });
    if (!isEmailExist) {
      res.status(404).json({
        success: false,
        message: "User with this email is not found",
      });
    } else {
      const isMatch = bcrypt.compare(
        req.body.userPassword,
        isEmailExist.userPassword
      );

      if (isMatch) {
        const token = jwt.sign(
          { userId: isEmailExist._id },
          process.env.SECRET_KEY,
          { expiresIn: "5d" }
        );
        res.cookie("jwt", token, { httpOnly: true });
        res.status(200).json({
          success: true,
          message: "User login successfully",
          token: token,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Password not match",
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error occured " + err.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {

  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error occured " + err.message,
    });
  }
};


const userLogout = async (req, res) => {
  try {
    const isUserExist = await userModel.findOne({
      userEmail: req.body.userEmail,
    });
    if (isUserExist) {
      res.clearCookie("jwt");
      res.status(200).json({
        sucess: true,
        message: "user logged out successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User with this email not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error occured " + err.message,
    });
  }
};

module.exports = { userSignup, userLogin, userLogout };



/*
//const jwt = require('jsonwebtoken');
const secret = 'your-secret-key';

// When the user logs in, generate a JWT token and store it in the client's browser
app.post('/login', (req, res) => {
  const user = { id: 1, name: 'John Doe' };
  const token = jwt.sign(user, secret, { expiresIn: '1h' });
  res.cookie('jwt', token, { httpOnly: true });
  res.send('Logged in successfully');
});

// When the user logs out, delete the token from the client's browser
app.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.send('Logged out successfully');
});

// Middleware to verify the token on each request
function verifyToken(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).send('Unauthorized');

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
}

// Protected route that requires a valid token
app.get('/protected', verifyToken, (req, res) => {
  res.send(`Welcome ${req.user.name}!`);
});

*/
