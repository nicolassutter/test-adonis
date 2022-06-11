import type { HttpContextContract as _HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { reject, merge } from 'lodash'
import NotFoundException from 'App/Exceptions/NotFoundException'
import ArticlesService from 'App/Services/Http/ArticlesService'

type HttpContextContract<T extends Record<string, any> = {}> = _HttpContextContract & { params: T }

export interface Article {
  id: string
  title?: string
}

let articles: Article[] = [
  { id: 'one' },
  { id: 'two' },
]

export default class ArticlesController {
  /**
   * Find all
   */
  public index () {
    return articles
  }

  /**
   * Find one
   */
  public show ({ params }: HttpContextContract<{ id: string }>) {
    const { id } = params
    const article = ArticlesService.findOne(articles, id)

    if (!article) {
      throw new NotFoundException('The article could not be found.')
    }

    return article
  }

  /**
   * Delete one
   */
  public destroy ({ params }: HttpContextContract<{ id: string }>) {
    const { id } = params
    articles = reject(articles, { id })
  }

  /**
   * Update one
   */
  public update ({ params, request }: HttpContextContract<{ id: string }>) {
    const { id } = params
    let article = ArticlesService.findOne(articles, id)

    if (!article) {
      throw new NotFoundException('The article could not be found.')
    }

    const body: Partial<Article> = request.body()
    const updatedArticle: Article = merge(article, body)
    article = updatedArticle

    return updatedArticle
  }
}
