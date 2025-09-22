import multer from "multer";

const storage = multer.memoryStorage(); // or diskStorage if you want files saved
export const upload = multer({ storage });
