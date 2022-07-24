import {
  readdirSync,
  readFileSync,
  accessSync,
  constants,
  writeFileSync,
} from "fs";
import { cwd, exit } from "process";
import intersection from "lodash.intersection";

// Multiple input files required (output of the elven-tools collection-nft-owners)
// Example of a single file:
// [
//   {
//     "owner": "erd1fz05226fmg8m964pxg208v8vupvj27n642tarnu346099c7fwpzsnq5r4j",
//     "tokens": [
//       {
//         "identifier": "EAPES-8f3c1f-1ca2",
//         "metadataFileName": "7329"
//       },
//       {
//         "identifier": "EAPES-8f3c1f-1bf9",
//         "metadataFileName": "7160"
//       }
//     ],
//     "tokensCount": 2
//   }
// ]

const baseDir = cwd(); // It will be the 'data' directory
const inputDir = `${baseDir}/input`;
const outputDir = baseDir;

try {
  accessSync(inputDir, constants.R_OK | constants.W_OK);
} catch (e) {
  console.log(e.message);
  console.log(
    "\nThere are problems with accessing the 'data/input' directory.\n"
  );
  exit(9);
}

const fileNames = readdirSync(inputDir);

const fileContents = [];

if (fileNames && fileNames.length > 0) {
  for (const fileName of fileNames) {
    fileContents.push(
      JSON.parse(readFileSync(`${inputDir}/${fileName}`, { encoding: "utf8" }))
    );
  }

  const fileContentsOnlyAddresses = [];

  for (const singleFileArray of fileContents) {
    fileContentsOnlyAddresses.push(singleFileArray.map((item) => item.owner));
  }

  if (fileContentsOnlyAddresses && fileContentsOnlyAddresses.length > 0) {
    const intersectionOutput = intersection(...fileContentsOnlyAddresses);

    const intersectionFullData = [];
    const fileContentsFlatten = fileContents.flat();

    for (const address of intersectionOutput) {
      intersectionFullData.push(
        fileContentsFlatten.find((item) => item.owner === address)
      );
    }

    writeFileSync(
      `${cwd()}/output.json`,
      JSON.stringify(intersectionFullData, null, 2)
    );

    console.log("Saved the output to the JSON file: data/output.json");
  }
} else {
  console.log("\nThere are no files in the 'data/input' directory.");
}
