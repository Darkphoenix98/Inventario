const {Router} = require('express');
const{
    Auth

} =require('../controllers/Auth');

const router = Router();


router.post('/', Auth);


module.exports = router;
