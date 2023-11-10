# bird-gallery

 Reads and stores image files from : `document store` - http://area2-documentsstore.s3-website.eu-west-2.amazonaws.com

Reads map of files in the above from : `file map` -  https://area2-maps.s3.eu-west-2.amazonaws.com/data.json

 This `file map` is recreated when a new file is uploaded to `document store`.

# lambda function 
 
 Runs on adding new files to `document store`. Will create the data.json.n  

 ```

 import {
  S3Client,
  PutObjectCommand,
  paginateListObjectsV2
} from "@aws-sdk/client-s3";


export const handler = async () => {
  
  const s3Client = new S3Client({});
  const documentStoreBucket = `area2-documentsstore`;
  const fileMapBucket = `area2-maps`; 

  const paginator = paginateListObjectsV2(
    { client: s3Client },
    { Bucket: documentStoreBucket }
  );
  
  let data = {};

  for await (const page of paginator) {
    const objects = page.Contents;
    if (objects) {
      const images = objects.map((f) => {return {name:f.Key, lastModified: f.LastModified}});
      data = {created: (new Date()).toString(), count:images.length,src:documentStoreBucket,images};
    }
  }

  await s3Client.send(
    new PutObjectCommand({
      Bucket: fileMapBucket,
      Key: "data.json",
      Body: JSON.stringify(data),
    })
  );
 
  return "ok";
   
};
  
```

