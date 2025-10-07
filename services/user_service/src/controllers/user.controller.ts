import { publishToQueue } from "../config/rabbitMQ.js";
import RedisConnection from "../config/redis.js";
import { User } from "../model/user.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateToken } from "../utils/generateToken.js";


export const loginUserController = asyncHandler(async(req , res) => {
    const {email} = req.body;
    console.log("email",email)

    const rateLimitKey = `otp:ratelimit:${email}`;
    const redisClient = RedisConnection.getInstance().getClient();
    const rateLimit = await redisClient.get(rateLimitKey);
    console.log("ratelimit",rateLimit);
    if(rateLimit){
       res.status(429).json({
         success : false,
         message : "Too Many Requests, Please wait..."
       });
       return;
    }

    // Now if rate limit is not there , create the OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpKey = `otp:${email}`;
    await redisClient.set(otpKey , otp , {
        EX : 300
    });

    await redisClient.set(rateLimitKey , "true" , {
        EX : 60
    });

    const message = {
        to : email,
        subject : "Your OTP code",
        body : `Your OTP is ${otp}. It is valid for 5 min.`
    };

    await publishToQueue(process.env.RABBIT_MQ_QUEUE as string, message);

    res.status(200).json({
        success : true,
        message : "OTP sent to your email"
    });
    return;

})


export const verifyUserController = asyncHandler(async (req,res) => {
     const {email , otp: userEnteredOtp} = req.body;

     if(!email){
        res.status(400).json({
            success : false,
            message : "Email is required"
        });
        return;
     }

     if(!userEnteredOtp){
        res.status(400).json({
            success : false,
            message : "OTP is required"
        })
        return;
     }

     const redisClient = RedisConnection.getInstance().getClient();
     const otpKey = `otp:${email}`;

     const redisStoredOtp = await redisClient.get(otpKey);
     console.log(userEnteredOtp,redisStoredOtp);

     if(!redisStoredOtp){
        res.status(400).json({
            success : false,
            message : "Please Send OTP again"
        });
        return;
     }

     if(Number(userEnteredOtp) !== Number(redisStoredOtp)){
        res.status(400).json({
            success : false,
            message : "Invalid OTP"
        });
        return;
     }

     // delte the otp from redis
     await redisClient.del(otpKey);

     let user = await User.findOne({email});

     if(!user){
        const name = email.slice(0,8);
        user = await User.create({
            email,name
        });
     }

     const token  = await generateToken(user);

     res.status(200).json({
        success : true,
        message : "Verification Successful",
        user,
        token
     });
     return;
})