const path = require('path');
const fs = require('fs');

const pathCopyDir = path.join(__dirname, '.', 'files-copy');
const dir = path.join(__dirname, '.', 'files');


function unlink() {
  fs.promises.readdir(pathCopyDir, {withFileTypes: true})
    .then(filenames => {
      for (let filename of filenames) {
        let newDirpath = path.join(__dirname, './files-copy', filename.name);
        fs.unlink(newDirpath, () => {
          console.log('Актуализировал');
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
}


function copyDir() {
  fs.promises.readdir(dir, {withFileTypes: true})
    .then(filenames => {
      for (let filename of filenames) {
        let newDirpath = path.join(__dirname, './files-copy', filename.name);
        let oldDirpath = path.join(__dirname, './files', filename.name);
        //fs.unlink(newDirpath, () => {
        //});
        fs.copyFile(oldDirpath, newDirpath, () => {
          console.log('\n' + ' Скопировал файл '+filename.name+ ' в папку files-copy'+ '\n');
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
}



function createDir() {
  fs.mkdir(pathCopyDir, { recursive: true }, (err) => {
    if (err) throw err;
    console.log('\n' + ' Создал папку files-copy ');
  });
}



unlink();
createDir();
copyDir();