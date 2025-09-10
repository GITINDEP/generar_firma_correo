const jwt = require('jsonwebtoken');

const noCache = (req, res, next) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate, private',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Last-Modified': new Date().toUTCString()
  });
  next();
};

const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken;
    
    if (!token) {
        return res.redirect('/')
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        req.user = decoded;
        next();
    } catch (error) {
        return   res.redirect('/')
    }
};

module.exports = {
    noCache,
    verifyToken
}