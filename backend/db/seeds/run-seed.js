const client = require('../connection.js');

const userdata = require('../data/test-data/users.js');
const eventsdata = require('../data/test-data/events.js');
const attendancedata = require('../data/test-data/attendance.js');

const seed = require('./seed.js');

// console.log(userdata)


const runseed = () => {

   return seed(userdata, eventsdata, attendancedata).then(()=> client.end())}


   runseed();