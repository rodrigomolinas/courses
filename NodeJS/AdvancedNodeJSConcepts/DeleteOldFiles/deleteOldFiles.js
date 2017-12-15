const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'files');

const ms7days = 7 * 24 * 60 * 60 * 1000;
const ms7daysago = Date.now() - ms7days;


fs.readdir(dirname, (err, files) => {
	files.forEach(file => {
		const filePath = path.join(dirname, file);
		fs.stat(filePath, (err, stats) => {
			var modifiedDate = new Date(stats.mtime);
			console.log(`Comparing timestamps modified: ${modifiedDate.getTime()} and ms7daysago: ${ms7daysago}`);
			if ((modifiedDate.getTime() - ms7daysago) < 0) {
				console.log('Removing file...');
				fs.unlink(filePath, (err) => {
					if (err) {
						throw err;
					}
				});
			}
		});
	});
});