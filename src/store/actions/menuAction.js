function storeMenu(res) {
    console.log('Menu action ===>', res)
    return {
      type: 'ADD_MENU',
      data: res
    }
  }
  
  export {
    storeMenu
  }