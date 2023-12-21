const router = require("express").Router();
const axios = require("axios");

router.post('/upload-image', async (req, res) => {
    const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const cloudinaryPresetKey = 'wgh4ayc3';
    const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;

    const formData = new FormData();
    formData.append('file', req.body.file);




    try {
        const cloudinaryRes = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload?api_key=${cloudinaryApiKey}&upload_preset=${cloudinaryPresetKey}`,
            formData
        );
        console.log("THIS IS FORMDATA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", formData)

        res.json(cloudinaryRes.data);

    } catch (error) {
        console.error("Cloudinary post error", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;