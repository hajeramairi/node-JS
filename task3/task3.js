const fs = require('fs');
fs.writeFileSync('welcome.txt', 'Hello Node\n');
const data = fs.readFileSync('welcome.txt');
console.log(data);
