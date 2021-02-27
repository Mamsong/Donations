import { useHttp } from './useHttp';
import { useState } from 'react';
import { Alert } from 'rsuite';

export const useUser = () => {

    const { http } = useHttp();

    const [userInfo, setuserInfo ] = useState([]);

    const getUserInfo = async(user_id) => {
        try {
            const { data } = await http.get(`/users/${ user_id}`);
            setuserInfo(data)
            return data
        } catch (error) {
            Alert.error('ユーザー情報の取得に失敗しました。');
            console.log(error)
        }
    }

    return { userInfo, getUserInfo }
}