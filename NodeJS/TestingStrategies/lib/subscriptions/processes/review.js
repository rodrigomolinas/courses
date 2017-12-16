const Emitter = require('events').EventEmitter;
const util = require('util');

class ReviewProcess extends Emitter {
	constructor(args) {
		super();

		// event path
		this.on('application-received', this.ensureAppValid);
		this.on('validated', this.findNextMission);
		this.on('mission-selected', this.roleIsAvailable);
		this.on('role-available', this.ensureRoleCompatible);
		this.on('role-compatible', this.acceptApplication);

		// sad path
		this.on('invalid', this.denyApplication);
	}

	// make sure the app is valid
	ensureAppValid(app) {
		if (app.isValid()) {
			this.emit('validated', app);
		} else {
			this.emit('invalid', app.validationMessage());
		}
	}

	// find the next mission
	findNextMission(app) {
		// stub this out for now
		app.mission = {
			commander: null,
			pilot: null,
			MAVPilot: null,
			passengers: []
		};

		this.emit('mission-selected', app);
	}

	// make sure role selected is available
	roleIsAvailable(app) {
		// TODO: Lets complete this when we have more info
		this.emit('role-available', app);
	}

	// make sure height/weight/age is right for that role
	ensureRoleCompatible(app) {
		// TODO: find about roles and height/weight etc
		this.emit('role-compatible', app);
	}

	// accept the app with a message
	acceptApplication(app) {
		// What do we do?
		this.callback(null, {
			success: true,
			message: 'Welcome to the Mars Program!'
		});
	}

	// deny the app with a message
	denyApplication(message) {
		this.callback(null, {
			success: false,
			message: message
		});
	}

	processApplication(app, next) {
		this.callback = next;
		this.emit('application-received', app);
	}
}

module.exports = ReviewProcess;