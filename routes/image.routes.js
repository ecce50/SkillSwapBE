const router = require("express").Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const User = require("../models/User.model"); // Import your User model
const Class = require("../models/Class.model"); // Import your Class model

// Set up multer to handle form data
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload-image", upload.single("file"), async (req, res) => {
  console.log("Multer file: ", req.file);

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Extract classId and userId from the request body
  const { classId, userId } = req.body;

  try {
    const uploadResult = await cloudinary.uploader
      .upload_stream(
        { resource_type: "image", upload_preset: "wgh4ayc3" },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary post error", error);
            return res.status(500).json({
              error: "Internal Server Error",
              message: error.message,
            });
          } else {
            // Determine where to update the imageURL based on imageType
            if (req.body.imageType === "user") {
              await updateUserImage(userId, result.secure_url);
            } else if (req.body.imageType === "class") {
              await updateClassImage(classId, result.secure_url);
            }

            res.json(result);
          }
        }
      )
      .end(req.file.buffer);
  } catch (error) {
    console.error("Cloudinary post error", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

async function updateUserImage(userId, imageUrl) {
  try {
    // Update user document with the imageUrl
    await User.findByIdAndUpdate(userId, { imageURL: imageUrl });
    console.log(
      "image.routes: User image updated successfully. User ID: ",
      userId
    );
  } catch (error) {
    console.error("image.routes: Error updating user image:", error);
    throw error; // You can handle the error as per your application's requirements
  }
}

async function updateClassImage(classId, imageUrl) {
  try {
    // Update class document with the imageUrl
    await Class.findByIdAndUpdate(classId, { imageURL: imageUrl });
    console.log(
      "image.routes: Class image updated successfully. Class ID: ",
      classId
    );
  } catch (error) {
    console.error("image.routes: Error updating class image:", error);
    throw error; // You can handle the error as per your application's requirements
  }
}

module.exports = router;

// router.post("/upload-image", upload.single("file"), async (req, res) => {
//   console.log("Multer file: ", req.file);

//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });

//   try {
//     const result = await cloudinary.uploader
//       .upload_stream(
//         { resource_type: "image", upload_preset: "wgh4ayc3" },
//         async (error, result) => {
//           if (error) {
//             console.error("Cloudinary post error", error);
//             res
//               .status(500)
//               .json({ error: "Internal Server Error", message: error.message });
//           } else {
//             res.json(result);
//           }
//         }
//       )
//       .end(req.file.buffer);
//   } catch (error) {
//     console.error("Cloudinary post error", error);
//     res
//       .status(500)
//       .json({ error: "Internal Server Error", message: error.message });
//   }
// });

// module.exports = router;
