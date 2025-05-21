import { v2 as cloudinary } from 'cloudinary';

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

    // 🚨 Debug: log incoming file data
    console.log('req.files:', req.files);

    // Safely access uploaded images
    const image1 = req.files?.image1?.[0] || null;
    const image2 = req.files?.image2?.[0] || null;
    const image3 = req.files?.image3?.[0] || null;
    const image4 = req.files?.image4?.[0] || null;

    const images = [image1, image2, image3, image4].filter(Boolean);

    // 🚨 Debug: Log image file data
    console.log('Parsed Images:', images);

    // Upload to Cloudinary
    const imagesUrl = await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.uploader.upload(image.path, {
          resource_type: 'image'
        });
        return result.secure_url;
      })
    );

    // Debug: Log uploaded URLs
    console.log('Uploaded Image URLs:', imagesUrl);

    // TODO: Save product to DB here

    res.json({ success: true, message: 'Product added successfully', imagesUrl });
  } catch (error) {
    console.error('Error in addProduct:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const listProduct = async (req, res) => {
  try {
    // TODO: Fetch products from DB
    res.json({ success: true, products: [] });
  } catch (error) {
    console.error('Error in listProduct:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    // TODO: Remove product from DB using productId
    res.json({ success: true, message: 'Product removed' });
  } catch (error) {
    console.error('Error in removeProduct:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Fetch single product by ID
    res.json({ success: true, product: {} });
  } catch (error) {
    console.error('Error in singleProduct:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
