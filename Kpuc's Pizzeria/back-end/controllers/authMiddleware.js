const jwt = require("jsonwebtoken");
const secretKey = "Kpuc's-pizzeria";

const authMiddleware = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, secretKey);

    // Attach the user object to the request
    req.user = decoded;

    // Call the next middleware
    next();
  } catch (err) {
    console.log("Error decoding token: " + err);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
