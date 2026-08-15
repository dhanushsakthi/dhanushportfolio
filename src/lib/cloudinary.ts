import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'bf8afjz2',
  api_key: process.env.CLOUDINARY_API_KEY || '335517351621198',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'XkpX59qRJIFCM6bmuicsYa2Scvg',
  secure: true,
});

export default cloudinary;
