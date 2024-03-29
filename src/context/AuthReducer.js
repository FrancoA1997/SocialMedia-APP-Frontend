const AuthReducer =(state, action) => {
    switch(action.type){
        case "LOGIN_START" :
            return{
                user: null,
                isFetching: true,
                error: false,
            };
            case "LOGIN_SUCCESS" :
                return {
                    user: action.payload,
                    isFetching: false,
                    error: false,
                };
                case "LOGIN_FAILURE":
                    return{
                        user: null,
                        isFetching: false,
                        error: action.payload,
                    };
                    case "FOLLOW":
                        return{
                            ...state,
                            user: {...state.user,
                            following: [...state.user.following, action.payload]
                            }
                        };
                        case "UNFOLLOW":
                            return {
                                ...state,
                                user: {
                                  ...state.user,
                                  following: state.user.following.filter(
                                    (following) => following !== action.payload
                                  ),
                                },
                              };
                              case "REFRESH_TOKEN":
                                return {
                                    ...state,
                                    user:{
                                        ...state.user,
                                        accessToken: action.payload.token,
                                        refreshToken: action.payload.refreshToken,
                                    },
                                }
                                case "REFRESH_USER":
                                    return {
                                        ...state,
                                        user:{
                                            ...state.user,
                                            username: action.payload.newUsername,
                                            description: action.payload.newDescription,
                                        },
                                    }
                                    case "UPDATE_PP":
                                        return {
                                            ...state,
                                            user:{
                                                ...state.user,
                                                profilePicture: action.payload.newImg,
                                            },
                                        }
                default:
                    return state;
    }
   

};
export default AuthReducer;