import React from 'react';
import Chart from "react-google-charts";
import { Link, withRouter } from 'react-router-dom';

function WorldMap(){

    return(
        <>
        <Chart
                width={'700px'}
                height={'500px'}
                chartType="GeoChart"
                data={[
                  ['CountryKey','Donation'],
                  ['CG' ,6888],
                  ['AL', 3444],
                  ['US' ,500]
                ]}
                options={{

                    colorAxis: { colors: ['#00853f', 'black', '#e31b23'] },
                    backgroundColor: '#81d4fa'
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