
import seed from "./seed";

import { userData, eventsData, attendanceData } from "../data/test-data/index";
import { userDevData, eventsDevData, attendanceDevData } from "../data/dev-data/index";


if (!process.env.NODE_ENV) {
   process.env.NODE_ENV = 'development'; // Or 'test' if it's for testing
 }


const runseed = () => {

   if (process.env.NODE_ENV === 'development') {
      return seed(userDevData, eventsDevData, attendanceDevData);
   } else return seed(userData, eventsData, attendanceData)}


   runseed();