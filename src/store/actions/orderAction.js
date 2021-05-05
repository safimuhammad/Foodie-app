function storeOrder(res) {
    console.log('Order action ===>', res)
    return {
      type: 'ADD_ORDER',
      data: res
    }
  }
  function removeOrder(){
    return {
        type:'REMOVE_ORDER'
    }
}
  
  export {
    storeOrder,
    removeOrder
  }