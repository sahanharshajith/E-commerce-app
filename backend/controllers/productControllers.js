import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/porductModel.js'

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller
    } = req.body;

    // Extract image paths safely
    const image1 = req.files?.image1?.[0]?.path;
    const image2 = req.files?.image2?.[0]?.path;
    const image3 = req.files?.image3?.[0]?.path;
    const image4 = req.files?.image4?.[0]?.path;

    // Filter out undefined paths
    const imagePaths = [image1, image2, image3, image4].filter(Boolean);

    if (imagePaths.length === 0) {
      return res.status(400).json({ success: false, message: 'No image files uploaded.' });
    }

    // Upload images to Cloudinary
    const imageUrls = await Promise.all(
      imagePaths.map(async (filePath) => {
        const result = await cloudinary.uploader.upload(filePath, {
          resource_type: 'image'
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === 'true' ? true : false,
      image: imageUrls,
      date: Date.now(),
    }
    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    console.log('Product Data:', {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller
    });
    console.log('Uploaded Image URLs:', imageUrls);

    // TODO: Save product data along with imageUrls to your DB

    res.json({
      success: true,
      message: 'Product added successfully',
      images: imageUrls
    });
  } catch (error) {
    console.error('Error in addProduct:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const listProduct = async (req, res) => {
  try {
    // TODO: Fetch products from DB
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error('Error in listProduct:', error);
    res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Product removed' });
  } catch (error) {
    console.error('Error in removeProduct:', error);
    res.json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.error('Error in singleProduct:', error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
