const JWT = require('jsonwebtoken');


const authenticate = (req, res, next) => {

    // console.log(req)

    console.log(req.cookies.authToken)
    const token = req.cookies.authToken


    // const token = req.headers.cookie

    // console.log(req.headers.cookie)

    console.log(token)

    if(!token){
        return res.status(401).json({
            message: 'User not authenticated'
        })
    }

    
    try {
        const verified = JWT.verify(token, process.env.JWT_SECRET)
        if(!verified){
            return res.status(400).json({
                message: "invalid token"
            })
        }
        req.user = verified;
        next()
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }

}

module.exports = authenticate