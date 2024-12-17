import db from "../models/index";
import CRUDservices from "../services/CRUDservices";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    // console.log('-----------------------')
    // console.log(Data)
    // console.log('-----------------------')
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDservices.createNewUsers(req.body);
  console.log(message);
  return res.send("post curd from server");
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDservices.getAllUser();
  console.log("-----------------------------");
  console.log(data);
  console.log("-----------------------------");

  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  console.log(userId);
  if (userId) {
    let userData = await CRUDservices.getUserInfoById(userId);
    // console.log('------------------------')
    // console.log(userData)
    // console.log('------------------------')
    // return res.send('found the users');
    return res.render("editCRUD.ejs", {
      user: userData,
    });
  } else {
    return res.send("user not found");
  }
};
let putCRUD = async (req, res) => {
  let data = req.body;
  let allUser = await CRUDservices.updateUserData(data);
  return res.render("displayCRUD.ejs", {
    dataTable: allUser,
  });
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDservices.deleteUserById(id);
    return res.send("Delete the user sussess!");
  }

  return res.send("Delete false");
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
