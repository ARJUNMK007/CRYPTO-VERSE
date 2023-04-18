import { Card, Col, Row } from 'antd';
import millify from 'millify';
import React, { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from './CoinApi'

function Cryptocurrencies({simplified}) {
    const count=simplified? 10 :100;
    const{data:cryptoList,isLoading}=useGetCryptosQuery(count);
    const [crypto, setcrypto] = useState([]);
    const [searchTerm, setsearchTerm] = useState('')

    useEffect(() => {
       

        const filterData=cryptoList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setcrypto(filterData);
    }, [cryptoList,searchTerm])
    
  return (
    <>
    <div className='search-crypto'>
        { simplified? '':<input style={{width:200,height:30,padding:10,
            borderRadius:10,borderStyle:'none',color:'black'}} placeholder='Search Crypto' onChange={(e)=>setsearchTerm(e.target.value)}/>}
    </div>
    <Row gutter={[32,32]} className='crypto-card-container'>
        {crypto?.map((currency)=>(
               <Col xs={24} sm={12} lg={6}>
                <Link to={`/crypto/${currency.uuid}`}>
                    <Card title={`${currency.rank}.${currency.name}`} 
                    extra={<img className='crypto-image' src={currency.iconUrl}/>}
                    hoverable className='crypto-card'>
                          <p>Price:{millify(currency.price)}</p>  
                          <p>Market-Cap:{millify(currency.marketCap)}</p> 
                          <p>Daily-Change:{millify(currency.change)}</p> 
                    </Card>
                </Link>
               </Col>
        ))}
    </Row>
    </>
  )
}

export default Cryptocurrencies
