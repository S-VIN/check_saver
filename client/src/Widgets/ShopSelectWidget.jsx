import React, {useEffect, useState} from 'react';
import {AutoComplete, message} from 'antd';
import axios from 'axios';
import {ApiUrl} from "../config.jsx";

import {ShopOutlined} from '@ant-design/icons';

const ShopSelectWidget = ({value, onChange}) => {
    const [shops, setShops] = useState([]);
    const [filteredShops, setFilteredShops] = useState([]);

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await axios.get(ApiUrl + '/purchases/shop/unique');
                setShops(response.data);
                setFilteredShops(response.data);
            } catch (error) {
                message.error('Downloading shops error');
                console.error(error);
            }
        };

        fetchShops();
    }, []);

    const handleSearch = (searchValue) => {
        setFilteredShops(shops.filter((shop) => shop.toLowerCase().includes(searchValue.toLowerCase())));
    };

    return (<AutoComplete
            placeholder="shop"
            style={{width: '48%'}}
            allowClear
            options={filteredShops.map((shop) => ({value: shop}))}
            value={value}
            onChange={onChange}
            onSearch={handleSearch}
            filterOption={false}
            suffixIcon={<ShopOutlined style={{marginRight: '8px', color: 'rgba(0, 0, 0, 0.45)'}}/>}
        />);
};

export default ShopSelectWidget;