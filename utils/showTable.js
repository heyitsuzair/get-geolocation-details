import cliTable from "cli-table";
import showFooter from "./showFooter.js";
import chalk from "chalk";
/**
 * @function showTable
 *
 * Show table in console with given data
 *
 * @param {object} cetails
 */
export default async function showTable(details) {
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
}
