

// Format to Google Calendar date format (YYYYMMDDTHHMMSSZ)
const formatToGoogleCalendarDate = (stringDate: string) => {
    const date = new Date(stringDate);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
};


export const genGoogleCalLink = (startTime: string, endTime: string, title: string, description: string, address: string) => {


    return `https://www.google.com/calendar/render?action=TEMPLATE&text=TR+Events:+${title}&dates=${formatToGoogleCalendarDate(startTime)}/${formatToGoogleCalendarDate(endTime)}&details=${description}&location=${address == null ? `https://zoom.us/j/1234567890?pwd=abcdEFGHijkl
        ` : address}`


}
