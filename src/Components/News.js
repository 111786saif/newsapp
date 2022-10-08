import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {
   
    constructor() {
        super();
        console.log("Hello i am a constructor from news component");
        this.state = {
            articles: [],
            loading: false 
        }
    }
    async componentDidMount(){
        console.log("cdm")
        let url = "https://newsapi.org/v2/top-headlines?country=in&category=&apiKey=fcc96e2f35584770b0d90339c3574d6c&page=1";
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles})
    }
     handlePrevClick = async ()=>{
        console.log("Previous");
    }
     handleNextClick = async ()=>{

        console.log("Next")
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=&apiKey=fcc96e2f35584770b0d90339c3574d6c&page=${this.state.page + 1}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles})
        this.setState({
            page: this.state.page + 1,
        })
    }

    render() {
        console.log("render")

        return (
            <div className="container my-3">

                <h1> NewsApp - Top Headlines</h1>
                
                <div className="row">
                {this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                    <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice( ):""} imageUrl={element.urlToImage} newsUrl={element.url} />
                </div>
                })}
                  

                </div>
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Privious</button>
                <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

                </div>

            </div>
        )
    }
}

export default News