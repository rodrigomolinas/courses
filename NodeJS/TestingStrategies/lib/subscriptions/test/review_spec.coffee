assert = require 'assert'
ReviewProcess = require '../processes/review'
MembershipApplication = require '../models/membership_application'
sinon = require 'sinon'

describe 'The Review Process', ->
	describe 'Receiving a valid application', ->
		decision = null
		validApp = new MembershipApplication {
				first: 'Test'
				last: 'User'
				email: 'test@test.com'
				age: 30
				height: 66
				weight: 180
			}
			
		review = new ReviewProcess()
		validationSpy = sinon.spy()
		missionSpy = sinon.spy()
		roleAvailableSpy = sinon.spy()
		roleCompatibleSpy = sinon.spy()

		before((done) ->
			review.on 'validated', validationSpy
			review.on 'mission-selected', missionSpy
			review.on 'role-available', roleAvailableSpy
			review.on 'role-compatible', roleCompatibleSpy
			review.processApplication  validApp, (err, result) ->
				decision = result
				done()
		)

		it 'returns success', -> 
			assert decision.success, decision.message
		
		it 'ensures the application is valid', ->
			assert validationSpy.called
		
		it 'ensures the mission is selected', ->
			assert missionSpy.called

		it 'ensures a role is available', ->
			assert roleAvailableSpy.called

		it 'ensures the role is compatible', ->
			assert roleCompatibleSpy.called