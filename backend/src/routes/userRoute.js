const router = require('express').Router()
const { registerUser, updateUser, loginUser, getAllUsers, getUserById, getRecommendedMatches, handleDeleteAccount} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.put('/editProfile', protect, updateUser);
router.delete('/deleteAccount', protect, handleDeleteAccount);

router.get('/getAllUsers', getAllUsers);
router.get('/profile/:id', getUserById);
// route.get('recommended', protect, getRecommendedMatches)


module.exports = router