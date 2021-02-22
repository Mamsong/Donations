import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import Navbar from './base/Navbar';
import '../css/Login.css';
import { Alert } from 'rsuite';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../hooks/useHttp';
import MediaQuery from "react-responsive";


export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const { http } = useHttp();

    const handleSubmit = async () => {
        try {
            if(email.length==0) return Alert.warning('メールアドレスが未入力です。');
            if(password.length==0) return Alert.warning('パスワードが未入力です。');
            const response = await http.post('/login',{ email: email, password:password });
            if(response.data.message == "Success"){
                localStorage.setItem('token',response.data.token);
                history.push('/')
            }else if(response.data.message == "ユーザーが存在しません。"){
                return Alert.warning('ユーザーが存在しません。');
            }
        } catch (err) {
            Alert.error('ログインに失敗しました。');
        }
    }

    return (
        <>
        <MediaQuery query="(min-width: 767px)">
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
        </MediaQuery>

        <MediaQuery query="(max-width: 767px)">
        <div style={{backgroundColor:"#bce2e8", height:"100vh"}}>
        <Navbar />
            <div className ="LoginFormMP">
                <div className = "LoginFormInsideMP">
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
        </MediaQuery>
        </>
    )
}
