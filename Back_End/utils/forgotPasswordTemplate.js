const forgotPasswordTemplate = (name,otp) =>{
    return `
    <div>
    <p>Dear, ${name}</p>
    <div>
    <p> You're requested a password reset. please use following OTP to reset your password</p>
    <div style={backgroud:yellow; font-size:20px}>
        ${otp}
    </div>
    <p> This otp is valid for 1 hour only. Enter this otp in the BuYIT website to proceed with resetting your password </p>
    <p> Thanks </p>
    <p> BuYIT</p>
    </div>
    </div>
    `
}

export default forgotPasswordTemplate;