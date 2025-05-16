import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = () => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const currentProduct = products[0];

            const relatedProducts = products.filter(
                item => item.category === currentProduct.category && item._id !== currentProduct._id
            );

            let finalRelated = relatedProducts;
            if (relatedProducts.length < 4) {
                const similarProducts = products.filter(
                    item => item.subCategory === currentProduct.subCategory && item._id !== currentProduct._id
                );
                finalRelated = [...relatedProducts, ...similarProducts];
            }
            setRelated(finalRelated.slice(0, 4));
        }
    }, [products]);

    const displayProducts = related.length > 0 ? related : products.slice(0, 4);

    return (
        <div className='my-24 px-4 sm:px-6 lg:px-8'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
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
