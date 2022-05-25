const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '.', 'text.txt');


function createFile() {
  fs.open(file, 'a', (err) => {
    if(err) throw err;
  });
}

function textInside() {
  stdout.write('\nПривет! Напиши что нибудь...\n');
  process.on('SIGINT', () => {
    console.log('\nВы нажали CTRL+C\nПока!');
    process.exit();
  });
  stdin.on('data', (chunk) => {
    let smthText = chunk.toString();
    if (smthText.trim() !== 'exit') {
      fs.appendFile(file, smthText, (err) => {
        if(err) throw err;
        console.log('Ввод добавлен в text.txt');
      });
    } else {
      console.log('Вы написали exit\nПока!');
      process.exit();
    }
  });
}

createFile();
textInside();



/*process.stdin.resume();

process.on('SIGINT', () => {
  console.log('Received SIGINT. Press Control-D to exit.');
});

function handle(signal) {
  console.log(`Received ${signal}`);
}

process.on('SIGINT', handle); */















/*const input = stdin.on('data', data => {
  let smthText = stdout.write(data);
  process.exit();
});
const output = fs.createWriteStream(file);

input.on('data', chunk => output.write(chunk));
input.on('error', error => console.log('Error', error.message));
console.log(smthText);
 */





/* function writeText(){
  
  stdout.write('Привет! Напиши что нибудь...\n');
  stdin.on('data', data => {
    let smthText = stdout.write(data);
    process.exit();
  });
  process.on('exit', () => stdout.write('Удачи!\n'));
}*/


/*const file = path.join(__dirname, '.', 'text.txt');

async function createFile() {
  fs.open(file, 'w', (err) => {
    if(err) throw err;
    console.log('File created');
  });
}

async function textInside() {
  stdout.write('Привет! Напиши что нибудь...\n');
  stdin.on('data', data => {
    let smthText = stdout.write(data);
    if(smthText == true) {
      fs.appendFile(
        path.join(__dirname, '.', 'text.txt'),
        smthText,
        err => {
          if (err) throw err;
          console.log('Файл был изменен');
        }
      );
    }
    process.exit();
  });
}


async function saveInTxt() {
  fs.appendFile(file, smthText, (err) => {
    if(err) throw err;
    console.log('Data has been added!');
  });
}

createFile();
textInside();
saveInTxt();  */