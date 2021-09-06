'use strict'


class UserUpdate {
  get validateAll () {
    return true
  }


  get rules () {
    return {
      username: 'unique:users',
      email: 'email|unique:users',
      password: 'confirmed',
      permissions: 'array|integer',
      roles: 'array|integer'
    }
  }
}


module.exports = UserUpdate
