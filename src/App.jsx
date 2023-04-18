import React from "react"
import {Layout,Typography,Space} from 'antd'
import NavBar from "./COMPONENTS/NavBar"
import "./COMPONENTS/App.css"
import { Link, Route, Routes } from "react-router-dom"
import HomePage from "./COMPONENTS/HomePage"
import Cryptocurrencies from "./COMPONENTS/Cryptocurrencies"
import News from "./COMPONENTS/News"
import Exchanges from "./COMPONENTS/Exchanges"
import CryptoDetails from "./COMPONENTS/CryptoDetails"


function App() {
  

  return (
    <div className="app">
         <div className="navbar">
           <NavBar/>
         </div>
         <div className="main">
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />}/>
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />}/>
              <Route path="/news" element={<News/>}/>
              <Route path="/exchanges" element={<Exchanges/>}/>
              <Route path="/crypto/:coinId" element={<CryptoDetails/>}/>
            </Routes>
          </Layout>
        
         <div className="footer">
          <Typography.Title level={5} style={{color:"white",textAlign:"center"}}>
            Crypto-verse<br/>
           copyright @ All  Rights are Reserved
          </Typography.Title>
          <Space>
          <Link to="/">Home</Link>
          <Link to="/exchanges" >Exchange</Link>
          <Link to="/news">News</Link>
          </Space>
         </div>
         </div>
    </div>
  )
}

export default App
