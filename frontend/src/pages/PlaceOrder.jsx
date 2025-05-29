import React, { useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
//import { set } from 'mongoose'

const PlaceOrder = () => {

  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [method, setMethod] = useState('cod');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({...data, [name]: value }));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try{
      let orderItems = [];
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if (cartItems[items][item] > 0){
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo){
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }

      switch(method){
        case 'cod': {
          const response = await axios.post('http://localhost:4000/api/order/place', orderData, {headers: {token}});
          //console.log(response.data);
          if (response.data.success){
            setCartItems({});
            navigate('/orders', {state: {orderId: response.data.order._id}});
            //console.log("Order placed:", response.data);
          }else{
            toast.error(response.data.message);
          }
          break;
        }
      }
    } catch {
      // Optionally handle error here
      toast.error("An error occurred while placing the order.");
    }

  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY '} text2={'INFORMATION'}/>
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email Address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipCode' value={formData.zipCode} type="number" placeholder='Zip Code' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="number" placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
      </div>

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT '} text2={'METHOD'}/>
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt=""/>
            </div>
            <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt=""/>
            </div>
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>Cash on delivery</p>
            </div>
          </div>
        </div>
        <div className='w-full text-end mt-8'>
            <button type="submit" className='bg-black text-white px-16 py-3 my-8 mt-6 text-sm active:bg-gray-700 cursor-pointer'>PLACE ORDER</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder