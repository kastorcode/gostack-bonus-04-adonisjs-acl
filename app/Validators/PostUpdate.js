'use strict'


class PostUpdate {
  get validateAll () {
    return true
  }


  get rules () {
    return {
      title: 'string|min:1',
      content: 'string|min:1',
      type: 'string|min:1'
    }
  }
}


module.exports = PostUpdate
