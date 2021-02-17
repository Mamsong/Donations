import { useHttp } from './useHttp';
import { useState } from 'react';
import { Alert } from 'rsuite';

export const useNations = () => {

    const { http } = useHttp();
    // const [nationsData, setNationsData] = useState([]);
    // const [nations, setNationsList] = useState([]);
    const [allOfNations, setAllOfNations] = useState([]);

    const getAllOfNations = async () => {
        try {
            const { data } = await http.get(`/nations/all`);
            setAllOfNations(data);
            return data;
        } catch (error) {
            Alert.error('取得に失敗しました。');
        }
    }

    return { allOfNations, getAllOfNations }

}