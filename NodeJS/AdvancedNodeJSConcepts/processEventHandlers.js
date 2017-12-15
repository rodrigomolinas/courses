// process is an event emitter
process.on('exit', function (code) {
	// Do one final synchronous operation
	// before the node process terminates
	console.log(`About to exit process with code ${code}`);
});

process.on('uncaughtException', (err) => {
	// Something went unhandled.
	// Do any cleanup but exit anyway!
	console.error(err); // don't do just that

	// FORCE exit the process too.
	process.exit(1);
});

// keep the event loop busy
process.stdin.resume();

// trigger a TypeError exception
console.dog();