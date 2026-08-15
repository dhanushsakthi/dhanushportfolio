import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'jyz3fn5r',
  api_key: process.env.CLOUDINARY_API_KEY || '928292539864148',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'WKAgpmJgKZKRmstX8b7j3shxFTk',
  secure: true,
});

export default cloudinary;
