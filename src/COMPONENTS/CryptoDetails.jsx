import { CheckOutlined, DollarCircleOutlined, ExclamationCircleOutlined, FundOutlined, MoneyCollectOutlined, NumberOutlined, StopOutlined, ThunderboltOutlined, TrophyOutlined } from '@ant-design/icons'
import { Col,Row,Select } from 'antd'
import ReactHtmlParser from 'html-react-parser'
import Title from 'antd/es/typography/Title'
import Text from 'antd/es/typography/Text'
import millify from 'millify'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetCryptosDeatilsQuery } from './CoinApi'
import { useGetCryptosHistoryQuery } from './CoinApi'

function CryptoDeatails() {
    const{coinId}=useParams()
    const{data,isLoading}=useGetCryptosDeatilsQuery(coinId)
    const cryptoDetails=data?.data?.coin;
    console.log(cryptoDetails);
    console.log(cryptoDetails?.approvedSupply)
    const[timePeriod,SetTimePeriod]=useState('7d')
     const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
     const{data:coinHistory}=useGetCryptosHistoryQuery(coinId,timePeriod)
     console.log(coinHistory)

     const stats = [
      { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
      { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
      { title: '24h Volume', value: `$ ${cryptoDetails?.Volume && millify(cryptoDetails?.Volume)}`, icon: <ThunderboltOutlined /> },
      { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
      { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails?.allTimeHigh.price)}`, icon: <TrophyOutlined /> },  
     ];
  
     const genericStats = [
       { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
       { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
       { title: 'Aprroved Supply', value: cryptoDetails?.supply.confirmed? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
       { title: 'Total Supply', value: `$ ${millify(cryptoDetails?.supply.supplyAt)}`, icon: <ExclamationCircleOutlined /> },
       { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails?.supply.circulating)}`, icon: <ExclamationCircleOutlined /> },
     ];
  return (
    <Col className='coin-detail-cointainer'>
        <Col className='coin-heading-cointainer'>
          <Title level={2} className='coin-name'>
                   {cryptoDetails?.name}({cryptoDetails?.symbol})price
          </Title>
          <p>{cryptoDetails?.name} Live price in US Dollar,
          view value statistics,Marketcap and Supply
          </p>
        </Col>
        <Select 
            defaultValue="7d"
            className='select-timeperiod'
            placeholder='select Time Period'
            onChange={(value)=>SetTimePeriod(value)}
        >
           {time.map((date)=><Option key={date}>{date}</Option>)} 
        </Select>
       {/* { linechart} */}
       <Col className='stats-container'>
           <Col className='coin-value-statistics'>
               <Col className='coin-value-statistics-heading'>
                   <Title level={3}className='coin-details-heading'>
                   {cryptoDetails?.name}Value Statistics
                  </Title>
                  <p>
                    An Overview showing the stats of {cryptoDetails?.name}
                  </p>
                </Col>
                {stats.map(({icon,title,value})=>(
                  <Col className='coin-stats'>
                    <Col className='coin-stas-name'>
                      <Text>{icon}</Text>
                      <Text>{title}</Text>
                    </Col>
                    <Text>{value}</Text>
                  </Col>

                ))}
            </Col>
            <Col className='other-stats-info'>
               <Col className='coin-value-statistics-heading'>
                   <Title level={3}className='coin-details-heading'>
                   Crpto-Detail Value Statistics
                  </Title>
                  <p>
                  An Overview showing the stats of all Crypto-Currencies
                  </p>
                </Col>
                {genericStats.map(({icon,title,value})=>(
                  <Col className='coin-stats'>
                    <Col className='coin-stas-name'>
                      <Text>{icon}</Text>
                      <Text>{title}</Text>
                    </Col>
                    <Text>{value}</Text>
                  </Col>

                ))}
            </Col>
         </Col>
         <Col className='coin-desc-link'>
             <Row className='coin-desc'>
              <Title  level={3} className='coin-details-heading'>
                    What is {cryptoDetails?.name}
                    {/* {{ReactHtmlParser(cryptoDetails?.description)}} */}<p>Update...Coming....</p>
              </Title>
            </Row>
            <Col className='coin-links'>
              <Title level={3} className='coin-details-heading'>
                {cryptoDetails?.name} Links
              </Title>
              {cryptoDetails?.links.map((link)=>(
                <Row className='coin-link' key={link.name}>
                  <Title className='link-name' level={5}>
                    {link.type} 
                  </Title>
                  <a href={link.url} target='_blank' rel='noreferrer'>
                       {link.name}
                  </a>
                </Row>
              ))}
            </Col>
         </Col>
    </Col>
  )
}

export default CryptoDeatails
