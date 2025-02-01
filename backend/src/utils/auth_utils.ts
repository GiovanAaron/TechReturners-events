export const checkAuthorization = (
    userAuth: any, 
    reqParamsId: any, 
    allowedAccessTypes: string[] = ["Admin"] // Default is Admin if no types are specified
  ) => {
    // Check if the user ID matches or if the user has an allowed access type
    return (
      userAuth.id !== parseInt(reqParamsId) && 
      !allowedAccessTypes.includes(userAuth.access_type)
    );
  };