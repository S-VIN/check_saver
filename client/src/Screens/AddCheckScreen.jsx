import React, {useEffect, useRef, useState} from 'react';
import {Button, Card} from 'antd';
import NativeDatePicker from "../Widgets/NativeDatePicker.jsx";

import SelectProductWidget from "../Widgets/ProductSelectWidget.jsx";
import ProductStore from "../Stores/ProductStore.jsx";
import Purchase from "../Models/Purchase.jsx";

import {v4 as uuidv4} from 'uuid';
import ShopSelectWidget from "../Widgets/ShopSelectWidget.jsx";
import PriceQuantitySelectWidget from "../Widgets/PriceQuantitySelectWidget.jsx";
import TagSelectWidget from "../Widgets/TagSelectWidget.jsx";
import ProductCardsWidget from "../Widgets/ProductCardsWidget.jsx";
import styled from "styled-components";

const StyledCard = styled(Card)`
    position: relative;
    text-align: left;

    .ant-card-body {
        padding: 4px !important;
        margin-left: 0 !important;
    }
`;

const AddCheckScreen = () => {
    const [purchaseList, setPurchaseList] = useState([])
    const [selectedProduct, setSelectedProduct] = useState()
    const [selectedShop, setSelectedShop] = useState()
    const [selectedPrice, setSelectedPrice] = useState()
    const [selectedQty, setSelectedQty] = useState()
    const [selectedTags, setSelectedTags] = useState([])
    const childRef = useRef();

    const [screenResolution, setScreenResolution] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);


    useEffect(() => {

        setSelectedQty(1)

        const updateResolution = () => {
            setScreenResolution(`${window.innerWidth} x ${window.innerHeight}`);
        };

        updateResolution();
        window.addEventListener('resize', updateResolution);

        return () => {
            window.removeEventListener('resize', updateResolution);
        };
    }, []);


    // Обработчик очистки формы
    const handleClearForm = () => {
        // form.resetFields();
        // setProductList([]);
        // setSelectedProduct(null);
        // setIsCleared(!isCleared); // Переключение состояния для сброса зависимых компонентов
        // message.success('Форма успешно очищена.');
    };

    const handleSelectProduct = (id) => {
        let selectedProduct = ProductStore.getProductById(id)
        setSelectedProduct(selectedProduct)
    }


    const handleAddPurchase = () => {
        // do checks

        let updatedList = purchaseList;
        updatedList.push(new Purchase(uuidv4(), selectedProduct, selectedPrice, selectedQty, selectedTags))
        console.log(updatedList)
        setPurchaseList(updatedList)
        setSelectedProduct(null)
        childRef.current.resetTags();
        // setSelectedTags(null)
        setSelectedPrice(null)
        setSelectedQty(null)
    }

    const handleDeletePurchase = (uuid) => {
        const updatedList = purchaseList.filter(purchase => purchase.uuid !== uuid);
        setPurchaseList(updatedList);
    }

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };


    return (<div
        style={{
            margin: '0', padding: '4px', width: '100%'
        }}
    >


        <p style={{marginBottom: '0px', fontWeight: 'bold'}}>Screen Resolution: {screenResolution}</p>

        {/* Card Block */}
        <StyledCard
            style={{

                marginTop: '4px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
        >

            <div
                style={{
                    display: 'flex', justifyContent: 'space-between', marginBottom: '4px',
                }}
            >
                <NativeDatePicker
                    style={{width: '48%'}}
                    onChange={handleDateChange}
                />

                <ShopSelectWidget value={selectedShop} onChange={(shop) => {
                    setSelectedShop(shop)
                }}/>
            </div>

            <PriceQuantitySelectWidget
                onPriceChange={(price) => {
                    setSelectedPrice(price)
                }}
                priceProp={selectedPrice}
                onQtyChange={(qty) => {
                    setSelectedQty(qty)
                }}
                qtyProp={selectedQty}/>

            <SelectProductWidget onSelect={handleSelectProduct} selectedProductProp={selectedProduct}/>

            <TagSelectWidget style={{marginTop: '4px',}} ref={childRef} onTagChange={(tags) => {
                setSelectedTags(tags)
            }}/>

            <Button
                type="primary"
                block
                style={{marginTop: '4px', height: '32px', fontSize: '16px'}}
                onClick={handleAddPurchase}
            >
                Confirm
            </Button>

        </StyledCard>

        <ProductCardsWidget productListProp={purchaseList} onDelete={handleDeletePurchase}/>
    </div>);
};

export default AddCheckScreen;
