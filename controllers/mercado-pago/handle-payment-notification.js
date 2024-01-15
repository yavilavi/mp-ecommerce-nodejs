export const handlePaymentNotification = (req, res)=>{
    console.log(JSON.stringify(req.body, null, 2))
    res.send("notification received");
}