import React, { useState,useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import  * as jwt from 'jsonwebtoken';
import { Loader,Statistic } from 'semantic-ui-react'
import { useTotal } from '../hooks/useTotal';

function TotalMoney() {

    const { totalData,
        getTotalMoney } = useTotal();

    const token = localStorage.getItem("token")
    const decoded_token = jwt.decode(token)
    const user_id = decoded_token.user_id

    useEffect(() => {
        if(totalData.length == 0) {
            getTotalMoney(user_id)  
        } 
      },[totalData]);

      if(totalData.length == 0) return <Loader active inline='centered'/>

      if(totalData[0].sum == null) return(
        <>
        <Statistic size='tiny' style={{margin:"1em 0 -80px 10%"}}>
            <Statistic.Label>Total</Statistic.Label>
            <Statistic.Value>¥0</Statistic.Value>
          </Statistic>
        </>
    )
    console.log(totalData)

      if(totalData.length > 0) {
        return(
            <>
            <Statistic size='tiny' style={{margin:"1em 0 -80px 10%"}}>
                <Statistic.Label>Total</Statistic.Label>
                <Statistic.Value>¥{totalData[0].sum.toLocaleString()}</Statistic.Value>
              </Statistic>
            </>
        )
      }
      
}

export default withRouter(TotalMoney);