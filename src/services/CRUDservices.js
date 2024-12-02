import bcrypt from 'bcryptjs';
import db from "../models/index";

import e from 'express';
import { raw } from 'body-parser';
import { where } from 'sequelize';
const salt =bcrypt.genSaltSync(10);

let createNewUsers = async(data) =>{
    return new Promise(async(resolve, reject)=>{
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                passWord: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                typeRole: data.typeRole,
            })

            resolve('ok! create new user success!')

        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            let hashPassword = await bcrypt.hashSync(password,salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }

    })
}

let getAllUser = () =>{

    return new Promise((resolve,reject)=>{
        try {
            let users =db.User.findAll({
                raw:true,
            });
            resolve(users)
            
        } catch (e) {
            reject(e)
        }
    })
}

let getUserInfoById = (userId) =>{
    return new Promise(async (resolve, reject)=>{
        try {
            let user = await db.User.findOne({
                where:{id: userId},
                raw: true,
            })
            if(user){
                resolve(user);
            }
            else{
                resolve([])
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData=(data)=>{
    console.log('data from sevire')
    console.log(data)
}

module.exports={
    createNewUsers:createNewUsers,
    getAllUser:getAllUser,
    getUserInfoById:getUserInfoById,
    updateUserData:updateUserData,
}