import React from 'react'
import { connect } from 'react-redux'

import { getNews } from '../actions/get-news'

@connect(
  (store => {
    return {
      news: store.news,
      scrollbar: store.scrollbar
    }
  })
)
export default class NewsFeed extends React.Component {

  componentDidMount() {
    this.props.dispatch(getNews('crypto'))
  }

  render() {
    return (
      <div className="news-feed" style={{ marginRight: `-${this.props.scrollbar.width}px` }}>
        {this.props.news.list.map((article, i) => {
          return <div className="news-item" key={article.title+i}>
            <h2 className="news-item__title">{article.title}</h2>
            <p className="news-item__source">{article.source.name}</p>
            <a href={article.url} target="_blank" className="news-item__link">read more &rarr;</a>
          </div>
        })}
      </div>
    )
  }
}