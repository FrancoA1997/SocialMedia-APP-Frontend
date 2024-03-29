export const LoginStart = (userCredentials) =>({
type: "LOGIN_START",


});

export const LoginSuccess = (user) =>({
    type: "LOGIN_SUCCESS",
    payload: user,
    
});

export const LoginFailure = (error) =>({
        type: "LOGIN_FAILURE",
        payload: error,
     
});
export const Follow = (userId) =>({
    type: "FOLLOW_USER",
    payload: userId,
 
});
export const Unfollow = (userId) =>({
    type: "UNFOLLOW_USER",
    payload: userId,
 
});
export const refreshToken = (token, refreshToken) =>({
    type: "REFRESH_TOKEN",
    payload: token,
    refreshToken,
});

export const updateCurrentUser = (newUsername, newDescription) => ({
    type: "REFRESH_USER",
    payload:
     newUsername,
     newDescription,
});
export const updateProfileImg = (newImg) => ({
    type: "UPDATE_PP",
    payload: newImg,
     
});