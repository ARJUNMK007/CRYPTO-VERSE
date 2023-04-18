import { Col, Row, Statistic } from 'antd'
import Title from 'antd/es/typography/Title'
import millify from 'millify'
import React from 'react'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../COMPONENTS/CoinApi'
import Cryptocurrencies from './Cryptocurrencies'
import News from './News'
function HomePage() {
    
    const { data, isFetching, isLoading } = useGetCryptosQuery(10);
    console.log(data)
    if (isLoading) {
      return <p>Loading...</p>;
    }
    const globalStats=data?.data?.stats;
  return (
   < >
   <Title  style={{padding:10}} level={2}>Global Crypto-Statistics</Title>
   <Row>
    <Col span={12} title="current exchanges" style={{padding:10}}><Statistic title="Total Crypto-Currencies" value={globalStats?.total}/></Col>
    <Col span={12} title="current exchanges" style={{padding:10}}><Statistic title="Total Exchanges" value={millify(globalStats?.totalExchanges)}/></Col>
    <Col span={12} title="current exchanges" style={{padding:10}}><Statistic title="Total Market-Cap" value={millify(globalStats?.totalMarketCap)}/></Col>
    <Col span={12} title="current exchanges" style={{padding:10}}><Statistic title="Total 24Hrs Volume" value={millify(globalStats?.total24hVolume)}/></Col>
    <Col span={12} title="current exchanges" style={{padding:10}}><Statistic title="Total Markets" value={millify(globalStats?.totalMarkets)}/></Col>
   </Row>
   <div className='home-heading-container'>
       <Title level={3} className='home-title'>Top 10 CryptoCurrencies</Title>
       <Title level={4} className='show-more'><Link to="/cryptocurrencies">show more</Link> </Title>
   </div>
   <Cryptocurrencies simplified/>
   <div className='home-heading-container' style={{paddingLeft:10}}>
       <Title style={{padding:10}} level={3} className='home-title'>Top Crypto-News</Title>
       <Title level={4} className='show-more'><Link to="/news">show more</Link> </Title>
   </div>
   <News simplified/>
   </>
  )
}

export default HomePage
