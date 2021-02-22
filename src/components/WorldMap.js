import React, { useState,useEffect } from 'react';
import { useHttp } from '../hooks/useHttp';
import { Alert } from 'rsuite';
import Chart from "react-google-charts";
import { Link, withRouter } from 'react-router-dom';
import { useWorldmap } from '../hooks/useWorldmap';

function WorldMap(){

    
    const {  nationData,
        getNationData } = useWorldmap();

    useEffect(() => {
        getNationData(2)
      },[]);

    const list = [['CountryKey','Donation'],['CG' ,6888]]
    // list.push([nationData[0].nation_key, nationData[0].sum]);
    
    // function sample() {
    //     return sampleResolve(5).then(result => {
    //         return result + 5;
    //     });
    // }

    return(
        <>
        <Chart  style={{marginTop:"10px"}}
                width={'750px'}
                height={'500px'}
                chartType="GeoChart"
                // data={list}
                data={[
                  ['CountryKey','Donation'],
                  ['CG' ,6888],
                  ['AL', 3444],
                  ['US' ,500]
                ]}
                options={{

                    colorAxis: { colors: ['#00853f', 'black', '#e31b23'] },
                    // backgroundColor: '#81d4fa'
                    backgroundColor: '#64cafa'
                    // backgroundColor: '#0d3380'
                  }}
                // Note: you will need to get a mapsApiKey for your project.
                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                mapsApiKey=""
                rootProps={{ 'data-testid': '1' }}
            />
        </>
    )
} 

export default withRouter(WorldMap);