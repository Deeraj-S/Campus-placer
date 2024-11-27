const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    role_name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    permissions: {
        type: [String], // Array of permission IDs
        required: true,
        validate: {
            validator: (permissions) => Array.isArray(permissions) && permissions.length > 0,
            message: 'Permissions must include at least one item.',
        },
    },
}, { timestamps: true });

module.exports = mongoose.model('roles', RoleSchema);
