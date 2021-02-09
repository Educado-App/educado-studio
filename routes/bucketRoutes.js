const requireLogin = require('../middlewares/requireLogin');
const aws = require('aws-sdk');
const keys = require('../config/keys');
const fs = require('fs');
const folderLocation = ('s');
const fileName = ('test.txt');
const multer = require('multer');

let mulreq = multer();

module.exports = (app) => {
  app.get('/download-s3',requireLogin, async (req,res) => {
      aws.config.setPromisesDependency();
      aws.config.update({
      region: 'eu-central-1'
      })

      const s3 = new aws.S3();

      const {s3link} = req.query;

      const download = {
          Bucket: keys.s3Bucket,
          Key: s3link
        };

      try {
        const data = await s3.getObject( download ).promise(); 
        const encoded = data.Body.toString('base64');
        res.send({img: encoded});
      } catch (e) {
        console.log(e);
      }
  });

  app.post('/upload-s3', mulreq.single('file'), requireLogin, async (req, res) => {
    aws.config.update({
    region: 'eu-central-1'
    })

    if (!req.file){
      return res.status(500).send({msg: "File not found, ya daft bint"})
    }
    const myFile = req.file;
    
    const s3 = new aws.S3();
    
    const params = {
        Bucket: keys.s3Bucket,
        limit: 10000000,
        Key: Date.now() + '-' + req.file.originalname,
        Body: myFile.buffer
    };
    
    s3.upload(params, (err, result) => {
        if(err) {
          console.log("Error", err);
        } else {
          res.send({link: result.key});
        }
    });
  });

  app.get('/delete-s3',async () => {
        aws.config.update({
        region: 'eu-central-1'
        })
    
        const s3 = new aws.S3();

        const params = {
          Bucket: keys.s3Bucket,
          Key: folderLocation + '/' + fileName
        }

        s3.deleteObject(params, (err, data) => {
          if(err) {
            console.log("Error", err);
          } else {
            console.log("hopes deleted");
          }
        })
  });
};