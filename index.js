const express = require('express');
const fs = require('node:fs');
const HTTP_SERVER =express();

require('dotenv').config();
const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;




HTTP_SERVER.listen(PORT,HOSTNAME,()=>{
    console.log(`Server started successfully at ${PORT}`)
});



HTTP_SERVER.post('/postReq',(req,res)=>{
    
    const day = new Date()
    let date = day.getDate();
    let time = day.getHours();
    let fileName = `${date}-${time}`
    let timestamp = Date.now();

    fs.writeFile(`./Files/${fileName}.txt`,`Current TimeStamp = ${timestamp}`,'utf8',(err)=>{
      if(err){
        console.log(err);
        res.status(500).send('Error');
        return;
      }
      console.log('File created successfully');
      res.send('File created successfully')
    })
})




HTTP_SERVER.get("/",(req,res,next)=>{
  fs.readdir('./Files',(err,files)=>{
    if(err){
        console.log(err);
        res.status(500).send('Error');
        return;
    }
    const textFiles = files.filter(file=>file.endsWith('.txt'));
    res.json({"Files": textFiles});
  })
})

