const { getUserData, saveUserInFile, agreegateBasedOnGender } = require('./util');

async function getDataUsingAsyncAwait (){

    let users = await getUserData();
    await saveUserInFile('userdata3.json',users)
    console.log('file saved')
    let agreegatedData = agreegateBasedOnGender(users)
    console.log(agreegatedData)


}


getDataUsingAsyncAwait();
