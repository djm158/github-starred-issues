# github-starred-issues

React app to fetch a list of your starred repos and show issues related to them. This is not to be used in production as it exposes your api key directly in the browser.

## Installation

[get a personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) 

```sh
$ git clone git@github.com:djm158/github-starred-issues.git
$ cd github-starred-issues
$ npm install
$ REACT_APP_TOKEN="your github auth token" npm start
```

visit http://localhost:3000/
