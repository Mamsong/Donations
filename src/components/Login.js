import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import Navbar from './base/Navbar';
import '../css/Login.css';
import { Alert } from 'rsuite';
import { useHistory } from 'react-router-dom';


export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        try {
            if(email.length==0) return Alert.warning('メールアドレスが未入力です。');
            if(password.length==0) return Alert.warning('パスワードが未入力です。');

        } catch (err) {
            Alert.error('ログインに失敗しました。');
        }
    }

    return (
        <div>
        <Navbar />
            <div className ="LoginForm">
                <div className = "LoginFormInside">
                    <p className="Header">Login</p>
                    <Form className="FormContents">
                    <p　className="Labels">メールアドレス</p>
                    <Form.Input type='email' placeholder='email' className="Input" value={email} onChange={e => setEmail(e.target.value)}/>
                    <p　className="Labels">パスワード</p>
                    <Form.Input type='password' placeholder='password' className="Input" value={password} onChange={e => setPassword(e.target.value)}/>
                    <Button inverted color='yellow' className = "LoginButton" type='submit' onClick={handleSubmit} >Login</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
