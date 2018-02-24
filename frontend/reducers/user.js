const userReducer = (state = null, action) => {
    switch (action.type) {
        case "USER_DATA":
            console.log('CURRENT USER ID:', action.userid);
            return action.userid;
        default:
            console.log('DEFAULT USER ID:', action.userid);
            return state;
    }
};

export default userReducer;
