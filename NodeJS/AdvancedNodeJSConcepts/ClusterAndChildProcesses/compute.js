const longComputation = () => {
	let sum = 0;

	for (let i = 0; i < 3e9; i++) {
		sum += i;
	}

	return sum;
};

process.on('message', () => {
	const sum = longComputation();
	process.send(sum);
});