import { useHttp } from './useHttp';
import { useState } from 'react';
import { Alert } from 'rsuite';

export const useTotal = () => {
    const { http } = useHttp();

    const [totalData, setTotalData ] = useState([]);

    const getTotalMoney = async(user_id) => {
        try {
            const { data } = await http.get(`/donation_list/${user_id}`);
            setTotalData(data)
            return data
        } catch (error) {
            Alert.error('合計寄付金額の取得に失敗しました。');
            console.log(error)
        }
    }

    return { totalData, getTotalMoney }
}