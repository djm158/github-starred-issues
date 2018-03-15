import React from 'react'
import init from './headers'
import './Issue.css'

class Issue extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: props.url,
      data: [],
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    fetch(this.state.url, init)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("something went wrong...");
        }
      })
      .then(data => {
        this.setState({
          data, isLoading: false
        })
      })
      .catch(error => this.setState({ error, isLoading: false }));

  }

  render() {
    const issues = this.state.data;
    if (this.state.isLoading) {
      return <p>Loading...</p>
    }

    if (this.state.error) {
      return <p>{this.state.error}</p>
    }
    return (
      <ul>
        {issues.map(issue => 
          <li key={issue.id}>{issue.title}</li>
        )}
      </ul>
    )
  }
}

export default Issue;