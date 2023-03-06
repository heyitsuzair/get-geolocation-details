#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { exec } from "child_process";
import axios from "axios";
import { config } from "dotenv";
import cliTable from "cli-table";

config();

let localIp;

const getPublicIP = () => {
  exec("curl ip-adresim.app", function (error, stdout, stderr) {
    if (error) return;
    localIp = stdout;
    askIp();
  });
};

const welcome = () => {
  console.log(chalk.bgBlue(`get-geolocation-details 1.0.4 by Muhammad Uzair`));
};

// Get IP Address Of User
const askIp = async () => {
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
};
/**
 * @function getIpDetails
 *
 * Get The Details of the IP Address From API
 *
 * @param {string} ip
 */
const getIpDetails = async (ip) => {
  const spinner = createSpinner("Fetching Details...").start();

  try {
    const { data } = await axios.get(
      `http://api.ipapi.com/api/${ip}?access_key=${process.env.ACCESS_KEY}`
    );
    spinner.stop();
    if (!data.ip) {
      spinner.stop();
      spinner.error({ text: data.error.info });
      process.exit(1);
    }
    console.clear();
    showTable(data);
  } catch ({ message }) {
    spinner.stop();
    spinner.error({ text: message });
    process.exit(1);
  }
};
/**
 * @function showTable
 *
 * Show table in console with given data
 *
 * @param {object} cetails
 */
const showTable = async (details) => {
  const table = new cliTable({
    head: [chalk.yellow("Location Information"), chalk.yellow("Result")],
  });

  let languages = "";

  for (let i = 0, j = 0; i < details.location.languages.length; i++) {
    languages += details.location.languages[i].name;
    j = i;
    if (j++ === details.location.languages.length - 1) break;
    else languages += ", ";
  }

  table.push(
    { "Continent Code": details.continent_code },
    { "Continent Name": details.continent_name },
    { "Country Name": details.country_name },
    { "Region Name": details.region_name },
    { Languages: languages },
    { City: details.city },
    { ZIP: details.zip },
    { Latitude: details.latitude },
    { Longitude: details.longitude },
    { Capital: details.location.capital }
  );

  console.log(table.toString());
  showFooter();
};
const showFooter = () => {
  console.log(
    chalk.blueBright(
      "Star the repo: https://github.com/heyitsuzair/get-geolocation-details"
    )
  );
  console.log(
    chalk.blueBright("Connect with me: https://linkedin.com/in/uzair-dev")
  );
};
welcome();
getPublicIP();
