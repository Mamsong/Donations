import React, { useState, useEffect }from 'react'
import { useAuth } from '../hooks/useAuth';
import { useHttp } from '../hooks/useHttp';
import { List,FlexboxGrid,Icon } from 'rsuite';
import Navbar from './base/Navbar';
import TotalMoney from './TotalMoney';
import '../css/Donation_list.css';
import WorldMap from './WorldMap';
import { Alert } from 'rsuite';
import { Button, Modal } from 'semantic-ui-react';
import  * as jwt from 'jsonwebtoken';
import { useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { useDonationRecord } from '../hooks/useDonationRecord';

function exampleReducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false }
    case 'open':
      return { open: true, size: action.size }
    default:
      throw new Error('Unsupported action...')
  }
}

export default function Donation_list() {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  })
  const { open, size } = state

    const token = localStorage.getItem("token")
    const decoded_token = jwt.decode(token)
    const user_id = decoded_token.user_id
    const { http } = useHttp();
    const history = useHistory();

    const [ targetRecordId, setTargetRecordId ] = useState(0);


    const { donationData,
          getDonationList } = useDonationRecord();

    console.log('______donationData______', donationData);


    const [ offset, setOffset ] = useState(0); // 何番目のアイテムから表示するか
    const perPage = 4; // 1ページあたりに表示したいアイテムの数


    const handlePageChange = (data) => {
      let page_number = data['selected']; // クリックした部分のページ数が{selected: 2}のような形で返ってくる
      setOffset(page_number*perPage); // offsetを変更し、表示開始するアイテムの番号を変更
  }

    const deleteRecord = async () => {
      try {
        await http.post("/donation_list/delete", { record_id: targetRecordId})
        
        Alert.success("寄付記録の削除が完了しました。")

        dispatch({ type: 'close' });
      } catch (error) {
        Alert.error("寄付記録の削除に失敗しました。再度お試しください。")
        console.log(error)
      }

    }

    const { isLoggedIn } = useAuth()

    useEffect(() => {
      console.log(' USEEFFECT IS CALLED =======');
      getDonationList(user_id);
    },[open]);


    if (!isLoggedIn) return null
    
    const styleCenter = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60px'
    };
      
      const slimText = {
        fontSize: '0.666em',
        color: '#97969B',
        fontWeight: 'lighter',
        paddingBottom: 5
      };
      
      const titleStyle = {
        paddingBottom: 5,
        whiteSpace: 'nowrap',
        fontWeight: 500
      };
      
      const dataStyle = {
        fontSize: '1.2em',
        fontWeight: 500
      };
      
    return (
        <div style={{backgroundColor:"#64cafa"}}>
            <Navbar />
            <TotalMoney open={open}/>
            <div style={{display:"flex",justifyContent:"center"}}>
      
            <div className="WorldMapCont"><WorldMap open={open} />
            </div>
            </div>
                <div className="Donation_Body">
                <div className="Donation_table">
                  <div style={{color:"#0d3380",fontFamily:"cursive",fontSize:"20px", fontWeight:"bold", marginBottom:"4px"}}>寄付記録一覧</div>
                <List hover>
                  <div className="Donation_listCont">
                  {donationData
            .slice(offset, offset + perPage) // 表示したいアイテムをsliceで抽出
            .map((e)=>{
                return(
                  <List.Item key={e.record_id} index={e.record_id}>
                  <FlexboxGrid>
                      {/*icon*/}
                      <FlexboxGrid.Item colspan={2} style={styleCenter}>
                      <Icon
                          icon='money'
                          style={{
                          color: 'darkgrey',
                          fontSize: '1.5em'
                          }}
                      />
                      </FlexboxGrid.Item>
                      <FlexboxGrid.Item
                      colspan={6}
                      style={{
                          ...styleCenter,
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          overflow: 'hidden'
                      }}
                      >
                      <div style={titleStyle}>{ e.group_name } </div>
                      <div style={slimText}>
                          <div>{ e.date }</div>
                      </div>
                      </FlexboxGrid.Item>
                     
                      <FlexboxGrid.Item colspan={6} style={styleCenter}>
                      <div style={{ textAlign: 'right' }}>
                          <div style={slimText}>寄付金額</div>
                          <div style={dataStyle}>{ e.money }</div>
                      </div>
                      </FlexboxGrid.Item>
                      <FlexboxGrid.Item colspan={6} style={styleCenter}>
                      <div style={{ textAlign: 'left' }}>
                          <div style={slimText}>国</div>
                          <div style={dataStyle}>{ e.nation_name }</div>
                      </div>
                      </FlexboxGrid.Item>
                      <FlexboxGrid.Item
                      colspan={4}
                      style={{
                          ...styleCenter
                      }}
                      >
                      <a href="#">Edit</a>
                      <span style={{ padding: 5 }}>|</span>
                      <a href="#" onClick={() => { dispatch({ type: 'open', size: 'small' });  setTargetRecordId(e.record_id)} }>Delete</a>
                      </FlexboxGrid.Item>
                  </FlexboxGrid>
                </List.Item>)
            })}
                </div>
                </List>
            </div>
              
              <div className="Pagenation" style={{backgroundColor:"#64cafa"}}>
              
              <ReactPaginate
                    previousLabel={"前"}
                    nextLabel={"次"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={Math.ceil(donationData.length/perPage)} 
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
              </div>
            </div>
            <Modal
                size={size}
                open={open}
                onClose={() => dispatch({ type: 'close' })}
              >
                <Modal.Header>寄付記録を削除しますか？</Modal.Header>
                <Modal.Content>
                  <p>Are you sure you want to delete your record ?</p>
                </Modal.Content>
                <Modal.Actions>
                  <Button negative onClick={() => dispatch({ type: 'close' })}>
                    No
                  </Button>
                  <Button positive onClick={deleteRecord}>
                    Yes
                  </Button>
                </Modal.Actions>
              </Modal>
        </div>
    )
}
