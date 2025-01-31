import { Client } from "pg";
import seed from "./seed";

import { userData, eventsData, attendanceData } from "../data/test-data/index";


// console.log(userdata)


const runseed = () => {

   const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });
   return seed(userData, eventsData, attendanceData).then(()=> client.end())}


   runseed();