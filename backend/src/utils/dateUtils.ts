export const convertToRFC5545 = (dateInput: string | Date): string => {
    let isoDateString: string;

    if (dateInput instanceof Date) {
        isoDateString = dateInput.toISOString(); // Convert Date to ISO string
    } else if (typeof dateInput === "string") {
        isoDateString = dateInput;
    } else {
        throw new Error("Invalid date input: must be a Date object or ISO 8601 string");
    }

    // Convert ISO 8601 to RFC 5545 format by removing dashes, colons, and milliseconds
    return isoDateString.replace(/[-:]/g, "").split(".")[0] + "Z"; 
};
