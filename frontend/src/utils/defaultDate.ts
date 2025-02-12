
function defaultStart() {
    const now = new Date();
    now.setDate(now.getDate() + 1); // Move to tomorrow
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(now.getDate()).padStart(2, '0');
    // const hours = String(now.getHours()).padStart(2, '0');
    // const minutes = String(now.getMinutes()).padStart(2, '0');

    const full = `${year}-${month}-${day}T09:30:00Z`;
    const dateOnly = `${year}-${month}-${day}`
    const timeOnly = `09:30`
    
    return {full, dateOnly, timeOnly};
}

function defaultEnd() {
    const now = new Date();
    now.setDate(now.getDate() + 1); // Move to tomorrow
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(now.getDate()).padStart(2, '0');
    // const hours = String(now.getHours()).padStart(2, '0');
    // const minutes = String(now.getMinutes()).padStart(2, '0');
    
    const full = `${year}-${month}-${day}T09:30:00Z`;
    const dateOnly = `${year}-${month}-${day}`
    const timeOnly = `17:30`
    
    return {full, dateOnly, timeOnly};
}

export {defaultStart, defaultEnd}