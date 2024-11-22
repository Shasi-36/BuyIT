const verifyEmailTemplate= ({name,url})=>{
    return `
    
    <p> Dear ${name}</p>
    <p> Thank you Registering BuyIT</p>

    <a href=${url} style="color:white;backgroundcolor:blue;margin-top:10px">
    Verify Email
    </a>
    
    `
}

export default verifyEmailTemplate;