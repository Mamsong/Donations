import React, { useState } from 'react';
import Navbar from './base/Navbar';
import { Button, Form } from 'semantic-ui-react';
import '../css/Signup.css';
import { Alert } from 'rsuite';
import { isValidStr } from '../utils/index.js';
import { useHttp } from '../hooks/useHttp';
import { useHistory } from 'react-router-dom';



export default function Signup() {

    const [username, regUsername] = useState('');
    const [email, regEmail] = useState('');
    const [password, regPassword] = useState('');
    const { http } = useHttp();
    const history = useHistory();

    const HandleRegister = async () => {
        try {
            if(isValidStr(username) == false||isValidStr(email) == false||isValidStr(password) == false) return Alert.warning('必要事項を入力してください。');
            if(password.length < 4 || password.length > 15) return Alert.warning('パスワードは4文字以上15文字以内で入力してください。');
            const response = await http.post('/users/signup', { username:username, email:email, password:password});
            // console.log(response);
            if(response.data.message == "既に登録されているメールアドレスです。"){
                return Alert.warning("既に登録されているメールアドレスです。")
            }else if(response.data.message == "Success"){
                Alert.success('ユーザー登録が完了しました。')
                history.push('/login');
            }

        } catch (error) {
            Alert.error('ユーザー登録に失敗しました。')
            console.log(error);
        }
    }

    return (
        <div>
        <Navbar />
            <div className ="RegisterForm">
                <div className = "FormInside">
                    <p className="SignupHeader">Sign up</p>
                    <Form className="FormContents">
                    <p　className="Labels">ユーザーネーム</p>
                    <Form.Input type='name' placeholder='username' className="Input" value={username} onChange={e => regUsername(e.target.value)}/>
                    <p　className="Labels">メールアドレス</p>
                    <Form.Input type='email' placeholder='email' className="Input" value={ email } onChange={e => regEmail(e.target.value)}/>
                    <p　className="Labels">パスワード</p>
                    <Form.Input type='password' placeholder='半角英数字4文字以上' className="Input" value={ password } onChange={e => regPassword(e.target.value)}/>
                    <Button inverted color='yellow' className = "RegisterButton" type='submit' onClick={HandleRegister}>新規登録</Button>
                </Form>
                </div>
            </div>
        </div>
    )
}
