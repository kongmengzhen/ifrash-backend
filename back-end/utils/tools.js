const bcrypt = require('bcrypt');
const saltRounds = 10;
const hash=(password)=>{
    // 这里按照官网  则会发现加加密后得到的是undefind 因此需要一个返回值
    return new Promise((resolve,reject)=>{
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                // Store hash in your password DB.
                resolve(hash)
            });
        });
    })
}

 const compare=(password,hash)=>{
     return new Promise((resolve,reject)=>{
        bcrypt.compare(password,hash,function(err,res){
            resolve(res)

        })
     })
 }
module.exports={
    hash,
    compare
}