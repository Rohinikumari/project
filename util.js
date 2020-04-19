const axios = require('axios');
let { appendFile } = require('fs');
const { promisify  } = require('util')
appendFile =  promisify(appendFile);


function _getUser(){
    let url = `https://randomuser.me/api/`;
    return axios.get(url)
}

const _getUserDataInBatch = async (batchSize)=>{
    let asyncRequests = [];

    while(batchSize--){
        asyncRequests.push(_getUser())
    }

    let asyncResponses =  await Promise.all(asyncRequests)
    let results = asyncResponses.map((res)=>{
        return res.data.results[0]
    })

    return results

    
}

function saveUserInFile(filename, users){
    return appendFile(filename, JSON.stringify(users))

}


function delay (timeout){
    timeout = timeout * 1000;
    return new Promise((resolve,reject)=>{
        
        setTimeout(()=>{
            resolve(null)
        },timeout)
    })
}




async function getUserData(){

    let totalBatchNumber = 2;
    let currentBatchNumber = 1;
    let users = []
   



    while(currentBatchNumber <= totalBatchNumber){
        let _users =  await _getUserDataInBatch(5);
        console.log(`fetched user for batch ${currentBatchNumber++}/${totalBatchNumber}.`)
        users = [...users, ..._users]
        console.log(`delay is: 10 sec`)
        await delay(1)
        currentBatchNumber++;
        
    }

    return users

}


function agreegateBasedOnGender(users){
    let hashmap = {};

    users.forEach((user)=>{
        if(hashmap[user.gender] === undefined){
            hashmap[user.gender] = [user];
        }else{
            hashmap[user.gender].push(user)
        }
    })

    return hashmap;

}
module.exports = {
    saveUserInFile,
    getUserData,
    agreegateBasedOnGender
}
