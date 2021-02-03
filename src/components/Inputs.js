import React ,{useState} from 'react';
import MediaQuery from "react-responsive";
import '../css/Inputs.css';
import { Dropdown,Button,Form, Segment, Input, Label } from 'semantic-ui-react';
import Navbar from '../components/base/Navbar';
// import { DatePicker } from 'rsuite';
import DatePicker from "react-datepicker";
import dayjs from 'dayjs';

export default function Inputs() {
    const countryOptions = [
        {key:"AF",value:"AF",text:"Afghanistan"}
        ,{key:"AL",value:"AL",text:"Albania"}
        ,{key:"DZ",value:"DZ",text:"Algeria"}
        ,{key:"AS",value:"AS",text:"American Samoa"}
        ,{key:"AD",value:"AD",text:"Andorra"}
        ,{key:"AG",value:"AG",text:"Angola"}
        ,{key:"AI",value:"AI",text:"Anguilla"}
        ,{key:"AG",value:"AG",text:"Antigua & Barbuda"}
        ,{key:"AR",value:"AR",text:"Argentina"}
        ,{key:"AA",value:"AA",text:"Armenia"}
        ,{key:"AW",value:"AW",text:"Aruba"}
        ,{key:"AU",value:"AU",text:"Australia"}
        ,{key:"AT",value:"AT",text:"Austria"}
        ,{key:"AZ",value:"AZ",text:"Azerbaijan"}
        ,{key:"BS",value:"BS",text:"Bahamas"}
        ,{key:"BH",value:"BH",text:"Bahrain"}
        ,{key:"BD",value:"BD",text:"Bangladesh"}
        ,{key:"BB",value:"BB",text:"Barbados"}
        ,{key:"BY",value:"BY",text:"Belarus"}
        ,{key:"BE",value:"BE",text:"Belgium"}
        ,{key:"BZ",value:"BZ",text:"Belize"}
        ,{key:"BJ",value:"BJ",text:"Benin"}
        ,{key:"BM",value:"BM",text:"Bermuda"}
        ,{key:"BT",value:"BT",text:"Bhutan"}
        ,{key:"BO",value:"BO",text:"Bolivia"}
        ,{key:"BL",value:"BL",text:"Bonaire"}
        ,{key:"BA",value:"BA",text:"Bosnia & Herzegovina"}
        ,{key:"BW",value:"BW",text:"Botswana"}
        ,{key:"BR",value:"BR",text:"Brazil"}
        ,{key:"BC",value:"BC",text:"British Indian Ocean Ter"}
        ,{key:"BN",value:"BN",text:"Brunei"}
        ,{key:"BG",value:"BG",text:"Bulgaria"}
        ,{key:"BF",value:"BF",text:"Burkina Faso"}
        ,{key:"BI",value:"BI",text:"Burundi"}
        ,{key:"KH",value:"KH",text:"Cambodia"}
        ,{key:"CM",value:"CM",text:"Cameroon"}
        ,{key:"CA",value:"CA",text:"Canada"}
        ,{key:"IC",value:"IC",text:"Canary Islands"}
        ,{key:"CV",value:"CV",text:"Cape Verde"}
        ,{key:"KY",value:"KY",text:"Cayman Islands"}
        ,{key:"CF",value:"CF",text:"Central African Republic"}
        ,{key:"TD",value:"TD",text:"Chad"}
        ,{key:"CD",value:"CD",text:"Channel Islands"}
        ,{key:"CL",value:"CL",text:"Chile"}
        ,{key:"CN",value:"CN",text:"China"}
        ,{key:"CI",value:"CI",text:"Christmas Island"}
        ,{key:"CS",value:"CS",text:"Cocos Island"}
        ,{key:"CO",value:"CO",text:"Colombia"}
        ,{key:"CC",value:"CC",text:"Comoros"}
        ,{key:"CG",value:"CG",text:"Congo"}
        ,{key:"CK",value:"CK",text:"Cook Islands"}
        ,{key:"CR",value:"CR",text:"Costa Rica"}
        ,{key:"CT",value:"CT",text:"Cote D'Ivoire"}
        ,{key:"HR",value:"HR",text:"Croatia"}
        ,{key:"CU",value:"CU",text:"Cuba"}
        ,{key:"CB",value:"CB",text:"Curacao"}
        ,{key:"CY",value:"CY",text:"Cyprus"}
        ,{key:"CZ",value:"CZ",text:"Czech Republic"}
        ,{key:"DK",value:"DK",text:"Denmark"}
        ,{key:"DJ",value:"DJ",text:"Djibouti"}
        ,{key:"DM",value:"DM",text:"Dominica"}
        ,{key:"DO",value:"DO",text:"Dominican Republic"}
        ,{key:"TM",value:"TM",text:"East Timor"}
        ,{key:"EC",value:"EC",text:"Ecuador"}
        ,{key:"EG",value:"EG",text:"Egypt"}
        ,{key:"SV",value:"SV",text:"El Salvador"}
        ,{key:"GQ",value:"GQ",text:"Equatorial Guinea"}
        ,{key:"ER",value:"ER",text:"Eritrea"}
        ,{key:"EE",value:"EE",text:"Estonia"}
        ,{key:"ET",value:"ET",text:"Ethiopia"}
        ,{key:"FA",value:"FA",text:"Falkland Islands"}
        ,{key:"FO",value:"FO",text:"Faroe Islands"}
        ,{key:"FJ",value:"FJ",text:"Fiji"}
        ,{key:"FI",value:"FI",text:"Finland"}
        ,{key:"FR",value:"FR",text:"France"}
        ,{key:"GF",value:"GF",text:"French Guiana"}
        ,{key:"PF",value:"PF",text:"French Polynesia"}
        ,{key:"FS",value:"FS",text:"French Southern Ter"}
        ,{key:"GA",value:"GA",text:"Gabon"}
        ,{key:"GM",value:"GM",text:"Gambia"}
        ,{key:"GE",value:"GE",text:"Georgia"}
        ,{key:"DE",value:"DE",text:"Germany"}
        ,{key:"GH",value:"GH",text:"Ghana"}
        ,{key:"GI",value:"GI",text:"Gibraltar"}
        ,{key:"GB",value:"GB",text:"Great Britain"}
        ,{key:"GR",value:"GR",text:"Greece"}
        ,{key:"GL",value:"GL",text:"Greenland"}
        ,{key:"GD",value:"GD",text:"Grenada"}
        ,{key:"GP",value:"GP",text:"Guadeloupe"}
        ,{key:"GU",value:"GU",text:"Guam"}
        ,{key:"GT",value:"GT",text:"Guatemala"}
        ,{key:"GN",value:"GN",text:"Guinea"}
        ,{key:"GY",value:"GY",text:"Guyana"}
        ,{key:"HT",value:"HT",text:"Haiti"}
        ,{key:"HW",value:"HW",text:"Hawaii"}
        ,{key:"HN",value:"HN",text:"Honduras"}
        ,{key:"HK",value:"HK",text:"Hong Kong"}
        ,{key:"HU",value:"HU",text:"Hungary"}
        ,{key:"IS",value:"IS",text:"Iceland"}
        ,{key:"IN",value:"IN",text:"India"}
        ,{key:"ID",value:"ID",text:"Indonesia"}
        ,{key:"IA",value:"IA",text:"Iran"}
        ,{key:"IQ",value:"IQ",text:"Iraq"}
        ,{key:"IR",value:"IR",text:"Ireland"}
        ,{key:"IM",value:"IM",text:"Isle of Man"}
        ,{key:"IL",value:"IL",text:"Israel"}
        ,{key:"IT",value:"IT",text:"Italy"}
        ,{key:"JM",value:"JM",text:"Jamaica"}
        ,{key:"JP",value:"JP",text:"Japan"}
        ,{key:"JO",value:"JO",text:"Jordan"}
        ,{key:"KZ",value:"KZ",text:"Kazakhstan"}
        ,{key:"KE",value:"KE",text:"Kenya"}
        ,{key:"KI",value:"KI",text:"Kiribati"}
        ,{key:"NK",value:"NK",text:"Korea North"}
        ,{key:"KS",value:"KS",text:"Korea South"}
        ,{key:"KW",value:"KW",text:"Kuwait"}
        ,{key:"KG",value:"KG",text:"Kyrgyzstan"}
        ,{key:"LA",value:"LA",text:"Laos"}
        ,{key:"LV",value:"LV",text:"Latvia"}
        ,{key:"LB",value:"LB",text:"Lebanon"}
        ,{key:"LS",value:"LS",text:"Lesotho"}
        ,{key:"LR",value:"LR",text:"Liberia"}
        ,{key:"LY",value:"LY",text:"Libya"}
        ,{key:"LI",value:"LI",text:"Liechtenstein"}
        ,{key:"LT",value:"LT",text:"Lithuania"}
        ,{key:"LU",value:"LU",text:"Luxembourg"}
        ,{key:"MO",value:"MO",text:"Macau"}
        ,{key:"MK",value:"MK",text:"Macedonia"}
        ,{key:"MG",value:"MG",text:"Madagascar"}
        ,{key:"MY",value:"MY",text:"Malaysia"}
        ,{key:"MW",value:"MW",text:"Malawi"}
        ,{key:"MV",value:"MV",text:"Maldives"}
        ,{key:"ML",value:"ML",text:"Mali"}
        ,{key:"MT",value:"MT",text:"Malta"}
        ,{key:"MH",value:"MH",text:"Marshall Islands"}
        ,{key:"MQ",value:"MQ",text:"Martinique"}
        ,{key:"MR",value:"MR",text:"Mauritania"}
        ,{key:"MU",value:"MU",text:"Mauritius"}
        ,{key:"ME",value:"ME",text:"Mayotte"}
        ,{key:"MX",value:"MX",text:"Mexico"}
        ,{key:"MI",value:"MI",text:"Midway Islands"}
        ,{key:"MD",value:"MD",text:"Moldova"}
        ,{key:"MC",value:"MC",text:"Monaco"}
        ,{key:"MN",value:"MN",text:"Mongolia"}
        ,{key:"MS",value:"MS",text:"Montserrat"}
        ,{key:"MA",value:"MA",text:"Morocco"}
        ,{key:"MZ",value:"MZ",text:"Mozambique"}
        ,{key:"MM",value:"MM",text:"Myanmar"}
        ,{key:"NA",value:"NA",text:"Nambia"}
        ,{key:"NU",value:"NU",text:"Nauru"}
        ,{key:"NP",value:"NP",text:"Nepal"}
        ,{key:"AN",value:"AN",text:"Netherland Antilles"}
        ,{key:"NL",value:"NL",text:"Netherlands (Holland, Europe)"}
        ,{key:"NV",value:"NV",text:"Nevis"}
        ,{key:"NC",value:"NC",text:"New Caledonia"}
        ,{key:"NZ",value:"NZ",text:"New Zealand"}
        ,{key:"NI",value:"NI",text:"Nicaragua"}
        ,{key:"NE",value:"NE",text:"Niger"}
        ,{key:"NG",value:"NG",text:"Nigeria"}
        ,{key:"NW",value:"NW",text:"Niue"}
        ,{key:"NF",value:"NF",text:"Norfolk Island"}
        ,{key:"NO",value:"NO",text:"Norway"}
        ,{key:"OM",value:"OM",text:"Oman"}
        ,{key:"PK",value:"PK",text:"Pakistan"}
        ,{key:"PW",value:"PW",text:"Palau Island"}
        ,{key:"PS",value:"PS",text:"Palestine"}
        ,{key:"PA",value:"PA",text:"Panama"}
        ,{key:"PG",value:"PG",text:"Papua New Guinea"}
        ,{key:"PY",value:"PY",text:"Paraguay"}
        ,{key:"PE",value:"PE",text:"Peru"}
        ,{key:"PH",value:"PH",text:"Philippines"}
        ,{key:"PO",value:"PO",text:"Pitcairn Island"}
        ,{key:"PL",value:"PL",text:"Poland"}
        ,{key:"PT",value:"PT",text:"Portugal"}
        ,{key:"PR",value:"PR",text:"Puerto Rico"}
        ,{key:"QA",value:"QA",text:"Qatar"}
        ,{key:"ME",value:"ME",text:"Republic of Montenegro"}
        ,{key:"RS",value:"RS",text:"Republic of Serbia"}
        ,{key:"RE",value:"RE",text:"Reunion"}
        ,{key:"RO",value:"RO",text:"Romania"}
        ,{key:"RU",value:"RU",text:"Russia"}
        ,{key:"RW",value:"RW",text:"Rwanda"}
        ,{key:"NT",value:"NT",text:"St Barthelemy"}
        ,{key:"EU",value:"EU",text:"St Eustatius"}
        ,{key:"HE",value:"HE",text:"St Helena"}
        ,{key:"KN",value:"KN",text:"St Kitts-Nevis"}
        ,{key:"LC",value:"LC",text:"St Lucia"}
        ,{key:"MB",value:"MB",text:"St Maarten"}
        ,{key:"PM",value:"PM",text:"St Pierre & Miquelon"}
        ,{key:"VC",value:"VC",text:"St Vincent & Grenadines"}
        ,{key:"SP",value:"SP",text:"Saipan"}
        ,{key:"SO",value:"SO",text:"Samoa"}
        ,{key:"AS",value:"AS",text:"Samoa American"}
        ,{key:"SM",value:"SM",text:"San Marino"}
        ,{key:"ST",value:"ST",text:"Sao Tome & Principe"}
        ,{key:"SA",value:"SA",text:"Saudi Arabia"}
        ,{key:"SN",value:"SN",text:"Senegal"}
        ,{key:"RS",value:"RS",text:"Serbia"}
        ,{key:"SC",value:"SC",text:"Seychelles"}
        ,{key:"SL",value:"SL",text:"Sierra Leone"}
        ,{key:"SG",value:"SG",text:"Singapore"}
        ,{key:"SK",value:"SK",text:"Slovakia"}
        ,{key:"SI",value:"SI",text:"Slovenia"}
        ,{key:"SB",value:"SB",text:"Solomon Islands"}
        ,{key:"OI",value:"OI",text:"Somalia"}
        ,{key:"ZA",value:"ZA",text:"South Africa"}
        ,{key:"ES",value:"ES",text:"Spain"}
        ,{key:"LK",value:"LK",text:"Sri Lanka"}
        ,{key:"SD",value:"SD",text:"Sudan"}
        ,{key:"SR",value:"SR",text:"Suriname"}
        ,{key:"SZ",value:"SZ",text:"Swaziland"}
        ,{key:"SE",value:"SE",text:"Sweden"}
        ,{key:"CH",value:"CH",text:"Switzerland"}
        ,{key:"SY",value:"SY",text:"Syria"}
        ,{key:"TA",value:"TA",text:"Tahiti"}
        ,{key:"TW",value:"TW",text:"Taiwan"}
        ,{key:"TJ",value:"TJ",text:"Tajikistan"}
        ,{key:"TZ",value:"TZ",text:"Tanzania"}
        ,{key:"TH",value:"TH",text:"Thailand"}
        ,{key:"TG",value:"TG",text:"Togo"}
        ,{key:"TK",value:"TK",text:"Tokelau"}
        ,{key:"TO",value:"TO",text:"Tonga"}
        ,{key:"TT",value:"TT",text:"Trinidad & Tobago"}
        ,{key:"TN",value:"TN",text:"Tunisia"}
        ,{key:"TR",value:"TR",text:"Turkey"}
        ,{key:"TU",value:"TU",text:"Turkmenistan"}
        ,{key:"TC",value:"TC",text:"Turks & Caicos Is"}
        ,{key:"TV",value:"TV",text:"Tuvalu"}
        ,{key:"UG",value:"UG",text:"Uganda"}
        ,{key:"UA",value:"UA",text:"Ukraine"}
        ,{key:"AE",value:"AE",text:"United Arab Emirates"}
        ,{key:"GB",value:"GB",text:"United Kingdom"}
        ,{key:"US",value:"US",text:"United States of America"}
        ,{key:"UY",value:"UY",text:"Uruguay"}
        ,{key:"UZ",value:"UZ",text:"Uzbekistan"}
        ,{key:"VU",value:"VU",text:"Vanuatu"}
        ,{key:"VS",value:"VS",text:"Vatican City State"}
        ,{key:"VE",value:"VE",text:"Venezuela"}
        ,{key:"VN",value:"VN",text:"Vietnam"}
        ,{key:"VB",value:"VB",text:"Virgin Islands (Brit)"}
        ,{key:"VA",value:"VA",text:"Virgin Islands (USA)"}
        ,{key:"WK",value:"WK",text:"Wake Island"}
        ,{key:"WF",value:"WF",text:"Wallis & Futana Is"}
        ,{key:"YE",value:"YE",text:"Yemen"}
        ,{key:"ZR",value:"ZR",text:"Zaire"}
        ,{key:"ZM",value:"ZM",text:"Zambia"}
        ,{key:"ZW",value:"ZW",text:"Zimbabwe"}
    ]

    const [currentDate, setNewDate] = useState(null);
    const [startDate, setStartDate] = useState(new Date());

    const onChangeDate = (event, data) => { 
        setNewDate(dayjs(event).format('YYYY-MM-DD')); 
      }

    // const selectFilteredDate = (date) => {
    // const now = dayjs().format("YYYY-MM-DD");
    // }


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
                            <Form.Input className="GroupName" placeholder='ex.Accept International' />
                        </div>
                        <div className="Input1">
                        <p　className="Labels">寄付金額</p>
                        <Input labelPosition='right' type='text' placeholder='5000'>
                            <Label basic>¥</Label>
                            <input />
                            {/* <Label>.00</Label> */}
                        </Input>
                        {/* <Form.Input placeholder='5,000円' /> */}
                        </div>
                        <div className="Input1">
                        <p　className="Labels">寄付した日付</p>
                        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                        </div>
                        {/* <Form.Checkbox label='I agree to the Terms and Conditions' /> */}
                        <div className="Input1">
                        <p　className="Labels">主な活動地域</p>
                            <Dropdown
                                clearable
                                fluid
                                multiple
                                search
                                selection
                                options={countryOptions}
                                placeholder='Select Country'
                            /></div>
                        <Button color="blue" type='submit'>Submit</Button>
                    </Form>
                </div>
                </div>
            </div>
            {/* <div style={{backgroundColor:"#bce2e8", height:"100vh"}}>
                <Navbar />
                <div className="FormSegment">
                <Segment inverted className="SegmentTop">
                    <div>寄付金記録作成</div>
                    <Form inverted className="FormParent">
                        <Form.Group >
                        <Form.Input label='寄付先の団体名' placeholder='ex.Accept International' />
                        </Form.Group> 
                        <Form.Group >
                        <Form.Input label='寄付金額' placeholder='5,000円' />
                        </Form.Group>
                        
                        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                        
                        <Form.Checkbox label='I agree to the Terms and Conditions' />
                        <Dropdown
                            clearable
                            fluid
                            multiple
                            search
                            selection
                            options={countryOptions}
                            placeholder='Select Country'
                        />
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Segment>
            </div>    
        </div> */}
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
                        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                        {/* <DatePicker oneTap style={{ width: 280 }} /> */}
                        {/* </Form.Group> */}
                        <Form.Checkbox label='I agree to the Terms and Conditions' />
                        <Dropdown
                            clearable
                            fluid
                            multiple
                            search
                            selection
                            options={countryOptions}
                            placeholder='Select Country'
                        />
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Segment>
            </div>    
        </div>
        </MediaQuery>
        </>
    )
}
