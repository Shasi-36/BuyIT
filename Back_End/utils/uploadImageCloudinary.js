import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUDNAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET_KEY
})
const uploadImageClodinary = async (image)=>{
    const buffer=image?.buffer ||  Buffer.from(await image.arrayBuuffer)

    const uploadImage = await new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({folder:"BuYIT"},(error,uploadResult)=>{
            return resolve(uploadResult)
        }).end(buffer)
    })
    return uploadImage
}

export default uploadImageClodinary