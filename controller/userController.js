const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userModel = require("../model/userSchema");
const { sendEmail } = require("../services/emailService");

//user register
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
      const newUser = new userModel(req.body);
      newUser.userPassword = await bcrypt.hash(req.body.userPassword, 10);
      newUser.profilePic = `/uploads/${req.file.filename}`;
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

//user login
const userLogin = async (req, res) => {
  try {
    const isEmailExist = await userModel.findOne({
      userEmail: req.body.userEmail,
    });
    if (!isEmailExist) {
      res.status(404).json({
        success: false,
        message: "User with this email is not found",
      });
    } else {
      const isMatch = await bcrypt.compare(
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
          message: "Invalid user password",
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

//user forgot password
const forgotPassword = async (req, res) => {
  try {
    const isEmailExist = await userModel.findOne({
      userEmail: req.body.userEmail,
    });
    if (isEmailExist) {
      const token = jwt.sign(
        { userId: isEmailExist._id },
        process.env.SECRET_KEY,
        { expiresIn: "15m" }
      );
      sendEmail(req.body.userEmail, isEmailExist._id, token);
      res.status(200).json({
        success: true,
        message: "Email send successfully",
        token: token,
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

//reset password
const resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const isUserExist = await userModel.findById(req.params.id);
    if (isUserExist) {
      jwt.verify(req.params.token, process.env.SECRET_KEY);
      if (newPassword === confirmPassword) {
        const userPass = await bcrypt.hash(newPassword, 10);
        await userModel.findByIdAndUpdate(isUserExist._id, {
          $set: { userPassword: userPass },
        });
        res.status(202).json({
          success: false,
          message: "Password updated successfully",
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Password not match",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error occured " + err.message,
    });
  }
};

// change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const isUserExist = await userModel.findById(req.params.id);
    if (isUserExist) {
      const isMatch = await bcrypt.compare(
        currentPassword,
        isUserExist.userPassword
      );
      if (isMatch && newPassword === confirmPassword) {
        const password = await bcrypt.hash(newPassword, 10);
        const updatePassword = await userModel.findByIdAndUpdate(
          req.params.id,
          {
            userPassword: password,
          }
        );
        await updatePassword.save();
        res.status(202).json({
          success: true,
          message: "User password upadated sucessfully",
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Password not match",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error occured " + err.message,
    });
  }
};

//user data update
const userDetailsUpdate = async (req, res) => {
  try {
    const isUserExist = await userModel.findById(req.params.id);
    if (isUserExist) {
      const upadatedUser = await userModel.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.status(202).json({
        success: true,
        message: "User details updated sucessfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error occured " + err.message,
    });
  }
};

//user logout
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

module.exports = {
  userSignup,
  userLogin,
  forgotPassword,
  resetPassword,
  userLogout,
  changePassword,
  userDetailsUpdate,
};

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
