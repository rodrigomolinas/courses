const http = require('http');
const pid = process.pid;

http.createServer((req, res) => {
	for (let i = 0; i < 1e7; i++) {
		// Simulate CPU work
	}

	res.end(`Handled by process ${pid}`);
}).listen(8000, () => {
	console.log(`Started process ${pid}`);
});