import { Article } from 'App/Controllers/Http/ArticlesController'
import { findIndex } from 'lodash'

export default {
  findOne (articles: Article[], id: string) {
    const articleIndex = findIndex(articles, { id })
    let article = articles[articleIndex]
    return article
  },
}
