import React ,{ useEffect, useState } from 'react';
import MediaQuery from "react-responsive";
import { useParams } from 'react-router-dom';
import '../css/Inputs.css';
import { Dropdown,Button,Form, Segment, Input, Label } from 'semantic-ui-react';
import Navbar from '../components/base/Navbar';
// import { DatePicker } from 'rsuite';
import DatePicker from "react-datepicker";
import dayjs from 'dayjs'
import moment from 'moment';
//hooks
import { useHttp } from '../hooks/useHttp';
import { useNations } from '../hooks/useNations';
import { Alert } from 'rsuite';

export default function Inputs() {
    const [groupname,SetGroupName] = useState('');
    const [moneyvalue,SetMoneyValue] = useState('');
    //日付選択
    const [startDate, setStartDate] = useState(new Date());
    //国選択のため
    const [targetNationId, setTargetNationId] = useState(0);
    

    const { http } = useHttp();
    const { allOfNations, getAllOfNations} = useNations();
    // const onChangeDate = (date) => {
    //     setStartDate(date)
    // }
    const formattedList = allOfNations.map((nation, idx) => {
        return { key: String(idx), id: Number(nation.nation_id), text: nation.nation_name, value: nation.nation_id, }
    })

    const { nation_id } = useParams();

    useEffect(() => {
        getAllOfNations();
        setTargetNationId(nation_id);
    },[])

    const handleSubmit = async () => {
        try {
            // const startDate = dayjs(startDate).format('YYYY-MM-DD')
            console.log('targetNationId ', targetNationId)
            console.log(dayjs(startDate).format('YYYYMMDD'))
            const res = await http.post('/donation_input', { user_id : 2, group_name : groupname, money : moneyvalue, date : dayjs(startDate).format('YYYY-MM-DD'), nations : targetNationId })
            if(res.data.message == 'Success'){
                return Alert.success('寄付記録を作成しました。');
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
                        <p　className="Labels">主な活動地域</p>
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
            <div style={{backgroundColor:"#bce2e8", height:"100vh"}}>
                <Navbar />
                <div className="FormSegment">
                <Segment inverted className="SegmentTop">
                    <Form inverted className="FormParent">
                        <Form.Group >
                        <Form.Input style={{ width:"100%"}} label='寄付先の団体名' placeholder='ex.Accept International' />
                        </Form.Group> 
                        <Form.Group >
                        <Form.Input label='寄付金額' placeholder='5,000円' />
                        </Form.Group>
                        {/* <Form.Group > */}
                        {/* <Form.Input fluid label='寄付した日付' placeholder='Last name' /> */}
                        <DatePicker  dateFormat="yyyy/MM/dd" selected={startDate} 
                        onChange={(date) => {setStartDate(date)}} />
                        {/* <DatePicker oneTap style={{ width: 280 }} /> */}
                        {/* </Form.Group> */}
                        <Form.Checkbox label='I agree to the Terms and Conditions' />
                        <Dropdown
                            placeholder='主な活動地域を選択してください。' 
                            fluid 
                            selection
                            options={formattedList}
                            onChange={(e, data) => { setTargetNationId(data.value); }}
                            defaultValue={Number(nation_id)}
                        ></Dropdown>
                        <Button type='submit' onClick={handleSubmit}>Submit</Button>
                    </Form>
                </Segment>
            </div>    
        </div>
        </MediaQuery>
        </>
    )
}
