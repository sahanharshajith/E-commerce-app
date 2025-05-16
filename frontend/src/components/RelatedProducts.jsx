import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({category, subCategory}) => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

useEffect(() => {
    if (products && products.length > 0) {
        let filtered = products;
        if (category) {
            filtered = filtered.filter((item) => item.category === category);
        }
        if (subCategory) {
            filtered = filtered.filter((item) => item.subCategory === subCategory);
        }
        setRelated(filtered);
    }
}, [products, category, subCategory]);

const displayProducts = related.length > 0 ? related : products.slice(0, 4);

    return (
        <div className='my-24 px-4 sm:px-6 lg:px-8'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'RELATED'} text2={'PRODUCTS'}/>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-8'>
                {displayProducts.map((item) => (
                    <ProductItem
                        key={item._id}
                        name={item.name}
                        id={item._id}
                        price={item.price}
                        image={item.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
