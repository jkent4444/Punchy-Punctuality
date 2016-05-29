QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "check late start time", function( assert ) {
  assert.ok( checkStartTime(new Date("2013-07-31 17:37:49+10"), new Date("2013-07-31 17:30:00+10")) == "late", "Passed!" );
});

QUnit.test( "check on time start", function( assert ) {
  assert.ok( checkStartTime(new Date("2013-08-03 16:57:34+10"), new Date("2013-08-03 17:00:00+10")) == "on time", "Passed!" );
});

QUnit.test( "check late finish time", function( assert ) {
  assert.ok( checkFinishTime(new Date("2013-07-31 17:37:49+10"), new Date("2013-07-31 17:30:00+10")) == "left late", "Passed!" );
});

QUnit.test( "check on time finish", function( assert ) {
  assert.ok( checkFinishTime(new Date("2013-08-03 17:00:00+10"), new Date("2013-08-03 17:00:00+10")) == "on time", "Passed!" );
});

QUnit.test( "check finished early", function( assert ) {
  assert.ok( checkFinishTime(new Date("2013-08-03 16:57:34+10"), new Date("2013-08-03 17:00:00+10")) == "left early", "Passed!" );
});

QUnit.test( "check null finish shift", function( assert ) {
  assert.ok( checkFinishTime(null, new Date("2013-08-03 17:00:00+10")) == "No finish time clocked", "Passed!" );
});
