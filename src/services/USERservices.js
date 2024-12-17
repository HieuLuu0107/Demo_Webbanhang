import bcrypt from "bcryptjs";
import db from "../models/index";

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExit = await checkUserEmail(email);
      if (isExit) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "passWord"],
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.passWord);
          //let check = true;
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "ok";
            delete user.passWord;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "Your email has lost, try other email";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "Wrong email, try again ";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  checkUserEmail: checkUserEmail,
};
