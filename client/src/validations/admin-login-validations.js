import isEmail from "validator/lib/isEmail";

export const adminLoginValidate = (email, password) => {
  const newError = {};

  if (!email?.trim() || !password?.trim()) {
    newError.all = "ข้อมูลไม่ครบถ้วน";
    return newError;
  }

  if (!isEmail(email)) {
    newError.email = "อีเมลไม่ถูกต้อง";
    return newError;
  }

  if (password.length < 12) {
    newError.password = "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
    return newError;
  }

  return newError;
};
