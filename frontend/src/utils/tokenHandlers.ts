const storeSession = (token: string, user_id: number, access_type: string, expiresIn: number) => {
    
    const expiryTime = Date.now() + expiresIn * 60 * 1000; // Convert to milliseconds
    localStorage.setItem("authToken", token);
    localStorage.setItem("tokenExpiry", expiryTime.toString());
    localStorage.setItem("accessType", access_type);
    localStorage.setItem("user_id", user_id.toString());
}


const endSession = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("accessType");
    localStorage.removeItem("user_id");
}


const isTokenExpired = () => {
    const expiryTime = localStorage.getItem("tokenExpiry");
    if (!expiryTime) return true;
    return Date.now() > Number(expiryTime);
}

export {storeSession, endSession, isTokenExpired}