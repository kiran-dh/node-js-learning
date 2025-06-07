    const fs=require("fs");
    const express=("express");
    
function  read  () {

    path="./MOCK_DATA.json"
    try {
        const fileData = fs.readFileSync(path, "utf-8");
       return JSON.parse(fileData);
    } catch (err) {
        return res.status(500).send("Could not read user file");
    }
}
    module.exports=read;