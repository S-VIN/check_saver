import React, {useEffect, useState} from 'react';
import CountWidget from "./CountWidget.jsx";
import {Typography} from 'antd';
import PriceWidget from "./PriceWidget.jsx";

const {Text} = Typography;

const PriceQuantitySelectWidget = ({priceProp, qtyProp, onPriceChange, onQtyChange}) => {
    const [price, setPrice] = useState()
    const [qty, setQty] = useState()

    useEffect(() => {
        setPrice(priceProp)
        setQty(qtyProp)
    }, [priceProp, qtyProp]);


    const handlePriceChange = (price) => {
        setPrice(price)
        onPriceChange(price)
    }

    const handleQtyChange = (qty) => {
        setQty(qty)
        onQtyChange(qty)
    }

    return (<div>
        <span style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0px'}}>
          <PriceWidget
              style={{width: '48%'}}
              onChange={handlePriceChange}
              value={price}
          />

          <CountWidget
              style={{width: '48%'}}
              onChange={handleQtyChange}
              value={qty}
          />
          </span>

            <Text type="secondary" style={{height: '16px', display: 'block', marginBottom: '8px', textAlign: 'left'}}>
                {!price || !qty ? ' ' : "total cost: " + (price * qty).toString() + "₽"}
            </Text>

        </div>);
};

export default PriceQuantitySelectWidget;