import { Avatar, Button, Menu, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { HomeOutlined,FundOutlined,MoneyCollectOutlined,BulbOutlined, MenuOutlined} from "@ant-design/icons"
import icon from '/icon.png'
import { useState,useEffect } from 'react'


function NavBar() {
  const [activeMenu, setactiveMenu] = useState(true)
  const [screenSize, setscreenSize] = useState(true)

  useEffect(() => {
       const handleResize=()=>setscreenSize(window.innerHeight);
       window.addEventListener('resize',handleResize);
       handleResize();
       return ()=>window.removeEventListener('resize',handleResize)
  }, [])
  useEffect(() => {
    if (screenSize !== null) {
      setactiveMenu(screenSize < 768 ? true : false)
    }


  }, [screenSize])
  return (
    <div  className='nav-container'>
        <div className='logo-container'>
            <Avatar  src={icon} size="large"/>
            <Typography.Title level={2} className="logo">
                <Link to="/">crypto-verse</Link>
            </Typography.Title>
                <Button className='menu-control-container' onClick={()=>setactiveMenu(!activeMenu)}>
                  <MenuOutlined/>
                 </Button>
        </div>
        {activeMenu?(
              <Menu theme='dark'>
              <Menu.Item icon={<HomeOutlined/>}>
              <Link to="/">HOME</Link>
              </Menu.Item>
              <Menu.Item icon={<FundOutlined/>} >
              <Link to="/cryptocurrencies">CryptoCurrencies</Link>
              </Menu.Item>
              <Menu.Item icon={<MoneyCollectOutlined/>}>
              <Link to="/exchanges">Exchanges</Link>
              </Menu.Item>
              <Menu.Item icon={<BulbOutlined/>}>
              <Link to="/news">News</Link>
              </Menu.Item>
            </Menu>
        ):null}
           
    </div>
  )
}

export default NavBar
