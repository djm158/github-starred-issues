import React from 'react'
import init from './headers'
import Issue from './Issue'
import './Issue.css'
const API = "https://api.github.com/users/djm158/starred";

class Stars extends React.Component {
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
    fetch(API, init)
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
    const stars = this.state.data;
    if (this.state.isLoading) {
      return <p>Loading...</p>
    }

    if (this.state.error) {
      return <p>this.state.error.message</p>
    }

    return (
      <div className="master">
      {stars.map(star =>
        <div key={star.id} className="container">
            <h1 className="title">{star.name}</h1>
            <Issue url={star.url + "/issues"} />
        </div>
      )}
    </div>
    )
  }
}

export default Stars