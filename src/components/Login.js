import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import Navbar from './base/Navbar';
import '../css/Login.css';

export default function Login() {
    return (
        <div>
        <Navbar />
            <div className ="LoginForm">
                <div className = "LoginFormInside">
                    <p className="Header">Login</p>
                    <Form className="FormContents">
                    <p　className="Labels">メールアドレス</p>
                    <Form.Input type='email' placeholder='email' className="Input" />
                    <p　className="Labels">パスワード</p>
                    <Form.Input type='password' placeholder='password' className="Input" />
                    <Button inverted color='yellow' className = "LoginButton" type='submit'>Login</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
