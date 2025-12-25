import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ success: false, message: "Not Authorized" });
    }

    const atoken = authHeader.split(" ")[1]; // ambil token doang

    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.json({ success: false, message: "Access denied" });
    }

    req.adminId = decoded.id;
    next();

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
