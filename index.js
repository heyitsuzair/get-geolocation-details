#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import { exec } from "child_process";

let ip;
let localIp;

const getPublicIP = () => {
  exec("curl ip-adresim.app", function (error, stdout, stderr) {
    if (error) return;
    localIp = stdout;
    askIp();
  });
};

const welcome = () => {
  console.log(chalk.bgBlue(`get-geolocation-details 1.0.0 by Muhammad Uzair`));
};

const askIp = () => {
  const ipInput = inquirer.prompt({
    name: "ipInput",
    type: "input",
    prefix: ">",
    message: `${chalk.greenBright("Enter Any IP Address")}`,
    default: () => {
      return localIp;
    },
  });
  ip = ipInput.ipInput;
};
welcome();
getPublicIP();
