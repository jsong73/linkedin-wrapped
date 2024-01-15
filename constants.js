const CONSTANTS={
    PORT:3001,
    callbackUrlDomain:'http://localhost',
    callbackUrl:'/auth/linkedin/callback',
    authUrl:'/auth/linkedin',
    successUrl:'/',
    failureUrl:'/login',
    linkedInScopes: ["openid", "profile", "email"],
    strategy:'linkedin'
    }
    
    module.exports=CONSTANTS;