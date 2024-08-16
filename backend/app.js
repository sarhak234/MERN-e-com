const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const signupModel = require('./models/signup');
const cartModel = require('./models/cart'); // Import the cart model
const productModel = require('./models/product');
const adminModel = require('./models/admin'); // Import the admin model
const bcrypt = require('bcrypt');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const jwtSecret = 'shhh1234'; // Store this in an environment variable in production

// Middleware to check if the user is logged in
const isLoggedIn = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  console.log('Token:', token); // Debug log for token

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      console.log('Token verification error:', err); // Debug log for token verification
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.user = decoded; // Attach user info to request
    next();
  });
};

// Signup Route
app.post('/auth/signup', async (req, res) => {
  try {
    const existingUser = await signupModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await signupModel.create({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      cart: [] // Initialize the cart as an empty array
    });

    const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login Route
app.post('/auth/login', async (req, res) => {
  try {
    const user = await signupModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      res.json({ message: 'Login successful', token });
    } else {
      res.status(401).send('Incorrect password');
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Admin Signup Route
app.post('/admin', async (req, res) => {
  const { email, password, brandname } = req.body;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
    });
  }

  try {
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'An admin with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await adminModel.create({
      email,
      password: hashedPassword,
      brandname,
    });

    const token = jwt.sign({ id: admin._id, email: admin.email }, jwtSecret);

    res.status(201).json({ message: 'Admin created successfully', token });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin Login Route
app.post('/admin/login', async (req, res) => {
  try {
    const login = await adminModel.findOne({ email: req.body.email });
    if (!login) {
      return res.status(404).send('User not found');
    }

    const passMatch = await bcrypt.compare(req.body.password, login.password);
    if (passMatch) {
      const token = jwt.sign({ id: login._id, email: login.email }, jwtSecret);
      res.json({ message: 'Login successful', token });
    } else {
      res.status(401).send('Incorrect password');
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Internal server error');
  }
});

// Admin Profile Route
app.post('/admin/profile', upload.single('image'), async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).send({ error: 'No file uploaded' });
    }

    const newProduct = await productModel.create({
      prod_image: req.file.buffer,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    });

    res.send(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Fetch Products Route
app.post('/products', async (req, res) => {
  try {
    const products = await productModel.find({});
    res.send(products); // Send the products data
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Error fetching products');
  }
});

// Add to Cart Route
app.post('/cartdetails', isLoggedIn, async (req, res) => {
  try {
    const user = await signupModel.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).send('User not found');
    }
    
    const productId = req.body.productid;
    
    // Ensure the product exists before adding to cart
    const productExists = await productModel.findById(productId);
    if (!productExists) {
      return res.status(404).send('Product not found');
    }
    
    // Check if the product already exists in the cart
    if (!user.cart.includes(productId)) {
      user.cart.push(productId);
      await user.save();
    }

    res.status(200).send(user.cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).send('An error occurred while adding to the cart');
  }
});

// Fetch Cart Route
app.post('/cart', isLoggedIn, async (req, res) => {
  try {
    const user = await signupModel.findOne({ email: req.user.email }).populate('cart');
    
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    
    // Remove duplicates
    const uniqueCart = Array.from(new Set(user.cart.map(item => item._id)))
      .map(id => {
        return user.cart.find(item => item._id.toString() === id.toString());
      });

    res.status(200).send({ cart: uniqueCart });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

app.post('/aboutprofile', isLoggedIn, async (req, res) => {
  try {
    const user = await signupModel.findOne({ email: req.user.email });
    if(user){
      res.status(200).send(user.username)

    }
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while fetching the user profile' });
  }
});





const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});