
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.headers['authorization']; 
    try {
        const decoded = jwt.verify(token,process.env.EVENTUM_SECRATE_KEY,);
        req.userdata = decoded
        if (decoded.role !== 'ADMIN') {
            return res.status(400).json({
                message : 'Invalid access'
            })
        }
    }catch(error){
        return res.status(401).json({
            message: 'Invalid authentication token'
        });
    }
    next();
}