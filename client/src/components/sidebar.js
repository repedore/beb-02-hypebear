import React from 'react'
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { FaWallet, FaTachometerAlt, FaGem, FaGithub, FaRegLaughWink} from 'react-icons/fa';
import bg from '../bg/bg1.jpg'
import { Link } from 'react-router-dom';

// 사이드 바 구현
const Sidebar = ({sideSize, connectWallet, account }) => {
    return (
        <ProSidebar
        image={bg}
        collapsed={sideSize}
        toggled={false}
        >
            <SidebarHeader
        >
                <div
                  style={{
                    padding: '24px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: 14,
                    letterSpacing: '1px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >  <FaWallet/> 
                    <a onClick={connectWallet} onfocus="this.blur()">
                       {account ?  account  : "Sign in" }
                    </a>

                </div>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem
                    icon={<FaTachometerAlt/>}
                    suffix={<span className="badge red">new</span>}
                    >
                        <Link to="/"> Home </Link>
                    </MenuItem>
                    <MenuItem icon={<FaGem />}>
                        <Link to="/profile"> MyWallet </Link>
                    </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                    <SubMenu
                    suffix={<span className="badge yellow"> 2 </span>}
                    title="Deal"
                    icon={<FaRegLaughWink/>}
                    >
                        <MenuItem> 
                            <Link to="/send"> Send </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/create"> Create </Link>
                        </MenuItem>
                    </SubMenu>
                </Menu>


            </SidebarContent>
            <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                      className="sidebar-btn-wrapper"
                      style={{
                        padding: '20px 24px',
                      }}
                    >
                    <a
                        href="https://github.com/codestates/beb-02-hypebear"
                        target="_blank"
                        className="sidebar-btn"
                        rel="noopener noreferrer"
                    >
                        <FaGithub />
                        <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            <p id="viewSource"> view sources</p>
                        </span>
                      </a>
                    </div>
              </SidebarFooter>
        </ProSidebar>
    );
}

export default Sidebar;
