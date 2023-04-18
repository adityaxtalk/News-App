import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import { Spinner } from './Spinner';

const News = (props) => {
   const [articles, setArticles] = useState([]);
   const [loading, setLoading]=useState(true);
   const [page, setPage]=useState(1);
   const [totalResults, setTotalResults]=useState(0)
  
    
    const fetchMoreData = async () => {
      
      const url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8ed2894ed86046bbbf27e25a07501d29&page=${page+1}&pageSize=${props.pageSize}`
      
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
      setPage(page + 1);
    };

    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const updateNews= async () => {
      props.setProgress(10);
      const url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`
      let data = await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false)
      props.setProgress(100);
    }
    const handleNextClick= async () => {
      // console.log('next click')
      // let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8ed2894ed86046bbbf27e25a07501d29&page=${this.state.page + 1}&pageSize=${props.pageSize}`
      // this.setState({loading: true});
      // let data = await fetch(url);
      // let parsedData = await data.json();
      // this.setState({articles: parsedData.articles, page: this.state.page + 1, loading: false})
      setPage(page + 1);
      updateNews()
    }

    const handlePrevClick = async () => {
      // console.log('prev click')
      // this.setState({loading: true});
      // let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8ed2894ed86046bbbf27e25a07501d29&page=${this.state.page - 1}&pageSize=${props.pageSize}`
      // let data = await fetch(url);
      // let parsedData = await data.json();
      // console.log(parsedData)
      // this.setState({articles: parsedData.articles, page: this.state.page - 1, loading: false})
      setPage(page - 1);
      updateNews()
    }

    useEffect(()=>{
      document.title=`${capitalizeFirstLetter(props.category)} - NewsMonkey`
      updateNews()
    }, []);
    return (
      <>
        <h1 className='text-center' style={{margin: '35px 0', marginTop: '90px'  }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}>
          <div className='container'>
            <div className="row">
                {articles.map((element) => {
                    return (
                    <div key={element.url} className="col-md-4">
                      <NewsItem 
                        url={element.urlToImage}
                        title={element.title? element.title.slice(0, 45): ''}
                        description={element.description?element.description.slice(0, 88): ''}
                        newsURL={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </InfiniteScroll>
        
        {/* <div className='container d-flex justify-content-between'>
          <button type='button' disabled={this.state.page <= 1} className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous</button>
          <button type='button' disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / props.pageSize)} className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    );
}

News.defaultProps ={
  country: 'in',
  pageSize: 8,
  category: 'general'
  }

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News;