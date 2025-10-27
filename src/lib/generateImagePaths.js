// import fs from "fs";
// import path from "path";

// const baseDir = path.join(process.cwd(), "public", "images");

// function getAllImages(dir, prefix = "/images") {
//   let results = [];
//   const files = fs.readdirSync(dir);

//   for (const file of files) {
//     const filePath = path.join(dir, file);
//     const stat = fs.statSync(filePath);

//     if (stat.isDirectory()) {
//       // Recursively read subdirectories
//       results = results.concat(getAllImages(filePath, `${prefix}/${file}`));
//     } else {
//       // Add file path with relative prefix
//       results.push(`${prefix}/${file}`);
//     }
//   }

//   return results;
// }

// const imagePaths = getAllImages(baseDir);

// // Print or write to JSON
// console.log(imagePaths);

// // Optionally save it to a JSON file
// fs.writeFileSync("imagePaths.json", JSON.stringify(imagePaths, null, 2));

// console.log("✅ Image paths saved to imagePaths.json");



const fs = require("fs");
const path = require("path");

const baseDir = path.join(process.cwd(), "public", "images");

function getAllImages(dir, prefix = "/images") {
  let results = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(getAllImages(filePath, `${prefix}/${file}`));
    } else {
      results.push(`${prefix}/${file}`);
    }
  }

  return results;
}

const imagePaths = getAllImages(baseDir);

console.log(imagePaths);

fs.writeFileSync("imagePaths.json", JSON.stringify(imagePaths, null, 2));
console.log("✅ Image paths saved to imagePaths.json");
