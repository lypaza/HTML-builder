const path = require('path');
const fs = require('fs');


const dir = path.join(__dirname, '.', 'secret-folder');


fs.promises.readdir(dir, {withFileTypes: true})
  .then(filenames => {
    for (let filename of filenames) {
      console.log(filename.name);
      let file = path.join(__dirname, './secret-folder', filename.name);
      fs.stat(file, (err, stats) => {
        if (filename.isDirectory() !== true) {
          //console.log(filename.name.split('.').pop());
          //console.log(filename.name);
          //console.log(path.basename(file, path.extname(filename.name)));
          //console.log(path.extname(filename.name));
          //console.log(filename.isDirectory());
          let kbyte = ((stats.size)/1024) + ' kb';
          //console.log(kbyte + '\n');
          console.log('\n'+ path.basename(file, path.extname(filename.name)) + ' - ' + filename.name.split('.').pop() + ' - ' + kbyte + '\n');
        }
      });
    }
  })
  .catch(err => {
    console.log(err);
  });
