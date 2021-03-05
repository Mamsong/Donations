import React, { useReducer,useEffect } from 'react';
import Chart from "react-google-charts";
import { withRouter } from 'react-router-dom';
import { useWorldmap } from '../hooks/useWorldmap';
import  * as jwt from 'jsonwebtoken';
import { Loader } from 'semantic-ui-react'


function WorldMap({ open }){

    
    const { nationData, getNationData } = useWorldmap();

    const token = localStorage.getItem("token")
    const decoded_token = jwt.decode(token)
    const user_id = decoded_token.user_id

    useEffect(() => {
      
        getNationData(user_id)  
      
    },[open]);
    
    let list = [];
    if(nationData.length == 0){
      list = [['CountryKey','Donation(¥)']]
    } 

    if(nationData.length > 0) {
      list = [['CountryKey','Donation(¥)']]
      for(let i = 0; i < nationData.length; i ++){
        list.push([nationData[i].nation_key, nationData[i].sum]);
      }

    }


    // if(nationData.length == 0) return <Loader active inline='centered' />

    return(
        <>
        <Chart  style={{marginTop:"10px"}}
                width={'800px'}
                height={'540px'}
                
                chartType="GeoChart"
                data={
                  // ['CountryKey','Donation'],
                  // ['CG' ,6888],
                  list
                }
                options={{

                    colorAxis: { colors: ['#FFFACD','#00FF00','#018d5b'] },
                    // #2e8b57
                    // backgroundColor: '#81d4fa'
                    backgroundColor: '#64cafa'
                    // backgroundColor: '#0d3380'
                  }}
                // Note: you will need to get a mapsApiKey for your project.
                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                mapsApiKey="AIzaSyDd00dFepxFJrbIuMW_lfiYSrEgTyVsdq8"
                rootProps={{ 'data-testid': '1' }}
            />
        </>
    )
} 

export default withRouter(WorldMap);