const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Signup' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 } // Optionally track quantity
});

module.exports = mongoose.model('CartItem', cartSchema);
