const formatDateWithSuffix = (isoString: string): string => {
    const date = new Date(isoString);
    const day = date.getDate();
    
    // Determine suffix (st, nd, rd, th)
    let suffix = "th";
    if (day % 10 === 1 && day !== 11) {
      suffix = "st";
    } else if (day % 10 === 2 && day !== 12) {
      suffix = "nd";
    } else if (day % 10 === 3 && day !== 13) {
      suffix = "rd";
    }
    
    // Format the date with the suffix
    return `${day}${suffix} ${date.toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
    })}`;
  };


export default formatDateWithSuffix