'use strict'


class PostCreate {
  get validateAll () {
    return true
  }


  get rules () {
    return {
      title: 'required|string|min:1',
      content: 'required|string|min:1',
      type: 'required|string|min:1'
    }
  }
}


module.exports = PostCreate
