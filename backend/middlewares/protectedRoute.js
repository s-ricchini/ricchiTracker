import jwt from "jsonwebtoken";

export default function protectedRoute(req, res, next) {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.session = payload;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
}