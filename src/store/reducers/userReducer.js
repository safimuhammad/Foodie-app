const initialState = {
    res: []
  }
  
  function userReducer (state = initialState, action) {
    console.log('all users reducer ==>', action)
    switch(action.type) {
      case 'ADD_USERS_DETAILS': {
        return { ...state, res: action.data }
      }
      case 'REMOVE_ADS': {
        return { ...state, res: []}
      }
      default: {
        return state
      }
    }
  }
  
  export {
    userReducer
    }