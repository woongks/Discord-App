const express = require("express");
const authControllers = require("../controllers/auth/authControllers");
const auth = require("../middleware/auth");
const router = express.Router();
const Joi = require("joi"); // 라우트에서 데이터 검증을 실시
// Joi는 정규식으로 커스터마이즈가 가능하고 validation 메시지도 설정할 수 있다.
const validator = require("express-joi-validation").createValidator({});

const registerSchema = Joi.object({
  // 스키마를 만들어 준다.
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});
router.post(
  "/register",
  validator.body(registerSchema),
  authControllers.controllers.postRegister,
);

router.post(
  "/login",
  validator.body(loginSchema),
  authControllers.controllers.postLogin,
);

router.get("/test", auth, (req, res) => {
  res.send("request passed");
});
module.exports = router;
