import askIp from "./askIP.js";
import { exec } from "child_process";

export default function getPublicIP() {
  exec("curl ip-adresim.app", function (error, stdout, stderr) {
    if (error) return;
    askIp(stdout);
  });
}
