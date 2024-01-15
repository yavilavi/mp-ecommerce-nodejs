export const handleInstantPaymentNotification = (req, res)=>{
    console.log(JSON.stringify(req.body, null, 2))
    res.send("notification received");
}