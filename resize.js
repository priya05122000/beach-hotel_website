// const sharp = require("sharp");

// sharp("public/file-1774848159661-53105578.webp")
//     // .resize(200, 2--, {
//     //     fit: "cover",
//     //     position: "centre",
//     // })
//     .webp({ quality: 75, effort: 6 })
//     .toFile("public/hdjkfh.webp")
//     .then(() => console.log("✅ Done"))
//     .catch(console.error);

// ---------------------------------------------------

//logos

const sharp = require("sharp");

sharp("public/home/hero-1.png")
    // .resize({
    //     width: 800,
    //     height: 1000,
    //     fit: "cover",
    //     // position: "top", // auto-focus important area
    // })
    .webp({
        quality: 90,
        effort: 6
    })
    .toFile("public/home/hero-1.webp")
    .then(() => console.log("✅ Done"))
    .catch(console.error);


// ----------------------------------------------------


// const sharp = require("sharp");

// sharp(
//     "public/images/objects/text-rotate.gif",
//     {
//         animated: true,
//         limitInputPixels: false,
//     }
// )

//     .resize({
//         width: 800,
//     })

//     .webp({
//         quality: 50,
//         effort: 6,
//     })

//     .toFile("public/images/objects/text-rotate.webp")

//     .then(() => console.log("✅ GIF compressed"))
//     .catch(console.error);


//  ----------------------------------------------------

// const sharp = require("sharp");
// const fs = require("fs");
// const path = require("path");

// const inputDir = "public/png";
// const outputDir = "public/changes";

// if (!fs.existsSync(outputDir)) {
//     fs.mkdirSync(outputDir, { recursive: true });
// }

// (async () => {
//     const files = fs.readdirSync(inputDir);

//     for (const file of files) {
//         const inputPath = path.join(inputDir, file);

//         if (!/\.(jpg|jpeg|png|webp)$/i.test(file)) {
//             continue;
//         }

//         // Remove spaces & special chars
//         const safeName = path
//             .parse(file)
//             .name
//             .trim()
//             .replace(/\s+/g, "-") // spaces -> -
//             .replace(/[^a-zA-Z0-9-_]/g, "") // remove special chars
//             .toLowerCase();

//         const outputPath = path.join(
//             outputDir,
//             `${safeName}.webp`
//         );

//         try {
//             await sharp(inputPath)
//                 .resize({
//                     width: 1600,
//                     height: 900,
//                     fit: "cover",
//                 })
//                 .webp({
//                     quality: 100,
//                     effort: 6,
//                 })
//                 .toFile(outputPath);

//             console.log(`✅ Converted: ${file}`);
//         } catch (err) {
//             console.error(`❌ Error: ${file}`, err);
//         }
//     }
// })();
