import axios from "axios";
import { createSpinner } from "nanospinner";
import showTable from "./showTable.js";

/**
 * @function getIpDetails
 *
 * Get The Details of the IP Address From API
 *
 * @param {string} ip
 */
export default async function getIpDetails(ip) {
  const spinner = createSpinner("Fetching Details...").start();

  try {
    const { data } = await axios.get(
      `http://api.ipapi.com/api/${ip}?access_key=781724a7accdd2193aa0e99163713172`
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
}
