import React, { Component } from 'react'
import Axios from 'axios'

class Testing extends Component {

  state = {
    data: ""
  }

  componentDidMount() {
    Axios.get("/testing/getData")
      .then(response => response.data)
      .then(data => console.log(data))
  }

  render() {
    return (
      <div>
        {this.state.data}
      </div>
    );
  }
}

export default Testing;