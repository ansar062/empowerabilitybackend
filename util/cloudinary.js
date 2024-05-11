
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: "du1fnqemp",
  api_key: "623478979569544",
  api_secret: "-0Zm6LU7abqqvV7cXDlkwZHPI0Y",
});

module.exports = cloudinary;
// const uploadOnCloudinary = async (path, public_id) => {
//   try {
//     if (path != null) {
//       await cloudinary.uploader.upload(
//         path,
//         { public_id: public_id, resource_type: "auto" },
//         function (error, result) {
//           console.log(result);
//         }
//       );
//     }
//   } catch (error) {
//     fs.unlinkSync(path);

//     console.log(error);
//   }
// };


