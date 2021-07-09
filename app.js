const express = require('express');
const app=express();
const Jimp = require('jimp');
const canvas = new Jimp(512, 256, 0xFFFFFFFF);
const fs = require('fs');

app.get('/',async (req,res) => {
  const {x1,x2,y1,y2} = req.query;
    const width = Math.abs(x2-x1); 
    const height = Math.abs(y2-y1);

    //get the buffer
 const encode = (image) => {
    return new Promise((fulfill, reject) => {
        canvas.getBuffer(Jimp.MIME_PNG, (err, img) => err ? reject(err) : fulfill(img));
    });
}

const makeIteratorThatFillsWithColor = (color) => {
  return function (x, y, offset) {
    this.bitmap.data.writeUInt32BE(color, offset, true);
  }
};
canvas.scan(parseInt(x1), parseInt(y1), width, height, makeIteratorThatFillsWithColor(0x00000040));

// displaying
encode(canvas)
.then(buffer => {
  fs.writeFile("circle.png",buffer,(err)=>{
    if(err) console.log(err)
  })
})
.catch(err=>console.error(err))

res.json({
  width_of_rectangle:width,
  height_of_rectangle : height,
  message:"rectangle formed"
})
});

app.listen(3000,()=>{
  console.log("server started at 3000");
})

