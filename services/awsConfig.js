const AWS = require("aws-sdk");

const s3 = new AWS.S3();

const uploadToBucket=async(req,res)=>{
 const file = req.file;
  const s3Params = {
    Bucket: "cyclic-wild-blue-bighorn-sheep-gear-us-west-1",
    Key: `${Date.now()}+${file.originalname}`,
    Body: file.buffer
  };
  console.log(file)
 s3.upload(s3Params, async(err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({success:"false",message:'Error uploading file'});
    }
    console.log( await data.Location)
   return  await data.Location;
  });
}

module.exports={uploadToBucket}
