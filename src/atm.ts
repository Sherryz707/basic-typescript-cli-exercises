#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
interface userAccount {
  userName: string;
  email: string;
  password: string;
}

let userNames = ["anonZ"];
let userEmails = ["anonZ@gmail.com"];
let userDB: userAccount[] = [];
let user1: userAccount = {
  userName: "anonZ",
  email: "anonZ@gmail.com",
  password: "sedzAnon",
};
userDB.push(user1);

async function Welcome() {
  let welcome = chalkAnimation.neon("Welcome to the PANA-ATM!");
  await sleep();
  welcome.stop();
  console.log(
    `Kindly sign up so you may get full access to all the features of our Atm.`
  );
}

async function signUp() {
  let userData: userAccount;
  let signup = false;
  while (!signup) {
    try {
      userData = await inquirer.prompt([
        {
          name: "userName",
          type: "input",
          message: "Enter your username: ",
        },
        {
          name: "email",
          type: "input",
          message: "Enter your email: ",
        },
        {
          name: "password",
          type: "input",
          message: "Enter your password: ",
        },
      ]);
        if (checkDuplicates(userData)) {
            userDB.push(userData);
      }
    } catch (err) {
      console.error(err);
    }
  }
}
function checkDuplicates(userData: userAccount) {
    userDB.forEach(function (user) {
    if (user.email === userData.email) {
      throw "This email is already in use. Try another one";
    }
    if (user.userName === userData.userName) {
      throw ("This username is already in use. Try another one");
    }
    if (userData.password.length < 5) {
      throw "Password must contain at least 5 characters.";
      } 
  });
    return true;
}
await signUp();
