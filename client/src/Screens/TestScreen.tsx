import React, { useState, useEffect } from 'react';

import SelectProductWidget from '../Widgets/ProductSelectWidget.js'
import ProductTableWidget from "../Widgets/ProductTableWidget.js"
import Product from "../Models/Product.js";
import Purchase from "../Models/Purchase.js";
import {v4 as uuidv4} from 'uuid';

const TestScreen = () => {

    useEffect(() => {


    }, []);


  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (productName) => {
    // setSelectedProduct(productName);

  };

        let p1 = new Purchase(uuidv4(), new Product('1', 'pName', '1l', ['tag1'], 'brandName'), 10, 11123, ['tag1', 'tag2'] )
        let p2 = new Purchase(uuidv4(), new Product('2', 'pName1', '2l', ['tag1'], 'brandName1'), 100, 111, ['tag1', 'tag2'] )
        let p3 = new Purchase(uuidv4(), new Product('3', 'pName2', '2l', ['tag1'], 'brandName2'), 101, 1123, ['tag1', 'tag2'] )
        let p4 = new Purchase(uuidv4(), new Product('4', 'pName3', '3l', ['tag1'], 'brandName3'), 101, 123, ['tag1', 'tag2'] )

  const list = [
        p1, p2, p3, p4
    ]

  return (
      <div>
          <SelectProductWidget onSelect={handleProductSelect} />
          <ProductTableWidget productListProp={list}/>
      </div>
  );
};

export default TestScreen;
