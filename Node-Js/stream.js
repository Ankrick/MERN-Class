const fs = require('fs');

const readStream = fs.createReadStream('./docs/large.txt');
const writeStream = fs.createWriteStream('./docs/large-write.txt')



// readStream.on('data', function(data){
//     writeStream.write(data.toString())
//     writeStream.write('---chunk---')
// })

//pipe
readStream.pipe(writeStream);