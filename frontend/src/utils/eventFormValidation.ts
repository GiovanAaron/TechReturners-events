function isEndAfterStart(startDate: string, endDate: string): boolean {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return start < end;
}


export default isEndAfterStart