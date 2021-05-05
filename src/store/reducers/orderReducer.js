const initialState = {
    res: []
  }
  
  function orderReducer (state = initialState, action) {
    console.log('Order reducer ==>', action)
    switch(action.type) {
      case 'ADD_ORDER': {
        return { ...state, res: action.data }
      }
      case 'REMOVE_ORDER': {
        return { ...state, res: []}
      }
      default: {
        return state
      }
    }
  }
  
  export {
    orderReducer
    }