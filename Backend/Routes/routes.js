const router = require ('express').Router ();
const {
  Register,
  Login,
  RefreshToken,
  Logout,
} = require ('../Controller/AuthController');

const {
  GetUserById,
} = require ('../Controller/UserController');
const Role = require ('../Controller/RoleController');

const {
  GetProducts,
  CreateProducts,
  GetProductById,
} = require('../Controller/ProductController');

const {
  GetBarbers,
  CreateBarbers,
} = require ('../Controller/BarberController');

const {
  CreateBooking,
  GetBooking,
} = require ('../Controller/BookingController')

const {verify} = require ('../Middleware/verifyToken');



router.get ('/', (req, res) => {
  res.end (`<h1>Hello Here is our backend</h1>`);
});

//auth
router.post ('/api/v1/auth/register', Register);
router.post ('/api/v1/auth/login', Login);
router.get ('/api/v1/auth/refresh-token', RefreshToken);
router.delete ('/api/v1/auth/logout', Logout);

//user
router.get ('/api/v1/user/getUser/:id', verify, GetUserById);

//routes Role
router.post ('/api/v1/role/create-role', Role);

// product
router.get('/api/v1/products/all',verify ,GetProducts);
router.post('/api/v1/product/create-product', CreateProducts);
router.get('/api/v1/product/get-product-by-id/:id',verify , GetProductById);

// barber Man
router.get('/api/v1/barber/all',verify ,GetBarbers);
router.post('/api/v1/barber/create-barber', CreateBarbers);

// Booking
router.get('/api/v1/booking/get-booking',verify ,GetBooking);
router.post('/api/v1/booking/create-booking',verify ,CreateBooking);


module.exports = router;
