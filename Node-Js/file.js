const fs = require('fs')

//read

fs.readFile('./docs/text.txt', (err,data)=>{
    if (err){
        console.log(err)
    }

    console.log(data.toString());
})

// making and removing file

if(!fs.existsSync('./docs/text123.txt')){
    fs.writeFile('./docs/text123.txt', 'This is edited with fs', (err, data)=>{
        if (err){
            console.log(err);
        }
        console.log('file writing is done')
    })
}else {
    fs.unlink('./docs/text123.txt', (err, data) => {
        if(err) {
            console.log(err)
        }
        console.log('file is deleted')
    })
}


console.log('latest line of code')


//making and removing folder

if(fs.existsSync('./new-folder')){
    fs.rmdir('./new-folder', (err) => {
        if(err){
            console.log(err);
        }
        console.log('folder deleted because it already exists');
    })
}else{
    fs.mkdir('./new-folder', (err) => {
        if (err){
            console.log(err);
        }
        console.log('folder created');
    })
}

