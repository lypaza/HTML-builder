const path = require('path');
const fs = require('fs');




const dirOriginal = path.join(__dirname, '.', 'styles');
const dirBundle = path.join(__dirname, './project-dist', 'bundle.css');
let arrResult = [];


async function readDir() {
  const files = await fs.promises.readdir(dirOriginal);
  let arrFiles = [];
  arrFiles.push(files);
  readFile(arrFiles, arrResult);
}

async function readFile(arr, result) {
  for (let files of arr) {
    for (let filesOrig of files) {
      if (path.extname(filesOrig) == '.css') {
        let pathOrigFile = path.join(__dirname, './styles', filesOrig);
        const dataFile = await fs.promises.readFile(pathOrigFile, {encoding: 'utf-8'});
        console.log(filesOrig + ' записан в массив\n');
        result += dataFile;
        deleteOldBundle();
        createNewBundle(result);
      }
    }
  }
}


async function deleteOldBundle() {
  let unlinkStyle = path.join(__dirname, '.', 'project-dist');
  fs.promises.readdir(unlinkStyle, {withFileTypes: true})
    .then(filenames => {
      for (let filename of filenames) {
        let StyleFilepath = path.join(__dirname, './project-dist', filename.name);
        if (path.extname(filename.name) == '.css') {
          fs.unlink(StyleFilepath, () => {
            console.log('Бандл актуализирован\n');
          });
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
}

async function createNewBundle(data) {
  fs.open(dirBundle, 'a', (err) => {
    if(err) throw err;
    fs.appendFile(dirBundle, data, (err) => {
      if(err) throw err;
      console.log('Сделана запись в бандл\n');
    });
  });
}



readDir();

