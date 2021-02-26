import { useHttp } from './useHttp';
import { useState } from 'react';
import { Alert } from 'rsuite';

export const useWorldmap = () => {

    const { http } = useHttp();

    const [ nationData , setNationData ] = useState([]);

    const getNationData = async (user_id) => {
        try {
            const { data } = await http.get(`/worldmap/${user_id}`);
            setNationData(data);
        } catch (error) {
            Alert.error('世界地図データ取得に失敗しました。');
        }
    };
    return { nationData, getNationData }
}
