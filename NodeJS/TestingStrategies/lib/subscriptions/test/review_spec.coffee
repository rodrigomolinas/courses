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
			
		review = new ReviewProcess({ application: validApp })

		before((done) ->
			review.processApplication  (err, result) ->
				decision = result
				done()
		)

		it 'returns success', -> 
			assert decision.success, decision.message
		
		it 'ensures the application is valid', ->
			assert decision.validated
		
		it 'ensures the mission is selected', ->
			assert decision.mission

		it 'ensures a role is available', ->
			assert decision.roleAvailable

		it 'ensures the role is compatible', ->
			assert decision.roleCompatible