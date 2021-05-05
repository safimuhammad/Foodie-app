const initialState = {
    res: []
  }
  
  function resReducer (state = initialState, action) {
    console.log('Restaurant reducer ==>', action)
    switch(action.type) {
      case 'ADD_RES': {
        return { ...state, res: action.data }
      }
      case 'REMOVE_RES': {
        return { ...state, res: []}
      }
      default: {
        return state
      }
    }
  }
  
  export {
      resReducer
    }