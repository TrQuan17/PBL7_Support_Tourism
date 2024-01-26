require('dotenv').config()

const cloudinary = require('cloudinary').v2
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const uploadImageCloud = async(path) => {
    try {
        const imageUpload = await cloudinary.uploader.upload(path, {
            folder: process.env.FOLDERSAVECLOUD,
            format: 'auto',
            overwrite: true,
            quality: 'auto:eco'
        })
    
        fs.unlinkSync(path)
        return imageUpload.secure_url
    }
    catch(err) {
        return null;
    }
}

const uploadMultiImagesCloud = async (paths) => {
    try {
        const urls = []
        
        for (let element of paths) {
            const imageUpload = await cloudinary.uploader.upload(element, {
                folder: process.env.FOLDERSAVECLOUD,
                format: 'auto',
                overwrite: true,
                quality: 'auto:eco'
            })
        
            fs.unlinkSync(element)
            urls.push(imageUpload.secure_url)
        }

        return urls
    }
    catch(err) {
        console.log(err)
        return [];
    }
}

module.exports = {
    uploadImageCloud,
    uploadMultiImagesCloud
}