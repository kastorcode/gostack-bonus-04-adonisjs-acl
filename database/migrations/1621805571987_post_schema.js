'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')


class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()

      table.string('title').notNullable()

      table.text('content').notNullable()

      table.string('type').notNullable()

      table.integer('user_id').unsigned().index()
      table.foreign('user_id').references('id').on('users').onUpdate('CASCADE').onDelete('SET NULL')

      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}


module.exports = PostSchema
