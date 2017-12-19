moment = require 'moment'
MissionControl = require '../models/mission_control'
Mission = require '../models/mission'
assert = require 'assert'
db = require '../db/index'
sinon = require 'sinon'

sinon.stub(db, 'getMissionByLaunchDate').yields null, null
sinon.stub(db, 'createNextMission').yields null, new Mission()
missionControl = new MissionControl { db: db}

describe 'Mission Planning', ->
	describe 'No Current Mission', ->
		currentMission = null
		before (done) ->
			missionControl.currentMission (err, res) ->
				currentMission = res
				done()
		
		it 'Is created if none exists', ->
			assert currentMission
			assert db.getMissionByLaunchDate.called

	describe 'Current Mission Exists', ->
		currentMission = null
		before (done) ->
			db.getMissionByLaunchDate.restore()
			sinon.stub(db, 'getMissionByLaunchDate').yields null, { id: 1000 }
			missionControl.currentMission (err, res) ->
				currentMission = res
				done()
		
		it 'Returns mission 1000', ->
			assert.equal currentMission.id, 1000
			assert db.getMissionByLaunchDate.called