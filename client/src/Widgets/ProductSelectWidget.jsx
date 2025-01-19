import React, {useState, useEffect} from 'react';
import {AutoComplete, Input, Tag, message} from 'antd';
import axios from 'axios';
import ProductStore from '../Stores/ProductStore';

const SelectProduct = ({style, onSelect, selectedProductProp}) => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products, _] = useState(ProductStore.getProducts());
    const [selectedProduct, setSelectedProduct] = useState(selectedProductProp);
    const [inputLabel, setInputLabel] = useState('')

    useEffect(() => {
        setFilteredProducts(products);
        setSelectedProduct(selectedProductProp)
        setInputLabel(selectedProductProp ? selectedProductProp.name : '')
    }, [selectedProductProp]);


    const handleSearch = (value) => {
        setInputLabel(value)
        if (!value || (value === '')) {
            setFilteredProducts(products);
            return;
        }

        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handleSelect = (id) => {
        onSelect(id);
        let product = ProductStore.getProductById(id)
        setInputLabel(product.name)
        setSelectedProduct(product);
    };

    const clear = () => {
        setInputLabel('')
        selectedProduct(null)
    }



    return (
        <div style={{...style}}>
            <AutoComplete
                style={{width: '100%'}}
                onSearch={handleSearch}
                onSelect={handleSelect}
                placeholder="Введите название товара"
                notFoundContent={'Нет подходящих товаров'}
                value={inputLabel}
                options={filteredProducts.map((product) => ({
                    value: product.id,
                    label: (
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <span>{product.name}</span>
                            <div style={{display: 'flex', gap: '8px'}}>
                                <Tag color="blue">{product.volume}</Tag>
                                <Tag color="green">{product.brand}</Tag>
                            </div>
                        </div>
                    ),
                }))}
            >
                <Input

                    addonAfter={
                        selectedProduct ? (
                            <div>
                                <Tag color="blue">{selectedProduct.volume}</Tag>
                                <Tag color="green">{selectedProduct.brand}</Tag>
                            </div>
                        ) : null
                    }
                />
            </AutoComplete>
        </div>
    );
};

export default SelectProduct;

