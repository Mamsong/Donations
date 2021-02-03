import React from 'react'
import { List,FlexboxGrid,Icon } from 'rsuite';
import Navbar from './base/Navbar';
import '../css/Donation_list.css';


export default function Donation_list() {
    const data = [
        {
          title: 'Accept International',
          icon: 'image',
          creator: 'Yvnonne',
          date: '2017.10.13 14:50',
          peak: 3223,
          uv: 'Japan',
        },
        {
          title: 'Celebration of the Mid-Autumn festival',
          icon: 'image',
          creator: 'Daibiao',
          date: '2017.10.13 14:50',
          peak: 3223,
          uv: 'Thai',
        },
        {
          title: 'Live to play basketball',
          icon: 'film',
          creator: 'Bidetoo',
          date: '2017.10.13 14:50',
          peak: 4238,
          uv: 'Kenya',
        },
        {
          title: '2018 the legislature meeting broadcast live',
          icon: 'film',
          creator: 'Yvnonne',
          date: '2017.10.13 14:50',
          peak: 4238,
          uv: 'Somaria',
        },
        {
          title: 'Aiwanke paster',
          icon: 'image',
          creator: 'Tony',
          date: '2017.10.13 14:50',
          peak: 2321,
          uv: 'Indonasia',
        }
      ];
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
                <div className="Donation_Body">
                <div className="Donation_table">
                <List hover>
                {data.map((item, index) => (
                    <List.Item key={item['title']} index={index}>
                    <FlexboxGrid>
                        {/*icon*/}
                        <FlexboxGrid.Item colspan={2} style={styleCenter}>
                        <Icon
                            icon={item['icon']}
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
                        <div style={titleStyle}>{item['title']}</div>
                        <div style={slimText}>
                            {/* <div>
                            <Icon icon="user-circle-o" />
                            {' ' + item['creator']}
                            </div> */}
                            <div>{item['date']}</div>
                        </div>
                        </FlexboxGrid.Item>
                        {/*peak data*/}
                        <FlexboxGrid.Item colspan={6} style={styleCenter}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={slimText}>寄付金額</div>
                            <div style={dataStyle}>{item['peak'].toLocaleString()}</div>
                        </div>
                        </FlexboxGrid.Item>
                        {/*uv data*/}
                        <FlexboxGrid.Item colspan={6} style={styleCenter}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={slimText}>国</div>
                            <div style={dataStyle}>{item['uv'].toLocaleString()}</div>
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
            </div>
        </div>
    )
}
