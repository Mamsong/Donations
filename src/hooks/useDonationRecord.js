import { useHttp } from './useHttp';
import { useState } from 'react';
import { Alert } from 'rsuite';

export const useDonationRecord = () => {
    const { http } = useHttp();

    const [donationData, setDonationData] = useState([]);
    
    const getDonationList = async (user_id) => {
        try {
            const { data } = await http.get(`/donation_list/record/${user_id}`);
            setDonationData(data);
            return data;
        } catch (error) {
            Alert.error('寄付記録データの取得に失敗しました。');
            console.log(error)
        }
    };

    return { donationData, getDonationList}

}
