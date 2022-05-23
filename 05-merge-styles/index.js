const path = require('path');
const fs = require('fs');


const dirOriginal = path.join(__dirname, '.', 'styles');
const dirBundle = path.join(__dirname, './project-dist', 'bundle.css');
//let arr = [];




function copyDir() {
  fs.promises.readdir(dirOriginal, {withFileTypes: true})
    .then(filenames => {
      for (let filename of filenames) {
        if (path.extname(filename.name) == '.css') {
          console.log(filename.name);
          let pathOrigFile = path.join(__dirname, './styles', filename.name);
          //let readStream = fs.createReadStream(pathOrigFile, 'utf8');
          //let writeStream = fs.createWriteStream(dirBundle);
          //readStream.pipe(writeStream);
          fs.readFile(pathOrigFile, 'utf8', function(error, fileContent){ 
            if(error) throw error; 
                 
           
            let arrB = [];
            arrB += fileContent;
            //console.log(arrB);
            fs.writeFile(dirBundle, arrB, function(error){
              if(error) throw error;
            });
          });
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
}


copyDir();
