function storeRes(res) {
    console.log('Restaurant action ===>', res)
    return {
      type: 'ADD_RES',
      data: res
    }
  }
  
  export {
    storeRes
  }