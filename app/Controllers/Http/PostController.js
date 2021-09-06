'use strict'

const Post = use('App/Models/Post')


class PostController {
  async index ({ request, auth }) {
    const user = await auth.getUser()
    const { page = 1 } = request.get()

    if (await user.can('read_private_posts')) {
      const posts = await Post.query()
        .paginate(page)

      return posts
    }

    const posts = await Post.query()
      .where({ type: 'public' })
      .paginate(page)

    return posts
  }


  async show ({ params, auth, response }) {
    const post = await Post.findOrFail(params.id)

    if (post.type == 'public') {
      await post.load('user')

      return post
    }

    const user = await auth.getUser()

    if (await user.can('read_private_posts')) {
      await post.load('user')

      return post
    }

    return response.status(403).send({
      error: {
        message: 'Você não tem permissão de leitura'
      }
    })
  }


  async store ({ request, auth }) {
    const data = request.only([
      'title',
      'content',
      'type'
    ])

    const post = await Post.create({
      ...data,
      user_id: auth.user.id
    })

    return post
  }


  async update ({ request, params }) {
    const data = request.only([
      'title',
      'content',
      'type'
    ])

    const post = await Post.findOrFail(params.id)

    post.merge(data)

    await post.save()

    return post
  }


  async destroy ({ params }) {
    const post = await Post.findOrFail(params.id)

    await post.delete()
  }
}


module.exports = PostController
