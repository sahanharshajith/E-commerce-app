import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link 
      className='group block text-gray-700 cursor-pointer transition duration-300 hover:shadow-lg rounded-lg overflow-hidden'
      to={`/product/${id}`}
      aria-label={`View ${name} product details`}
    >
      <div className='relative overflow-hidden aspect-square'>
        <img 
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' 
          src={image[0]} 
          alt={name} 
          loading='lazy'
        />
      </div>
      <div className='p-4'>
        <h3 className='text-sm font-medium text-gray-900 mb-1 line-clamp-2' title={name}>
          {name}
        </h3>
        <p className='text-sm font-semibold text-gray-800'>
          {currency}{price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;