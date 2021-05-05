const authReducer = (state = {}, action) => {
  
    console.log('reducer called ===>', action)
    switch(action.type) {
        case "ADD_USER": {
            return {...state, user: action.data}
        }
        case "REMOVE_USER": {
            return {...state, user: null}
        }
        default: {
            return state;
        }
    }
}

export {
    authReducer
}