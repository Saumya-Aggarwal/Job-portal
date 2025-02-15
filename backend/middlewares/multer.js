import multer from "multer";
const storage = multer.memoryStorage();
export const uploadMiddleware = multer({ storage }).fields([
    { name: "file", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]);
  
