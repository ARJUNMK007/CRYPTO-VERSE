import { Avatar, Card, Col, Row, Typography,Select } from 'antd';

import Title from 'antd/es/typography/Title';
import React from 'react'
import { useGetCryptoNewsQuery } from './CryptoNewsApi'
import moment from 'moment'
import { useState } from 'react';
import { useGetCryptosQuery } from './CoinApi';

function News({simplified}) {

    const [newsCategory, setnewsCategory] = useState("Cryptocurrency")
    const nameUrl='https://www.google.com/imgres?imgurl=https%3A%2F%2Fcloudfront-us-east-1.images.arcpublishing.com%2Fcoindesk%2FPJTR3KRDWJCRVE3QREM6KUOK7A.png&tbnid=gCHXG9gOd9_56M&vet=12ahUKEwipgKLL8oL-AhX573MBHfn_D_8QMygTegUIARCNAg..i&imgrefurl=https%3A%2F%2Fwww.coindesk.com%2Fpodcasts%2Fmarkets-daily%2F&docid=oVi2nE5JV50PEM&w=4000&h=3000&q=crypto%20news&ved=2ahUKEwipgKLL8oL-AhX573MBHfn_D_8QMygTegUIARCNAg'
   
    const{data:cryptoNews,isLoading}=useGetCryptoNewsQuery
    ({newsCategory,count:simplified? 10:10});
    console.log(cryptoNews);
    const{data}=useGetCryptosQuery(100)

    if(!cryptoNews?.value) return '.....Loading .....please....wait for a moment'
  return (
    <Row gutter={[24,24]}>
        {simplified ?"" :( <Col span={24}>
        <Select
        showSearch
        className='select-news'
        placeholder="Select a Crypto"
        optionFilterProp='children'
        onChange={(value)=>setnewsCategory(value)}
        filterOption={(input,option)=>option.children.toLowerCase().indexOf(input.toLowerCase())>=0}
        >
         <Select.Option value="CryptoCurrency">CryptoCurrency</Select.Option>
         {data?.data?.coins.map((coin)=><Select.Option value={coin.name}>{coin.name}</Select.Option>)}
        </Select>
        </Col> )}
        {cryptoNews.value.map((news, i)=>(
             <Col xs={24} sm={12} lg={8} key={i}>
                <Card hoverable className='news-card'>
                    <a href={news.url} target="--blank" rel='noreferrer'>
                        <div className='news-image-container'>
                            <Title className='news-title' level={4}>{news.name}</Title>
                            <img src={news?.image?.thumbnail?.contentUrl}  alt="news"/>
                        </div>
                       
                        <p>{news.description >100 ? `${news.description.substring(0,100)}.....`
                        :news.description
                        }</p>
                        <div className='provider-container'>
                            <div>
                                <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl||nameUrl}/>
                                <Typography.Text className='provider-name'>{news?.provider[0]?.name}</Typography.Text>
                            </div>
                            <Typography.Text>{moment(news.datePublished).startOf('ss').fromNow()}</Typography.Text>
                        </div>
                    </a>
                </Card>
             </Col>
        ))}
        </Row>
  )
}

export default News
