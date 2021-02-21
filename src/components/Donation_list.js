import React, { useState, useEffect }from 'react'
import { List,FlexboxGrid,Icon } from 'rsuite';
import Navbar from './base/Navbar';
import '../css/Donation_list.css';
import WorldMap from './WorldMap';
import { Alert } from 'rsuite';
import { Button } from 'semantic-ui-react';

import { useDonationRecord } from '../hooks/useDonationRecord';

export default function Donation_list() {
    const [page, setPage] = useState(1);
    const [offset, setOffset] = useState(0);
    const [isSearched, setIsSearched] = useState(false);

    const { donationData,
          getDonationList } = useDonationRecord();

    const goToNextPage = () => {
      setOffset(offset + 4);
      setPage(page + 1);
      if(donationData.length < 4 && !isSearched) {
        setOffset(offset);
        setPage(page);
        return Alert.warning('該当するデータがありません。');
      }
    };

    const goToBeforePage = () => {
      if(page == 1) return Alert.warning('該当するデータがありません。');
      setOffset(offset - 4);
      setPage(page - 1);
    };

    useEffect(() => {
      getDonationList(2, offset);
    },[offset]);

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
        <div>
            <Navbar />
            <div className="WorldMapCont"><WorldMap /></div>
                <div className="Donation_Body">
                <div className="Donation_table">
                  <div>寄付記録一覧</div>
                <List hover>
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
                            {/* <div>
                            <Icon icon="user-circle-o" />
                            {' ' + item['creator']}
                            </div> */}
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
                        <a href="#">Delete</a>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                    </List.Item>
                ))}
                </List>
            </div>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button style={{ marginRight: '15px' }} onClick={goToBeforePage}>
                  前のページへ
                </Button>
                <Button onClick={goToNextPage}>次のページへ</Button>
                <div style={{ fontSize: '1.5em', marginTop: '10px' }}>- {page} -</div>
              </div>
            </div>
        </div>
    )
}
