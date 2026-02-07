const router = require('express').Router()
const { registerUser, updateUser, loginUser, getAllUsers} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getAllUsers', getAllUsers);
router.put('/editProfile', protect, updateUser);
router.put('/editProfile', updateUser);


module.exports = router