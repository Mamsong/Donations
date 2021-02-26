import React, { useState, useEffect }from 'react'
import { useAuth } from '../hooks/useAuth';
import { useHttp } from '../hooks/useHttp';
import { List,FlexboxGrid,Icon } from 'rsuite';
import Navbar from './base/Navbar';
import '../css/Donation_list.css';
import WorldMap from './WorldMap';
import { Alert } from 'rsuite';
import { Button, Modal, Statistic } from 'semantic-ui-react';
import  * as jwt from 'jsonwebtoken';
import { useHistory } from 'react-router-dom';

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

    const [page, setPage] = useState(1);
    const [offset, setOffset] = useState(0);
    // const [isSearched, setIsSearched] = useState(false);

    const [ targetRecordId, setTargetRecordId ] = useState(0);


    const { donationData,
          getDonationList } = useDonationRecord();

    const goToNextPage = () => {
      setOffset(offset + 4);
      // setPage(page + 1);
      console.log(donationData)
      if(donationData.length < 4) {
        setOffset(offset);
        setPage(page);
        return Alert.warning('該当するデータがありません。');
      }
      setPage(page + 1);
    };

    const goToBeforePage = () => {
      if(page == 1) return Alert.warning('該当するデータがありません。');
      setOffset(offset - 4);
      setPage(page - 1);
    };

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
      getDonationList(user_id, offset);
    },[offset, open]);

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
            <div style={{display:"flex",justifyContent:"center"}}>
            <Statistic size='small' style={{marginTop:"1em"}}>
              <Statistic.Label>Total</Statistic.Label>
              <Statistic.Value>¥2,204</Statistic.Value>
            </Statistic>
            <div className="WorldMapCont"><WorldMap/>
            </div>
            </div>
                <div className="Donation_Body">
                <div className="Donation_table">
                  <div style={{color:"#0d3380",fontFamily:"cursive",fontSize:"20px", fontWeight:"bold", marginBottom:"4px"}}>寄付記録一覧</div>
                <List hover>
                  <div className="Donation_listCont">
                {donationData.map((e) => (
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
                          {/*base info*/}
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
                          {/*peak data*/}
                          <FlexboxGrid.Item colspan={6} style={styleCenter}>
                          <div style={{ textAlign: 'right' }}>
                              <div style={slimText}>寄付金額</div>
                              <div style={dataStyle}>{ e.money }</div>
                          </div>
                          </FlexboxGrid.Item>
                          {/*uv data*/}
                          <FlexboxGrid.Item colspan={6} style={styleCenter}>
                          <div style={{ textAlign: 'left' }}>
                              <div style={slimText}>国</div>
                              <div style={dataStyle}>{ e.nation_name }</div>
                          </div>
                          </FlexboxGrid.Item>
                          {/*uv data*/}
                          <FlexboxGrid.Item
                          colspan={4}
                          style={{
                              ...styleCenter
                          }}
                          >
                          <a href="#">Detail</a>
                          <span style={{ padding: 5 }}>|</span>
                          <a href="#">Edit</a>
                          <span style={{ padding: 5 }}>|</span>
                          <a href="#" onClick={() => { dispatch({ type: 'open', size: 'small' });  setTargetRecordId(e.record_id)} }>Delete</a>
                          </FlexboxGrid.Item>
                      </FlexboxGrid>
                    </List.Item>
                    
                ))}
                </div>
                </List>
            </div>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button style={{ marginRight: '15px' }} onClick={goToBeforePage}>
                  前のページへ
                </Button>
                <Button onClick={goToNextPage}>次のページへ</Button>
                <div style={{ fontSize: '1.5em', marginTop: '10px',marginBottom:"10px" }}>- {page} -</div>
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
