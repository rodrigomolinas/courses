const fs = require('fs');
const file = fs.createWriteStream('./big.file');

for (let i = 0; i < 5e6; i++) {
	file.write('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum varius risus ante. Integer rutrum volutpat ligula, vel cursus enim sollicitudin eu. Integer vitae leo at lacus efficitur malesuada in eget nunc. Vivamus nec nisl mollis, venenatis justo et, porttitor dui');
}

file.end();