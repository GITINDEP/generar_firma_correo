const {Router} = require('express');
const router = Router();
const multer  = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: './src/public/assets/img/imagenes_firma',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        cb(null, 'imagen_firma_' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

const authController = require('../controllers/authController');
const auth= require('../middleware/auth');

const {
    renderViewConfiguracion,
    getAllApartado,
    getAllTipoArchivos,
    addConfiguracion,
    getAllConfiguraciones,
    isActive,
    isActiveImage,
    addFile,
    getAllFiles,
    getAllConfiguracionesActivas,
    getAllFileActivo
} = require('../controllers/postgresController');



router.get('/',authController.viewAuth);
router.get('/datos',auth.noCache,auth.verifyToken,authController.viewDataAD);

router.post('/login',authController.login);
router.get('/inicio',auth.noCache,auth.verifyToken,(req,res)=>{
     const usuario = req.session.usuario;
    res.render('datos',{
        usuario
    });
})

router.get('/configuracion',auth.noCache,auth.verifyToken,renderViewConfiguracion)
router.get('/configuraciones/getAll',auth.noCache,auth.verifyToken,getAllConfiguraciones);
router.get('/configuraciones/getAllActivos',auth.noCache,auth.verifyToken,getAllConfiguracionesActivas);

router.get('/logout',(req,res)=>{
    res.clearCookie('authToken');
      res.set({
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        });
    res.redirect('/');
})
router.post('/configuracion/add',auth.noCache,auth.verifyToken,addConfiguracion);
router.post('/configuracion/active/:id',auth.noCache,auth.verifyToken,isActive);
router.post('/configuracion/file',auth.noCache,auth.verifyToken,upload.single('file'),addFile)
router.get('/configuracion/files/getAll',auth.noCache,auth.verifyToken,getAllFiles);
router.post('/configuracion/file/active/:id',auth.noCache,auth.verifyToken,isActiveImage);
router.get('/configuracion/fileActivo',auth.noCache,auth.verifyToken,getAllFileActivo)

module.exports = router;