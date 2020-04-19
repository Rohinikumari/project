const { getUserData, saveUserInFile } = require('./util');


getUserData().then((users)=>{
    return users;
}).then((users)=>{
    return saveUserInFile('userdata2.json',users)
}).then(()=>{
    console.log('file saved')
}).catch((err)=>{
    throw err;
})
