    const fs=require("fs");
    const express=("express");

function  lastId  () {
    user=[];
    path="./MOCK_DATA.json"
        const fileData = fs.readFileSync(path, "utf-8");

         user=JSON.parse(fileData);

    return user[user.length-1].id;
}
module.exports=lastId;