import jwt from 'jsonwebtoken'

const authUser = async (req,res,next)=>{
     const {token} = req.headers
    // console.log("thee token is" ,token)
    if (!token) {
      return  res.json({success:false ,message:"not Authorized login again"})
    }

    try {
            const decode_token = jwt.verify(token , process.env.JWT_SECRET_KEY )
            req.body.userId = decode_token.id
            next()

    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    }
}

export default authUser