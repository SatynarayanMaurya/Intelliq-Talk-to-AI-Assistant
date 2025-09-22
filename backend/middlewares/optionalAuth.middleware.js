
import jwt from "jsonwebtoken"

export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
      } catch (err) {
        console.log("Invalid token:", err.message);
      }
    }

    next(); 
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};
