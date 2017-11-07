import React, { Component } from 'react';
import './App.css';

const API = "https://api.github.com/users/djm158/starred";

const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Authorization', 'token ' + process.env.REACT_APP_TOKEN);

const init = {
  method: 'GET',
  headers: headers,
  mode: 'cors',
  cache: 'default'
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      issues: [],
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(API,init)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        this.setState({ data, isLoading: true })
        let urls = []
        for (let i = 0; i < data.length; i++) {
          urls.push(data[i].url + '/issues')
        }
        return Promise.all(urls.map(url => fetch(url, init).then(d => d.json())))
      })
      .then(data => this.setState({issues:data, isLoading:false}))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const stars = this.state.data || [];
    const issues = this.state.issues || [];
    
      if (this.state.error) {
        return <p>{this.state.error.message}</p>;
      }
    
      if (this.state.isLoading) {
        return <p>Loading ...</p>;
      }
    
      let finList = stars.map((star,i) => {
        return {
          id: star.id,
          name: star.name,
          desc: star.description,
          issues: issues[i]
        }
      })
    
      return (
        <div>
          {finList.map((item,i) => 
          <div key={i}>
            <h2 className='title'>{item.name}</h2>
            <p className='description'>{item.desc}</p>
            <div key={item.id}>
            {
              item.issues.map((item,j) => {
                return (
                  <ul key={j}><li key={item.id}><a href={item.html_url}>{item.title}</a></li></ul>
                )
              })
            }
    
            </div>
          </div>
          )}
        </div>
      );
  }
}

export default App;
