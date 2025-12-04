import jwt from 'jsonwebtoken'

const adminAuth = (req,res,next)=>{
         try {
            const {token} = req.headers

             if (!token) {
                return res.json({sucess:"false" , msg:"NOT AUTHORISED LOGIN AGAIN"})
                }
            const token_decode = jwt.verify(token , process.env.JWT_SECRET_KEY)
             if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
                return res.json({sucess:"false" , msg:"NOT AUTHORISED"})
             }
             next()
         } catch (error) {
            console.log(error)
            res.json({sucess:false , message:error.message})
         }
}

export default adminAuth