import React from 'react';
import styles from './index.css';

const LoginBasicLayout: React.FC = props => {
  return (
    <div className={styles.normal}>
      {props.children}
    </div>
  );
};

export default LoginBasicLayout;
