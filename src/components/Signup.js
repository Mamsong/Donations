import React, { useState } from 'react';
import Navbar from './base/Navbar';
import { Button, Form } from 'semantic-ui-react';
import '../css/Signup.css';


export default function Signup() {
    return (
        <div>
        <Navbar />
            <div className ="RegisterForm">
                <div className = "FormInside">
                    <p className="SignupHeader">Sign up</p>
                    <Form className="FormContents">
                    <p　className="Labels">ユーザーネーム</p>
                    <Form.Input type='name' placeholder='username' className="Input" />
                    <p　className="Labels">メールアドレス</p>
                    <Form.Input type='email' placeholder='email' className="Input"/>
                    <p　className="Labels">パスワード</p>
                    <Form.Input type='password' placeholder='半角英数字4文字以上' className="Input" />
                    <Button inverted color='yellow' className = "RegisterButton" type='submit'>新規登録</Button>
                </Form>
                </div>
            </div>
        </div>
    )
}
