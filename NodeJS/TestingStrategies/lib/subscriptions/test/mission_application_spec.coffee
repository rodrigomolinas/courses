assert = require "assert"
MembershipApplication = require "../models/membership_application"

describe "Membership application requirements", ->
	validApp = null
	before -> 
		# prepare data
		validApp = new MembershipApplication {
			first: "Test"
			last: "User"
			email: "test@test.com"
			age: 30
			height: 66
			weight: 180
		}

	describe "Application valid if...", ->
		it "Application is valid if all validators return true", ->
			assert validApp.isValid(), "Application is not valid"
	
	describe "Application is invalid if...", ->
		it "contains an email with 3 or less characters", ->
			app = new MembershipApplication {
				email: "t@t"
			}
			assert not app.emailIsValid(), "Email is valid"

		it "contains an email without @ symbol", ->
			app = new MembershipApplication {
				email: "rodmolinas"
			}
			assert not app.emailIsValid(), "Email is invalid"

		it "doesn't contain an email", ->
			app = new MembershipApplication { }
			assert not app.emailIsValid(), "Email is invalid"
		
		it "doesn't contain a height", ->
			app = new MembershipApplication { }
			assert not app.heightIsValid(), "Height is invalid"
		
		it "contains height less than 60 iches", ->
			app = new MembershipApplication {
				height: 59
			}
			assert not app.heightIsValid(), "Height is invalid"
		
		it "contains height bigger than 75 iches", ->
			app = new MembershipApplication {
				height: 76
			}
			assert not app.heightIsValid(), "Height is invalid"

		it "contains age below 100", ->
			app = new MembershipApplication {
				age: 101
			}
			assert not app.ageIsValid(), "Age is not valid"
		
		it "contains age above 15", ->
			app = new MembershipApplication {
				age: 14
			}
			assert not app.ageIsValid(), "Age is not valid"
		
		it "doesn't contain any age", ->
			app = new MembershipApplication { }
			assert not app.ageIsValid(), "Age is not valid"
		
		it "weights more that 300 lbs", ->
			app = new MembershipApplication {
				weight: 301
			}
			assert not app.weightIsValid(), "Weight is not valid"

		it "weights less than 100 lbs", ->
			app = new MembershipApplication {
				weight: 99
			}
			assert not app.weightIsValid(), "Weight is not valid"
		
		it "doesn't have a first name", ->
			app = new MembershipApplication { }
			assert not app.nameIsValid(), "Name is not valid"
		
		it "doesn't have a last name", ->
			app = new MembershipApplication { }
			assert not app.nameIsValid(), "Name is not valids"

		it "is expired", ->
			app = new MembershipApplication {
				validUntil: Date.parse("01/01/2016")
			}
			assert app.expired(), "Application is expired"
		
