const initialState = {
    res: []
  }
  
  function menuReducer (state = initialState, action) {
    console.log('Order reducer ==>', action)
    switch(action.type) {
      case 'ADD_MENU': {
        return { ...state, res: action.data }
      }
      case 'REMOVE_MENU': {
        return { ...state, res: []}
      }
      default: {
        return state
      }
    }
  }
  
  export {
    menuReducer
    }