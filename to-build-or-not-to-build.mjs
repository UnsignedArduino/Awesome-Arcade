import { execSync } from "child_process";

console.log("To build or not to build, that is the question...");

const lastCommitMessage = execSync("git log -1 --pretty=%B").toString();
console.log(`Last commit message: ${lastCommitMessage}`);

const processed = lastCommitMessage
  .trim()
  .toLowerCase()
  .replaceAll(" ", "")
  .replaceAll("'", "");

if (processed.includes("donotbuild") || processed.includes("dontbuild")) {
  console.log("...the answer is to not build!");
  process.exitCode = 0;
}

console.log("...the answer is to build!");
process.exitCode = 1;
