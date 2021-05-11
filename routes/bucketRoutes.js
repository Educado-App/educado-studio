const requireLogin = require('../middlewares/requireLogin');
const aws = require('aws-sdk');
const keys = require('../config/keys');
const fs = require('fs');
const folderLocation = ('s');
const fileName = ('test.txt');
const multer = require('multer');
const mongoose = require('mongoose');
const Course = mongoose.model('courses');
const Component = mongoose.model('components');

let mulreq = multer();

module.exports = (app) => {
  app.get('/download-s3',requireLogin, async (req,res) => {
      aws.config.setPromisesDependency();
      aws.config.update({
      region: 'eu-central-1'
      })

      const s3 = new aws.S3();

      const {s3link} = req.query;
      let link;
      if (!s3link){
        res.send("no image found"); 
        return;
      }else{
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
      }     
  });

  app.get('/api/eml/download-s3', async (req,res) => {
    aws.config.setPromisesDependency();
    aws.config.update({
    region: 'eu-central-1'
    })

    const s3 = new aws.S3();

    const {s3link} = req.query;
    console.log(s3link);
    let link;
    if (!s3link){
      res.send("no image found"); 
      return;
    }else{
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
    }     
});

  app.get('/api/download-s3-image',requireLogin, async (req,res) => {
    aws.config.setPromisesDependency();
    aws.config.update({
    region: 'eu-central-1'
    })

    const s3 = new aws.S3();

    const {component_id} = req.query;

    console.log("Component ID:", component_id);


    const component = await Component.findById(component_id);

    let link = component.file;
  
    console.log("LINK HERE:",link);

    if (!link){
      res.send("no image found"); 
      return;
    }else{
      const download = {
        Bucket: keys.s3Bucket,
        Key: link
      };

    try {
      const data = await s3.getObject( download ).promise(); 
      const encoded = data.Body.toString('base64');
      res.send({img: encoded});
    } catch (e) {
      console.log(e);
    }
    }     
});

  app.post('/upload-s3', mulreq.single('file'), requireLogin, async (req, res) => {
    aws.config.update({
    region: 'eu-central-1'
    })

    if (!req.file){
      return res.status(500).send({msg: "File not found"})
    }
    const myFile = req.file;
    
    const {course_id} = req.query;

    const s3 = new aws.S3();
    
    const params = {
        Bucket: keys.s3Bucket,
        limit: 100000000,
        Key: Date.now() + '-' + req.file.originalname,
        Body: myFile.buffer
    };
    
    s3.upload(params, async (err, result) => {
        if(err) {
          console.log("Error", err);
        } else {
          (await Course.findOneAndUpdate({_id: course_id},{coverImg: result.key})).save;
          res.send({link: result.key});
        }
    });
  });

  app.post('/api/upload-s3-image', mulreq.single('file'), requireLogin, async (req, res) => {
    aws.config.update({
    region: 'eu-central-1'
    })

    if (!req.file){
      return res.status(500).send({msg: "File not found"})
    }
    const myFile = req.file;
    
    const {component_id} = req.query;

    const s3 = new aws.S3();
    
    const params = {
        Bucket: keys.s3Bucket,
        limit: 100000000,
        Key: Date.now() + '-' + req.file.originalname,
        Body: myFile.buffer
    };

    try {
      const stored = await s3.upload(params).promise();
      console.log("KEY FROM NEW THING:");
      console.log(stored.Key);
      (await Component.findOneAndUpdate({_id: component_id},{file: stored.Key})).save;
      res.send({link: stored.Key});
    } catch (err) {
      console.log(err)
    }
    
    // s3.upload(params, async (err, result) => {
    //     if(err) {
    //       console.log("Error", err);
    //     } else {
    //       console.log("KEY UNDER HERE");
    //       console.log(result.key);
    //       (await Component.findOneAndUpdate({_id: component_id},{file: result.key})).save;
    //       res.send({link: result.key});
    //     }
    // });
  });

  app.post('/api/get-presigned-url', async (req, res) => {
    aws.config.update({
    region: 'eu-central-1'
    })
    
    const {component_id} = req.body;
    
    const component = await Component.findById(component_id);

    let link = component.file;

    const s3 = new aws.S3();
    
    const params = {
        Bucket: keys.s3Bucket,
        Key: link,
        Expires: 60000
    };
    
    const signedUrl = s3.getSignedUrl('getObject',params);

    res.send(signedUrl);
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

  app.post('/api/eml/get-presigned-url', async (req, res) => {
    aws.config.update({
    region: 'eu-central-1'
    })

    const {course_id} = req.body;
    
    const course = await Course.findById(course_id);
  
    let link = course.coverImg;
  
    const s3 = new aws.S3();
    
    const params = {
        Bucket: keys.s3Bucket,
        Key: link,
        Expires: 600
    };
    
    const signedUrl = s3.getSignedUrl('getObject',params);
  
    res.send(signedUrl);
  });

  app.post('/api/eml/get-presigned-url-file', async (req, res) => {
    aws.config.update({
    region: 'eu-central-1'
    })

    const {link} = req.body;
  
    const s3 = new aws.S3();
    
    const params = {
        Bucket: keys.s3Bucket,
        Key: link,
        Expires: 600
    };
    
    const signedUrl = s3.getSignedUrl('getObject',params);
  
    res.send(signedUrl);
  });
};










