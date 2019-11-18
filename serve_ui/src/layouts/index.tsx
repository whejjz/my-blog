import React from 'react';
import styles from './index.css';
import LoginLayout from './login/index'
import { RouteComponentProps } from "react-router-dom"

const BasicLayout: React.FC<RouteComponentProps> = props => {
  
  if ( props.location.pathname.indexOf('/login') > -1 ) {
    return <LoginLayout>{props.children}</LoginLayout>
  }

  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      {props.children}
    </div>
  );
};

export default BasicLayout;
