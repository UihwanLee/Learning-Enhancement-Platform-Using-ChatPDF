"use strict";
require('dotenv').config();

const express = require('express');
const router = express.Router();

const userRouter = require('../controller/user/route');
const authRouter = require('../controller/auth/route');
const promptRouter = require('../controller/prompt/route');
const roomRouter = require('../controller/room/route');

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/room", roomRouter);
router.use("/prompt", promptRouter);



module.exports = router;