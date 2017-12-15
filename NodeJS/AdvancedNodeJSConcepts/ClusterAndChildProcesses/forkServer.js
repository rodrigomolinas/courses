const http = require('http');
const { fork } = require('child_process');

const server = http.createServer();

server.on('request', (req, res) => {
	if (req.url === '/compute') {
		const compute = fork('compute.js');
		compute.send('start');
		compute.on('message', (sum) => {
			return res.end(`Sum is ${sum} \n`);
		});
	} else {
		res.end('Ok \n');
	}
});

server.listen(3000);