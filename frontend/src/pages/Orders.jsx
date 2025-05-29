import React, { useEffect, useState, useContext } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const loadOrderData = async () => {
    try {
      if (!token) {
        //navigate('/login'); // Redirect to login if token is missing
        return null;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrders = [];
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrders.push(item);
          })
        })
        setOrders(allOrders.reverse());
      } else {
        console.error("Failed to fetch orders:", response.data.message);
      }
    } catch (error) {
      console.error('Failed to load order data:', error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl sm:text-2xl'>
        <Title text1={'MY '} text2={'ORDERS'} />
      </div>

      {orders.length === 0 ? (
        <p className='mt-8 text-gray-500'>No orders found.</p>
      ) : (
        <div className='mt-6'>
          {orders.map((order, orderIndex) => (
            <div key={orderIndex}>
              {order.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
                >
                  <div className='flex items-start gap-6 text-sm'>
                    <img
                      src={item.image[0]}
                      className='w-16 sm:w-20 object-cover'
                      alt={item.name}
                    />
                    <div>
                      <p className='sm:text-base font-medium'>{item.name}</p>
                      <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                        <p className='text-lg'>
                          {currency}
                          {item.price}
                        </p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Size: {item.size}</p>
                      </div>
                      <p className='mt-1'>
                        Date:{' '}
                        <span className='text-gray-400'>
                          {new Date(order.date).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className='md:w-1/2 flex justify-between'>
                    <div className='flex items-center gap-2'>
                      <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                      <p className='text-sm md:text-base'>Ready to ship</p>
                    </div>
                    <button className='border px-4 py-2 text-sm font-medium rounded-sm'>
                      Track Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
