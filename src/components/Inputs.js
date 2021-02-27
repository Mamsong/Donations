import React ,{ useEffect, useState } from 'react';
import MediaQuery from "react-responsive";
import { useParams, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../css/Inputs.css';
import { Dropdown,Button,Form, Segment, Input, Label } from 'semantic-ui-react';
import Navbar from '../components/base/Navbar';
// import { DatePicker } from 'rsuite';
import DatePicker from "react-datepicker";
import dayjs from 'dayjs'
//hooks
import { useHttp } from '../hooks/useHttp';
import { useNations } from '../hooks/useNations';
import { Alert } from 'rsuite';
import { isValidStr } from '../utils/index.js';
import * as jwt from "jsonwebtoken";

export default function Inputs() {
    const [groupname,SetGroupName] = useState('');
    const [moneyvalue,SetMoneyValue] = useState('');
    //日付選択
    const [startDate, setStartDate] = useState(new Date());
    //国選択のため
    const [targetNationId, setTargetNationId] = useState([]);
    

    const { http } = useHttp();
    const history = useHistory();
    const { allOfNations, getAllOfNations} = useNations();
    const token = localStorage.getItem('token');
    const decoded_token = jwt.decode(token)
    const user_id = decoded_token.user_id
    // const onChangeDate = (date) => {
    //     setStartDate(date)
    // }
    const formattedList = allOfNations.map((nation, idx) => {
        return { key: String(idx), id: Number(nation.nation_id), text: nation.nation_name, value: nation.nation_id, }
    })

    const { nation_id } = useParams();
    const { isLoggedIn } = useAuth();

    useEffect(() => {

        getAllOfNations();
        setTargetNationId(nation_id);
    },[])


    if (!isLoggedIn) return null

    const handleSubmit = async () => {
        try {
            console.log('targetNationId======', targetNationId)
            if(isValidStr(groupname) == false||isValidStr(moneyvalue) == false||targetNationId.length == 0) return Alert.warning('必要事項を入力してください。');
            if(groupname.length > 60){
                return Alert.warning('団体名は60字以内で入力してください。');
            }
            if(!moneyvalue.match(/^[0-9]+$/)){
                return Alert.warning('金額は半角英数字で入力してください。');
            }
            if(targetNationId.length > 3){
                return Alert.warning('主な活動地域は最大３つまで登録可能です。');
            }
            if(moneyvalue <= 0){
                return Alert.warning('金額は正の数で入力してください。');
            }
            if(moneyvalue > 5000000){
                return Alert.warning('１つの寄付記録金額上限は500万円までです。');
            }
            const res = await http.post('/donation_input', { user_id : user_id, group_name : groupname, money : moneyvalue, date : dayjs(startDate).format('YYYY-MM-DD'), nations : targetNationId })
            if(res.data.message == 'Success'){
                SetGroupName('');
                SetMoneyValue('');
                setStartDate(new Date());
                // setTargetNationId([]);
                // targetNationId = []
                setTargetNationId(targetNationId)
                console.log("後",targetNationId)

                // history.go(0);

                Alert.success('寄付記録を作成しました。');
            }
        } catch (error) {
            console.log(error);
            Alert.error('エラーが発生しました。再度お試しください。')
        }
    }

    return (
        <>
        <MediaQuery query="(min-width: 767px)">
            
            <Navbar />
            <div　style={{backgroundColor:"#bce2e8", height:"100vh"}}>
                <div className ="DonationForm">
                <div className = "InputFormInside">
                    <p className="DonationHeader">Donation Memo</p>
                    <Form className="FormContents">
                        <div className="Input1">
                            <p　className="Labels">寄付先の団体名</p>
                            <Form.Input className="GroupName" placeholder='ex.Accept International' value={groupname} onChange={e => SetGroupName(e.target.value)}/>
                        </div>
                        <div className="Input1">
                        <p　className="Labels">寄付金額</p>
                        <Input labelPosition='right' type='text' placeholder='5000' value={moneyvalue} onChange={e => SetMoneyValue(e.target.value)}>
                            <Label basic>¥</Label>
                            <input />
                        </Input>
                        {/* <Form.Input placeholder='5,000円' /> */}
                        </div>
                        <div className="Input1">
                        <p　className="Labels">寄付した日付</p>
                        <DatePicker  dateFormat="yyyy/MM/dd" selected={startDate} 
                        onChange={(date) => {
                        setStartDate(date)}} />
                        {/* <DatePicker onChange={onChangeDate} oneTap /> */}
                        </div>
                        <div className="Input1">
                        <p　className="Labels">主な活動地域(最大3ヵ国まで選択可)</p>
                        <Dropdown
                            placeholder='主な活動地域を選択してください。' 
                            multiple
                            fluid 
                            search
                            selection
                            options={formattedList}
                            onChange={(e, data) => { setTargetNationId(data.value);  console.log('data.value', data.value)}}
                            defaultValue={Number(nation_id)}
                        ></Dropdown>
                            </div>
                        <Button onClick={handleSubmit} color="blue" type='submit'>Submit</Button>
                    </Form>
                </div>
                </div>
            </div>
        </MediaQuery>
            
        <MediaQuery query="(max-width: 767px)">
            
        <div　style={{backgroundColor:"#bce2e8", height:"100vh"}}>
        <Navbar />
                <div className ="DonationForm">
                <div className = "InputFormInsideMP">
                    <p className="DonationHeader">Donation Memo</p>
                    <Form className="FormContents">
                        <div className="Input1">
                            <p　className="Labels">寄付先の団体名</p>
                            <Form.Input className="GroupName" placeholder='ex.Accept International' value={groupname} onChange={e => SetGroupName(e.target.value)}/>
                        </div>
                        <div className="Input1">
                        <p　className="Labels">寄付金額</p>
                        <Input labelPosition='right' type='text' placeholder='5000' value={moneyvalue} onChange={e => SetMoneyValue(e.target.value)}>
                            <Label basic>¥</Label>
                            <input />
                            {/* <Label>.00</Label> */}
                        </Input>
                        {/* <Form.Input placeholder='5,000円' /> */}
                        </div>
                        <div className="Input1">
                        <p　className="Labels">寄付した日付</p>
                        <DatePicker  dateFormat="yyyy/MM/dd" selected={startDate} 
                        onChange={(date) => {
                        setStartDate(date)}} />
                        {/* <DatePicker onChange={onChangeDate} oneTap /> */}
                        </div>
                        <div className="Input1">
                        <p　className="Labels">主な活動地域(最大3ヵ国まで選択可)</p>
                        <Dropdown
                            placeholder='主な活動地域を選択' 
                            multiple
                            fluid 
                            search
                            selection
                            options={formattedList}
                            onChange={(e, data) => { setTargetNationId(data.value);  console.log('data.value', data.value)}}
                            defaultValue={Number(nation_id)}
                        ></Dropdown>
                            </div>
                        <Button onClick={handleSubmit} color="blue" type='submit'>Submit</Button>
                    </Form>
                </div>
                </div>
            </div>
        </MediaQuery>
        </>
    )
}
