
import jwt from "jsonwebtoken";

export const generateToken = (userId: number, JWT_SECRET: string) => {
  return jwt.sign({ user_id: userId }, JWT_SECRET);
};

export const getUserByRole = (users: any, role: string) => {
    return users.find((user: any)  => user.access_type === role);
  };



  //This function is to get event and user information by access_type for testing
  export const getEventIdByUserId = (users: any[] | undefined, events: any[] | undefined, accessType : any) => {
    if (!users) {
      return null; // or throw an error, depending on your requirements
    }
    
    // Find the user with the specified access type
    const user = users.find(user => user.access_type === accessType);
    
    if (!user) {
        return null; // Return null if no matching user is found
    }
  
    // Find events where owner_id matches the found user's id
    const matchingEvents = events?.filter(event => event.owner_id === user.id);
  
    if (!matchingEvents) return 
    
    // Return only the first matching event, or null if no events are found
    return matchingEvents?.length > 0 ? matchingEvents[0] : null;
  }


  export const getRandomAttendance = (unorderedAttendance: any) => {
    if (!Array.isArray(unorderedAttendance) || unorderedAttendance.length === 0) {
        return null; // Return null if the input is not a valid array or is empty
    }
    
    const randomIndex = Math.floor(Math.random() * unorderedAttendance.length);
    return unorderedAttendance[randomIndex];
}


export const findAttendanceByUserId = (unorderedAttendance: any , userId: number) => {
  // Find the first attendance where user_id matches the provided userId
  const foundAttendance = unorderedAttendance.find((attendance : any) => attendance.user_id === userId);
  
  // Return the found registration or null if no match is found
  return foundAttendance ;
}

export const findUserByEmail = (users:any, email: any) => {
  // Find the user with the matching email
  const foundUser = users.find((user : any ) => user.email === email);
  
  // Return the user if found, otherwise return null
  return foundUser || null;
}