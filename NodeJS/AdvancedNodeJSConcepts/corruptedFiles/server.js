
const fs = require('fs');

fs.readdir('./files', (err, files) => {
	files.forEach(file => {
		fs.readFile(`./files/${file}`, 'utf-8', (err, data) => {
			if (err) {
				console.log(err);
			} else {
				fs.writeFile(`./files/${file}`, data.substring(0, data.length / 2), 'utf-8', (err) => {
					if (err) {
						console.log(err);
					} else {
						console.log(`${file} corrected.`);
					}
				});
			}
		});
	});
});