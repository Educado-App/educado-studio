const requireLogin = require('../middlewares/requireLogin');
const aws = require('aws-sdk');
const keys = require('../config/keys');


module.exports = (app) => {
app.get('/sign-s3',async (req,res) => {
  console.log("et eller andet fucking random, en eller anden streng");
    const s3 = new aws.S3({
        region: "eu-central-1",
        accessKeyId: keys.awsAccessKey,
        accessSecretKey: keys.awsSecretAcessKey
    });
/*     const fileName = req.query['file-name'];
    const fileType = req.query['file-type']; */
    const s3Params = {
      Bucket: keys.s3Bucket,
      Key: 'violen.jpg',
//      Expires: 60,
//      ContentType: fileType,
//      ACL: 'public-read'
    };

    try {
      const data = await s3.getObject( s3Params ).promise(); 
      console.log(data);
    } catch (e) {
      console.log(e);
    }
});
}
  
/*     s3.getObject( s3Params, (err, data) => {
        console.log(data); */
/*       if(err){
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      res.write(JSON.stringify(returnData));
      res.end(); */