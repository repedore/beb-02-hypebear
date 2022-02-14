import React from 'react';
import Switch from 'react-switch';
import { FaHeart, FaBars, FaSearch } from 'react-icons/fa';

const Header = ({
    handleResizeSide,
    sideSize
}) => {
    return (
        <div className="topNav">
            <div>
                <form className="header-form">
                    <FaSearch />
                    <input type="text" placeholder="Search" name="search"/>
                </form>
            </div>
            <div className="block">
                <Switch
                  height={16}
                  width={30}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  onChange={handleResizeSide}
                  checked={sideSize}
                  onColor="#219de9"
                  offColor="#bbbbbb"
                />
                <span>resize</span>
            </div>
        </div>
    );
}

export default Header;
