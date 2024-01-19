
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.headers['authorization']; 
    
    try {
        const decoded = jwt.verify(token,process.env.EVENTUM_SECRATE_KEY,);
        req.userdata = decoded
    }catch(error){
        return res.status(401).json({
            message: 'Invalid authentication token'
        });
    }
    next();
}
