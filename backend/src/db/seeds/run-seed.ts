
import seed from "./seed";
import client from "../connection";

import { userData, eventsData, attendanceData } from "../data/test-data/index";
import { userDevData, eventsDevData, attendanceDevData } from "../data/dev-data/index";


if (!process.env.NODE_ENV) {
   process.env.NODE_ENV = 'development'; // Or 'test' if it's for testing
 }


 const runseed = async () => {
     try {
         console.log(`Running seed in ${process.env.NODE_ENV} environment`);
         if (process.env.NODE_ENV === 'development') {
             await seed(userDevData, eventsDevData, attendanceDevData);
         } else {
             await seed(userData, eventsData, attendanceData);
         }
         console.log('Seeding completed successfully');
     } catch (error) {
         console.error('Error occurred during seeding:', error);
     } finally {
         client.end();
     }
 };


   runseed();