import React, { useEffect, useRef, useState } from 'react';
import { Button, Card } from 'antd';
import styled from "styled-components";
import dayjs from 'dayjs';

import NativeDatePicker from "../Widgets/NativeDatePicker";
import SelectProductWidget from "../Widgets/ProductSelectWidget";
import ProductStore from "../Stores/ProductStore";
import Purchase from "../Models/Purchase";
import Product from "../Models/Product";

import ShopSelectWidget from "../Widgets/ShopSelectWidget";

import PriceQuantitySelectWidget from "../Widgets/PriceQuantitySelectWidget";
import TagSelectWidget from "../Widgets/TagSelectWidget";
import ProductCardsWidget from "../Widgets/ProductCardsWidget";
import { UUID } from 'crypto';


const AddCheckScreen: React.FC = () => {
    const [purchaseList, setPurchaseList] = useState<Purchase[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedShop, setSelectedShop] = useState<string | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const childRef = useRef<{ resetTags: () => void }>(null);

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [quantity, setQuantity] = useState<number>(1);




    useEffect(() => {
    
    }, []);


    // const handleClearForm = () => {
    //     // form.resetFields();
    //     // setProductList([]);
    //     // setSelectedProduct(null);
    //     // setIsCleared(!isCleared); // Переключение состояния для сброса зависимых компонентов
    //     // message.success('Форма успешно очищена.');
    // };

    const handleSelectProduct = (id: UUID | null) => {
        const selectedProduct = id ? ProductStore.getProductById(id) : null;
        setSelectedProduct(selectedProduct || null);
    };

    const handleAddPurchase = () => {
        console.log('handleAddPurchase', selectedProduct, price, quantity, selectedTags);

        if (!selectedProduct || price === null || quantity === null) {
            // Handle error: missing required fields
            return;
        }

        const updatedList = [...purchaseList, new Purchase(null, selectedProduct, price, quantity, selectedTags)];
        setPurchaseList(updatedList);
        setSelectedProduct(null);
        childRef.current?.resetTags();
    };

    const handleDeletePurchase = (product_id: string) => {
        console.log('handleDeletePurchase', product_id);
        if (!product_id)
        {
            return;
        }
        const updatedList = purchaseList.filter(purchase => purchase.product.id !== product_id);
        setPurchaseList(updatedList);
    };

    const handleDateChange = (date: dayjs.Dayjs) => {
        setSelectedDate(date.format("YYYY-MM-DD"));
    };

    return (
        <div style={{width: '100%'}}>
            <Card
                style={{
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}

            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                        <NativeDatePicker onChange={handleDateChange} />
                        <ShopSelectWidget value={selectedShop} onChange={setSelectedShop} />
                    </div>

                    <PriceQuantitySelectWidget onPriceChanged={setPrice} onQuantityChanged={setQuantity}/>

                    <SelectProductWidget onSelect={handleSelectProduct} selectedProductProp={selectedProduct} />

                    <TagSelectWidget
                        style={{}}
                        ref={childRef}
                        onTagChange={setSelectedTags}
                    />

                    <Button
                        type="primary"
                        block
                        style={{height: '32px', fontSize: '16px' }}
                        onClick={handleAddPurchase}
                    >
                        Confirm
                    </Button>
                </div>
            </Card>

            <ProductCardsWidget productListProp={purchaseList} onDelete={handleDeletePurchase} />
        </div>
    );
};

export default AddCheckScreen;