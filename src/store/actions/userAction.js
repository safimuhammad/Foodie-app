function storeUserRes(res) {
    console.log(' all Useraction ===>', res)
    return {
      type: 'ADD_USERS_DETAILS',
      data: res
    }
  }
  
  export {
    storeUserRes
  }