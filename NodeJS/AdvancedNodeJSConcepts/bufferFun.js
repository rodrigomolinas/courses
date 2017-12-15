console.log("###### BUFFER VS. STRING ######");

const string = 'touché';
const buffer = Buffer.from('touché');

console.log(string, string.length);
console.log(buffer, buffer.length);

console.log("###### SLICE ON BUFFERS ######");

const fs = require('fs');

const conversionMap = {
	'88': '65',
	'89': '66',
	'90': '67'
};

fs.readFile(__filename, (err, buffer) => {
	let tag  = buffer.slice(-4, -1);

	for (let i = 0; i < tag.length; i++) {
		tag[i] = conversionMap[tag[i]];
	}

	console.log(buffer.toString());
});

// TAG: XYZ