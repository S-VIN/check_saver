import React, {useEffect, useState} from 'react';
import {Col, Row} from 'antd';

import CardWidget from "./CardWidget.jsx";


const ProductCardsWidget = ({productListProp, onDelete}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [productList, setProductList] = useState(productListProp)


    useEffect(() => {
        setProductList(productListProp)
    }, [productListProp]);


    const handleDelete = (uuid) => {
        onDelete(uuid)
    };


    return (<div
            style={{
                flex: 1,
                overflowY: 'auto',
                border: '1px solid #f0f0f0',
                borderRadius: '8px',
                padding: '4px',
                maxHeight: 'calc(100vh - 300px)', // Ограничиваем высоту, например, с учётом других элементов
            }}
        >
            <Row gutter={[0, 0]} justify="start">
                {productList.map((purchase, index) => (
                    <Col key={purchase.product.id} xs={24} sm={12} md={12} lg={12} xl={12}>
                        <CardWidget purchaseProp={purchase} onDelete={handleDelete}/>
                    </Col>))}
            </Row>
        </div>);
};

export default ProductCardsWidget;
