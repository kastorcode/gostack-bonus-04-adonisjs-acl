'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.get('/', () => {
  return { message: 'Adonis ACL Home' }
})

Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('users', 'UserController.store').validator('UserCreate')

Route.put('users/:id', 'UserController.update').validator('UserUpdate')

Route.group(() => {
  Route.resource('permissions', 'PermissionController')
    .apiOnly()

  Route.resource('posts', 'PostController')
    .apiOnly()
    .except(['index', 'show'])
    .middleware(['is:(administrator || moderator)'])
    .validator(new Map([
      [['posts.store'], ['PostCreate']],
      [['posts.update'], ['PostUpdate']]
    ]))

  Route.get('posts', 'PostController.index')
    .middleware(['can:(read_posts || read_private_posts)'])

  Route.get('posts/:id', 'PostController.show')
    .middleware(['can:(read_posts || read_private_posts)'])

  Route.resource('roles', 'RoleController')
    .apiOnly()
})
  .middleware(['auth'])
