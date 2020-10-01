'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ES13',{ useNewUrlParser: true, useUnifiedTopology: true }, error => {
    if(!error) { console.log('MongoDB Connection Succeeded')}
    else { console.log('Error in DB Connection : ' + error)}
});

require('./Model/admin.model');
require('./Model/article.model');
require('./Model/image.model');