import { execSync } from "child_process";

console.log("To build or not to build, that is the question...");

const lastCommitMessage = execSync("git log -1 --pretty=%B").toString();
console.log(`Last commit message: ${lastCommitMessage}`);

const processed = lastCommitMessage
  .trim()
  .toLowerCase()
  .replaceAll(" ", "")
  .replaceAll("'", "");

const phrases = [
  "donotbuild",
  "dontbuild",
  "donotdeploy",
  "dontdeploy",
  "ignorebuild",
  "ignoredeploy",
  "ignoredeployment",
];

const isToBuild = phrases.some((phrase) => {
  return processed.includes(phrase);
});
if (isToBuild) {
  console.log("...the answer is to not build!");
  process.exitCode = 0;
}

console.log("...the answer is to build!");
process.exitCode = 1;
