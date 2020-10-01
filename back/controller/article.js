'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'gpatruno1007'; // Mot de passe : gpatruno1007
const Image = mongoose.model('Image');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString + file.originalname);
    }

});
const upload = multer({ storage: storage });

//const Article = mongoose.model('Article');
const jwt = require('jsonwebtoken');

/**
 * Create an Article
 * 
 * @api {POST} article/ Create Article
 * @apiPermission Admin
 * @apiGroup Admin
 * @apiName PostArticle
 * 
 * @apiDescription In this case "apiUse" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 * 
 * @apiParam {String}   title           Name of the User.
 * @apiParam {String}   text            Last name of the User.
 * @apiParam {Date}     date_upload     Date of the User.
 * @apiParam {String}   categorie       Password of the User.
 * @apiParam {String}   like            Number phone of the User.
 * @apiParam {String}   dislike         Description of the User.
 * 
 * @apiSuccess {String}     message  The message.
 * @apiSuccess {Boolean}    success  Success True or False
 * 
 * @apiError Forbidden the <code>Token</code> of the Admin was not found.
 * @apiError InternalError the <code>data</code> of the Article was not found.
 */
router.post('/article', async (req, res) => {
    console.log('-------------- POST Article -----------------');
    console.log(req.body);
    let article = new Article(req.body);

    // article.title = req.body.title;
    // article.url = req.body.url;
    // article.text = req.body.url;
    // article.date_upload = new Date(req.body.date_upload);
    // article.time_upload = req.body.time_upload;
    // article.categorie = req.body.categorie;

    // article.save((err, doc) => {
    //     if (!err) {
    //         res.status(200).send({ 'message': 'L\'utilisateur à été ajouté.', 'success': true });
    //     } else {
    //         console.log(err);
    //         res.status(500).send({ 'message': 'Une erreur est survenu lors de l\'ajout', 'success': false });
    //     }
    // });
});

/**
 * Get the List of Article
 * 
 * @api {GET} admin/users Get List Users
 * @apiPermission Admin
 * @apiGroup Admin
 * @apiName GetArticles
 * 
 * @apiDescription Get the List of Articles
 * 
 * @apiSuccess {String}     message       The Message
 * @apiSuccess {Boolean}    success       Success True or False
 * @apiSuccess {Number}     total         Total Articles
 * @apiSuccess {Article[]}  result        Array of Article
 * 
 * @apiError Forbidden the <code>Token</code> of the Admin was not found.
 */
router.get('/', async (req, res) => {
    console.log(" --------------- Get INFO of One user --------------- ");
    res.status(200).send({ 'message': 'Chargements des statistiques.', 'success': true, 'total': 1, 'result': "er" });
    // User.find((err, doc) => {
    //     if (!err && doc != null) {
    //         res.status(200).send({ 'message': 'Chargements des statistiques.', 'success': true, 'total': doc.length, 'result': doc });
    //     } else {
    //         res.status(500).send({ 'message': 'Problème lors du chargement.', 'success': false, 'typeError': err });
    //     }
    // });
});

router.get('/file', async (req, res) => {
    console.log(" --------------- Get an Upload --------------- ");
    res.status(200).send({ 'message': 'Chargements des statistiques.', 'success': true, 'total': 1, 'result': "er" });
    // User.find((err, doc) => {
    //     if (!err && doc != null) {
    //         res.status(200).send({ 'message': 'Chargements des statistiques.', 'success': true, 'total': doc.length, 'result': doc });
    //     } else {
    //         res.status(500).send({ 'message': 'Problème lors du chargement.', 'success': false, 'typeError': err });
    //     }
    // });
});

router.post('/upload', upload.single('uploadImage'), (req, res) => {
    console.log("--------- POST ------");
    console.log(req.body);
    console.log(req.file);

    if (req.file != undefined) {
        const img = new Image({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            url: req.body.url
        });
        img.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: "Image Enregistré !",
                success: true,
                uploadedImg: {
                    name: result.name,
                    url: result.url
                }
            });
        });
    } else {
        res.status(201).json({
            message: "Problème !",
            success: false
        });
    }

});

/**
 * Create an Article
 * 
 * @api {POST} article/ Create Article
 * @apiPermission Admin
 * @apiGroup Admin
 * @apiName PostArticle
 * 
 * @apiDescription In this case "apiUse" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 * 
 * @apiParam {String}   title           Name of the User.
 * @apiParam {String}   password        password of the User.
 * 
 * @apiSuccess {String}     message  The message.
 * @apiSuccess {Boolean}    success  Success True or False
 * 
 * @apiError Forbidden the <code>Token</code> of the Admin was not found.
 * @apiError InternalError the <code>data</code> of the Article was not found.
 */
router.post('/login', async (req, res) => {
    console.log('-------------- POST LOGIN -----------------');
    console.log(req.body);

    Admin.findOne({ username: req.body.a }, (err, doc) => {
        console.log(doc);
        if (!err) {
            if (doc != null) {
                // Load hash from your password DB.
                bcrypt.compare(req.body.b, doc.password, function (err, result) {
                    if (result) {
                        res.status(200).send({ 'message': 'Authentification réussi.', 'success': true });
                    } else {
                        res.status(200).send({ 'message': 'Mauvais mot de passe', 'success': false });
                    }
                });

            } else {
                res.status(200).send({ 'message': 'Mauvais Username', 'success': false });
            }
        } else {
            res.status(500).send({ 'message': 'Problème d\'authenfication.', 'success': false, 'result': err });
        }
    });
});


/**
 * Ajouter un Admin
 */
router.post('/new/password', async (req, res) => {
    console.log('-------------- POST New Password -----------------');
    console.log(req.body);
    let admin = new Admin(req.body);

    await bcrypt.hash(admin.password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        if (!err) {
            admin.password = hash;
            admin.save((err, doc) => {
                if (!err) {
                    res.status(200).send({ 'message': 'L\'utilisateur à été ajouté.', 'success': true, 'result': doc });
                } else {
                    console.log(err);
                    res.status(500).send({ 'message': 'Une erreur est survenu lors de l\'ajout', 'success': false });
                }
            });
            console.log(admin);
        }
    });

});

module.exports = router;