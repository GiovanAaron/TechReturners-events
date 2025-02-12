const createDateString = (date :string, time :string) => {


    console.log("date", date)
    console.log("time", time)
    // Combine the date and time into a single string
    const dateTimeString = `${date}T${time}:00Z`;

   

    // Create a Date object from the combined string
    const dateObj = new Date(dateTimeString);

    console.log("type of dateObj", typeof dateObj)

   

    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid date or time');
    }
    


    // Return the date in the desired format
    return dateObj.toISOString();
}


export default createDateString