import * as React from 'react';
import { bool, func } from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SESSION_ACTIONS } from '../actions/types';
import AppToolbar from '../components/AppToolbar';


function Main({ isLoggedIn, logout, push }) {
  const [open] = React.useState(true);
  const dispatch = useDispatch();
  const handleLogin = () => {
    push('/login');
  };

  return (
    <>
      <AppToolbar
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={logout} />
        
      {isLoggedIn ?
        <Snackbar disableWindowBlurListener={true} open={open} sx={{ width: '20%' }}>
          <Alert severity="success">Successfully Logged in</Alert>
        </Snackbar>
        : null}
    </>
  );
}

Main.propTypes = {
  isLoggedIn: bool.isRequired,
  logout: func.isRequired,
  push: func.isRequired
};

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.getIn(['session', 'username'])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(SESSION_ACTIONS.LOGOUT),
    push: path => dispatch(push(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
