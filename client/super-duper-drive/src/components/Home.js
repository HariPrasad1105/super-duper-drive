import React, { useEffect, useState } from 'react';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { handleAuthedUserDetails } from '../actions/authedUser';
import { connect } from 'react-redux';

function Home(props) {

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const fetchUserDetails = () => {
      props.dispatch(handleAuthedUserDetails());
    }

    fetchUserDetails();

  }, [])

  return (
    <p>This is Home page </p>
  );

}

export default connect()(Home);