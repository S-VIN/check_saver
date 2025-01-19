import React, {useEffect, useState} from 'react';
import {Button, Table, Tag} from 'antd';


import {DeleteTwoTone} from '@ant-design/icons';


const TableProductWidget = ({productListProp, onDelete}) => {
    const [productList, setProductList] = useState(productListProp)

    const columns = [{
        title: <span style={{fontSize: '12px'}}>name</span>,
        dataIndex: 'name',
        key: 'name',
        ellipsis: true
    }, {
        title: <span style={{fontSize: '12px'}}>volume</span>,
        dataIndex: 'volume',
        key: 'volume',
        ellipsis: true
    }, {title: <span style={{fontSize: '12px'}}>brand</span>, dataIndex: 'brand', key: 'brand', ellipsis: true}, {
        title: <span style={{fontSize: '12px'}}>category</span>, dataIndex: 'category', key: 'category', ellipsis: true
    }, {title: <span style={{fontSize: '12px'}}>price</span>, dataIndex: 'price', key: 'price', ellipsis: true}, {
        title: <span style={{fontSize: '12px'}}>quantity</span>, dataIndex: 'quantity', key: 'quantity', ellipsis: true
    }, {
        title: <span style={{fontSize: '12px'}}>Tags</span>,
        dataIndex: 'tags',
        key: 'tags',
        ellipsis: true,
        render: (tags) => (<>{tags.map((tag, index) => (<Tag color="blue" key={index} style={{marginBottom: '4px'}}>
                    {tag}
                </Tag>))}</>)
    }, {
        title: <span style={{fontSize: '12px'}}>Action</span>,
        key: 'action',
        fixed: 'right',
        render: (_, record) => (<Button
                icon={<DeleteTwoTone style={{color: '--ant-error-color'}}/>}
                onClick={() => handleDelete(record.uuid)}
                style={{
                    backgroundColor: '--ant-error-bg', borderColor: '--ant-error-color',
                }}
            />),
    },];


    useEffect(() => {
        setProductList(productListProp)
    }, [productListProp]);

    const handleDelete = (uuid) => {
        onDelete(uuid)
    };


    const components = {
        header: {
            row: (props) => <tr {...props} />, cell: (props) => {
                const index = columns.findIndex((col) => col.key === props.columnKey);
                return renderHeaderCell(props.children, index);
            },
        },
    };

    return (<Table
            dataSource={productList.map((purchase) => ({
                uuid: purchase.uuid,
                name: purchase.product.name,
                volume: purchase.product.volume,
                brand: purchase.product.brand,
                category: purchase.product.category,
                price: purchase.price,
                quantity: purchase.quantity,
                tags: purchase.tags,
            }))}
            columns={columns}
            rowKey='id'
            pagination={false}
            style={{marginTop: '20px'}}
            scroll={{x: true}}
        />);
};

export default TableProductWidget;