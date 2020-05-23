/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {login, resetData} from './action';
import {forwardTo} from '../../utils/commonHelper';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loading from '../../components/LoadingIndicator';
import styled, {keyframes} from 'styled-components';

const typing = keyframes `
  from {
    max-width: 0
  }
  to {
    max-width: 100%
  }
`;

const blink = keyframes `
  from, to { 
      border-color: transparent 
  }
  50% { 
      border-color: #28a745; 
  }
`;

const StyledTitle = styled.div`
  display: inline-block;
  margin: 50px 0;

  div {
    font-size: 20px;
    display: inline-block;
    overflow: hidden;
    letter-spacing: 2px;
    animation: ${typing} 5s steps(20, end), ${blink} 0.75s step-end infinite;
    white-space: nowrap;
    border-right: 4px solid #28a745;
    box-sizing: border-box;
    font-weight: bold;
  }

  @media (${props => props.theme.mediaQuery.min.md}) {
    div {
      font-size: 36px;
    }
  }
}
`;


const Login = ({onHandleSubmit, store, onResetData}) => {
  const [state, setState] = useState({
    username: '',
    password: '',
  })
  const {username, password} = state;
  const loggedRedirectURL = '/';

  useEffect(() => {
    if (localStorage.getItem('username') || '') {
      forwardTo(loggedRedirectURL);
    }
    document.getElementsByName('username')[0].focus();
    onResetData();
  }, []);

  const handleChange = e => {
    const target = e.target;
    setState(prevState => ({...prevState, [target.name]: target.value}))
  }
  const handleSubmit = () => {
    onHandleSubmit(state);
  }
  return(
    <React.Fragment>
      <StyledTitle>
        <div>Type Race --- Login</div>
      </StyledTitle>
        <div className="col-12 col-lg-6 mx-auto">
        <Input type="text" placeholder="username" name="username" onChange={handleChange} value={username}/>
        <Input type="password" placeholder="password" name="password" onChange={handleChange} value={password} />
        {store.error && <p className="text-left text-danger">{store.error}</p> }
        <Button type="submit" onClick={handleSubmit}>{store.loading ? <Loading button /> : 'Login'}</Button>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    store: state.LoginPageReducer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onHandleSubmit: data => dispatch(login(data)),
    onResetData: () => dispatch(resetData()),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(Login);