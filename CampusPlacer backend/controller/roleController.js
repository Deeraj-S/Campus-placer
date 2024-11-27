const Role = require('../models/roles');

// Add a new role
const InsertRole = async (req, res) => {
    const { role_name, permissions } = req.body;

    try {
        const existingRole = await Role.findOne({ role_name });
        if (existingRole) {
            return res.status(400).json({ success: false, message: 'Role name already exists' });
        }

        const role = new Role({ role_name, permissions });
        await role.save();

        res.status(201).json({ success: true, message: 'Role added successfully', role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Get all roles
const GetAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json({ success: true, roles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


const GetRoleById = async (req, res) => {
    const id = req.params.id; // Extract role_id from request parameters

    try {
        const role = await Role.findById(id) // Find role by ID
        if (!role) {
            return res.status(404).json({ success: false, message: 'Role not found' });
        }
        res.status(200).json({ success: true, role });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


// Update a role by ID
const UpdateRole = async (req, res) => {
    const { id } = req.params;
    const { role_name, permissions } = req.body;

    try {
        const updatedRole = await Role.findByIdAndUpdate(
            id,
            { role_name, permissions },
            { new: true, runValidators: true } // Return the updated document and validate input
        );

        if (!updatedRole) {
            return res.status(404).json({ success: false, message: 'Role not found' });
        }

        res.status(200).json({ success: true, message: 'Role updated successfully', updatedRole });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Delete a role by ID
const DeleteRole = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRole = await Role.findByIdAndDelete(id);

        if (!deletedRole) {
            return res.status(404).json({ success: false, message: 'Role not found' });
        }

        res.status(200).json({ success: true, message: 'Role deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = {
    InsertRole,
    GetAllRoles,
    GetRoleById,
    UpdateRole,
    DeleteRole,
};
