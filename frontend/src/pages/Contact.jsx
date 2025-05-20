import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT '} text2={'US'} className='text-2xl' />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-8 lg:gap-16 mb-20 justify-center'>
        <img src={assets.contact_img} className='w-full max-w-[450px] rounded-lg shadow-md' alt='Contact Forever company' />
          <div className='flex flex-col justify-center gap-4 md:gap-6 md:w-1/2 text-gray-600'>
            <b className='text-gray-800'>Our Store</b>
            <p className='text-base leading-relaxed'>
              54709 Willms Station<br/>Suite 350, Washington, USA
            </p>
            <p className='text-base leading-relaxed'>
              Tel: (415) 555-0132<br/>Email: admin@forever.com
            </p>
            <b className='text-gray-800'>Careers at Forever</b>
            <p className='text-base leading-relaxed'>
              Learn more about our teams and job openings.
            </p>
            <button className='border border-black px-6 py-3 text-sm hover:bg-black hover:text-white transition-all duration-500 w-fit'>
              Explore Jobs
            </button>
          </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default Contact;