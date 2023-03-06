import inquirer from "inquirer";
import chalk from "chalk";
import getIpDetails from "./getIPDetails.js";

// Get IP Address Of User
export default async function askIp(localIp) {
  const input = await inquirer.prompt({
    name: "ipInput",
    type: "input",
    prefix: "$",
    message: `${chalk.greenBright("Enter Any IP Address:")}`,
    default: () => {
      return localIp;
    },
  });
  getIpDetails(input.ipInput);
}
