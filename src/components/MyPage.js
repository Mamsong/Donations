import React, { useState, useEffect } from 'react';
import Navbar from './base/Navbar';
import { Header, Segment, Form, Icon, Loader} from 'semantic-ui-react'
import { Alert } from 'rsuite';
import { useHttp } from '../hooks/useHttp';
import MediaQuery from "react-responsive";
import '../css/MyPage.css';
import { useUser } from '../hooks/useUser';
import  * as jwt from 'jsonwebtoken';
import { Button } from 'rsuite';
import { isValidStr } from '../utils/index.js';

export default function MyPage() {

    const { userInfo, userPass, getUserInfo, getUserPass } = useUser();

    const token = localStorage.getItem("token")
    const decoded_token = jwt.decode(token)
    const user_id = decoded_token.user_id
    const { http } = useHttp();

    const [ username, setUsername] = useState("");
    const [ email, setEmail ] = useState("");
    const [ currentPassword, setCurrentPassword ] = useState("");
    const [ password, setPassword] = useState("");
    const [isEditedEmail, setIsEditedEmail] = useState(false);
    const [isEditedUsername, setIsEditedUsername] = useState(false);
    const [isInputedPassword, setIsInputedPassword] = useState(false);


    const updateEmail = async () => {
        try{
          const regExp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
          if(!email) return Alert.warning('メールアドレスを入力してください。');
    
          if(!email.match(regExp)) return Alert.warning('メールアドレスの形式が正しくありません。');
          if(email.length < 6 || email.length > 32) return Alert.warning('メールアドレスは6文字以上32文字以内で入力してください。');
    
          const response = await http.put('/users/email',{ user_id:user_id, email:email });
          if(response.data.message == "既に登録されているメールアドレスです。"){
            Alert.warning('既に同じメールアドレスが登録されています。');
          } else if(response.data.message == "Success"){
            Alert.success('編集が完了しました。');
            setEmail('');
          }
        } catch (err){
          Alert.error('編集に失敗しました。')
        }
      }

    const updateUsername = async() => {
        try {
            if(isValidStr(username) == false) return Alert.warning('必要事項を入力してください。');
            if(username.length < 2 || username.length > 30){
                return Alert.warning('ユーザーネームは1文字以上30文字以内で入力してください');
            }
            const response = await http.put('/users/username',{ user_id:user_id, username:username });
            if(response.data.message == "Success"){
                Alert.success('編集が完了しました。');
                setUsername('');
            }
        } catch (error) {
            Alert.error('編集に失敗しました。');
        }
    }

    const updatePassword = async () => {
        try{
          const regExp = /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{4,15}$/i;
          if(!password) return Alert.warning('新しいパスワードを入力してください。');
          if(!currentPassword) return Alert.warning('現在のパスワードを入力してください。')
          if(userPass[0].password != currentPassword) return Alert.warning('現在のパスワードが誤っております。');
    
          if(password.length < 4 || password.length > 15) return Alert.warning('パスワードは4文字以上15文字以内で入力してください。');
          if(!password.match(regExp)) return Alert.warning('パスワードは英数字を含めて入力してください。');
    
          await http.put('/users/password',{ user_id :user_id ,password:password });
          setCurrentPassword('');
          setPassword('');
          Alert.success('編集が完了しました。')
        }catch (err){
          Alert.error('編集に失敗しました。')
        }
      }

    const handleCheckIsEditedEmail = (value) => {
        if (userInfo[0].email != value) {
            setIsEditedEmail(true);
        } else {
            setIsEditedEmail(false);
        }
    }
    
    const handleCheckIsEditedUsername = (value) =>{
        if (userInfo[0].username != value) {
            setIsEditedUsername(true);
        } else {
            setIsEditedUsername(false);
        } 
    }

    const handleCheckIsEditedPassword = (value) => {  
        if (value.length > 0) {
          setIsInputedPassword(true);
        } else {
          setIsInputedPassword(false);
          console.log(value)
        }
      }

    useEffect(() => {
        getUserInfo(user_id);
        getUserPass(user_id);
      },[userInfo])


      if(userInfo.length == 0||userPass.length == 0){
        return(
            <>
            < Loader active inline='centered'/>
            </>
        )
    }

    return(
        <>
        <div style={{backgroundColor:"#bce2e8"}}>
        <Navbar />
        
        <div className="MyList">
        <div style={{fontWeight:"bold",fontSize:"20px",marginBottom:"10px"}}>アカウント設定</div>
            <div>
            <Header as='h5' attached='top'>
            ユーザーネーム
            </Header>
            <Segment attached>
                <div style={{fontSize:"1.2em", marginBottom:"8px"}}>{ userInfo[0].username }</div>
            <div className="UpdateUsername">
            <Icon name='pencil' size='large' />
            <Form className="FormContent">
                <Form.Input type='name' placeholder='新しいユーザーネーム' value={username} onChange={(e) => {setUsername(e.target.value);handleCheckIsEditedUsername(e.target.value)}}/>
            </Form>
            <Button disabled={!isEditedUsername} onClick={updateUsername} appearance="primary" style={{ marginLeft:"8px" }}>
              編集する
            </Button>
            </div>
            
            </Segment>
            <Header as='h5' attached>
            メールアドレス
            </Header>
            <Segment attached>
            <div style={{fontSize:"1.2em", marginBottom:"5px"}}>{ userInfo[0].email}</div>
            <div className="UpdateEmail">
            <Icon name='pencil' size='large' />
            <Form className="FormContent">
                <Form.Input type='email' placeholder='新しいメールアドレス' value={email} onChange={(e) => { setEmail(e.target.value); handleCheckIsEditedEmail(e.target.value) }}/>
            </Form>
            <Button disabled={!isEditedEmail} appearance="primary" style={{ marginLeft:"8px" }} onClick={updateEmail}>
              編集する
            </Button>
            </div>
            </Segment>
            <Header as='h5' attached>
            パスワードの変更
            </Header>
            <Segment attached>
            <Form className="FormContent" style={{marginBottom:"8px"}}>
                <Form.Input type='password' value={currentPassword} onChange={(e) => {setCurrentPassword(e.target.value)}}　placeholder='現在のパスワード' />
            </Form>
            <div className="UpdatePassword">
            <Form className="FormContent">
                <Form.Input type='password' value={password} onChange={(e) => { setPassword(e.target.value); handleCheckIsEditedPassword(e.target.value);}}　placeholder='新しいパスワード' />
            </Form>
            <Button appearance="primary" disabled={!isInputedPassword} onClick={updatePassword} style={{ marginLeft:"8px" }}>
              編集する
            </Button>
            </div>
            </Segment>
            </div>
        </div>
        </div>
        </>
    );
}

