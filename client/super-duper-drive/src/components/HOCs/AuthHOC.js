import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default function AuthHOC(WrappedComponent) {
  class NewComponent extends Component {
    render() {

      const token = localStorage.getItem('token');

      return token ?
        <WrappedComponent {...this.props} token={token} /> :
        <Redirect to="/" />
    }
  }

  return NewComponent;
}