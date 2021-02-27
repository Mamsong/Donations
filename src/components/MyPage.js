import React, { useState, useEffect } from 'react';
import Navbar from './base/Navbar';
import { Header, Message, Segment, Form, Icon, Loader} from 'semantic-ui-react'
import { Alert } from 'rsuite';
import { useHttp } from '../hooks/useHttp';
import { useHistory } from 'react-router-dom';
import MediaQuery from "react-responsive";
import '../css/MyPage.css';
import { useUser } from '../hooks/useUser';
import  * as jwt from 'jsonwebtoken';

export default function MyPage() {

    const { userInfo, getUserInfo } = useUser();

    const token = localStorage.getItem("token")
    const decoded_token = jwt.decode(token)
    const user_id = decoded_token.user_id


    useEffect(() => {
        getUserInfo(user_id);
      },[])

      if(userInfo.length == 0){
        return(
            <>
            < Loader active inline='centered'/>
            </>
        )
    }

    if(userInfo.length > 0){
        console.log(userInfo)
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
            <div className="UpdateUsename">
            <Icon name='pencil' size='large' />
            <Form className="FormContent">
                <Form.Input type='name' placeholder='新しいユーザーネーム'/>
            </Form>
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
                <Form.Input type='email' placeholder='新しいメールアドレス'/>
            </Form>
            </div>
            </Segment>
            <Header as='h5' attached>
            パスワードの変更
            </Header>
            <Segment attached>
            <Form className="FormContent" style={{marginBottom:"8px"}}>
                <Form.Input type='password' placeholder='現在のパスワード'/>
            </Form>
            <Form className="FormContent">
                <Form.Input type='password' placeholder='新しいパスワード'/>
            </Form>
            </Segment>
            </div>
        </div>
        </div>
        </>
    );
}

