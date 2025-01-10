const express = require('express')
const { addDoer, editDoer, deleteDoer } = require('../Controler/addDoer')
const { taskDelegation } = require('../Controler/taskDelegation')
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const otpSchema = require('../model/otpModule')


const { v2: cloudinary } = require("cloudinary");
const multer = require("multer");
const { taskDashboard } = require('../Controler/taskDashboard');
const changeStatus = require('../Controler/changeStatus');
const addRevision = require('../Controler/addRevision');
const notCompleted = require('../Controler/notCompleted');
const getDoer = require('../Controler/getDoer');
const otpModule = require('../model/otpModule');
const authenticate = require('../utils/authenticate');
const registeradmin = require('../Controler/registeradmin');
const adminlogin = require('../Controler/adminlogin');
const adminschema = require('../model/adminschema');
const doesSchema = require('../model/doesSchema');
// const { CloudinaryStorage } = require("multer-storage-cloudinary");





const router = express.Router()

const otpStore = {};


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};







router.post('/add-Doer', authenticate, addDoer)
  .post('/edit-Doer', authenticate, editDoer)
  .post('/delete-Doer', authenticate, deleteDoer)
  .post('/taskDelegation', authenticate, taskDelegation)
  .post('/changeStatus', authenticate, changeStatus)
  .post('/addRevision', authenticate, addRevision)
  .get('/taskDashboard', taskDashboard)
  .get('/notCompleter', notCompleted)
  .get('/getDoer', getDoer)
  .post('/registeradmin', registeradmin)
  .post('/adminLogin', adminlogin)
  .post('/send-otp', async (req, res) => {
    const { email } = req.body;


    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }



    const otp = generateOTP();
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    try {
      let admin = await adminschema.findOne({ email });
      let role = "admin";

      if (!admin) {
        admin = await doesSchema.findOne({ email });
        role = "doer";
      }
      if (!admin) {
        return res.status(404).json({ message: 'User not found' });
      }

      // console.log(admin)

      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
      });

      const data = new otpSchema({
        email,
        otp
      })
      data.save()
      res.status(200).json({ message: 'OTP sent successfully!', });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send OTP', details: error.message });
    }
  })
  .post('/verity-otp', async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
    }

    try {

      const emailindb = await otpModule.findOne({ email: email })
      let admin = await adminschema.findOne({ email });
      let role = "admin";

      if (!admin) {
        admin = await doesSchema.findOne({ email });
        role = "doer";
      }

      if (!email) {
        return res.status(401).json({
          message: "email not found"
        })
      }

      // console.log(admin)


      let check = emailindb.otp === otp

      if (!check) {
        return res.status(404).json({
          message: "otp not match"
        })
      }
      const token = jwt.sign({ email, id:admin._id, role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        // secure:true,
        maxAge: 60 * 60 * 1000,
        sameSite: 'Strict',
      });

      //   console.log(token)
      res.status(200).json({ message: 'Login successful!', token });

      await emailindb.deleteOne();

    } catch (error) {
      res.status(500).json({ error: 'error', details: error.message });
    }
  })





module.exports = router