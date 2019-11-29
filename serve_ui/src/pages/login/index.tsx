import React, { PureComponent, useState } from 'react'
import { Button, Form, Icon, Input, Checkbox } from 'antd'
import { connect } from 'dva'
import styles from './index.less'
import axios from 'axios'

interface IProps {
  form: {
    validateFields: Function,
    getFieldDecorator: Function
  },
}
interface IState {
  loading: string,
  count: number
}

const Login = (props: IProps) => {
  console.log(props)
  function handleSubmit () {
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        axios.defaults.headers.post['Content-Type'] = 
'application/x-www-form-urlencoded;charset=UTF-8';
        axios.post('http://localhost:3000/users', {
          userName: values.username,
          password: values.password,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <div className={styles.pagesLogin}>
      <Form className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button type="primary" onClick={handleSubmit} className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
}

const LoginForm = Form.create()(Login);

export default connect(({ loading }: IState) => ({ loading }))(LoginForm)
