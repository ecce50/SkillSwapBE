const router = require("express").Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2; // Make sure to install cloudinary package

// Set up multer to handle form data
const storage = multer.memoryStorage()

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Your file filter logic, if needed
    cb(null, true);
  },
});

router.post("/upload-image", upload.single("file"), async (req, res) => {
  console.log("Multer file: ", req.file);

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const result = await cloudinary.uploader
      .upload_stream(
        { resource_type: "image", upload_preset: "wgh4ayc3" },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary post error", error);
            res
              .status(500)
              .json({ error: "Internal Server Error", message: error.message });
          } else {
            res.json(result);
          }
        }
      )
      .end(req.file.buffer);
  } catch (error) {
    console.error("Cloudinary post error", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

module.exports = router;

// const router = require("express").Router();
// const axios = require("axios");

// router.post('/upload-image', async (req, res) => {
//     const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
//     const cloudinaryPresetKey = 'wgh4ayc3';
//     const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;

//     const formData = new FormData();
//     formData.append('file', req.body.file);

//     try {
//         const cloudinaryRes = await axios.post(
//             `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload?api_key=${cloudinaryApiKey}&upload_preset=${cloudinaryPresetKey}`,
//             formData
//         );
//         console.log("THIS IS FORMDATA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", formData)

//         res.json(cloudinaryRes.data);

//     } catch (error) {
//         console.error("Cloudinary post error", error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

module.exports = router;
