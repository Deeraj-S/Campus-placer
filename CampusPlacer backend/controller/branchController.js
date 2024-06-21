const branchSchema = require('../models/branchSchema')
const env = require('dotenv')
env.config()


const Insert = async (req, res) => {
    const { branch_name } = req.body

    const branch = await branchSchema({ branch_name })
    await branch.save()
    return res.json({ success: true, savedBranch: branch })
}

module.exports = { Insert }