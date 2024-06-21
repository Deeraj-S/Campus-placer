const connectToMongo = require("./db")
const env = require('dotenv');
const express = require("express")
const cors =require('cors');
env.config()



connectToMongo()


const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Campus Placer")

})

app.use('/api/upload',express.static("./uploads"))
app.use("api/admin", require("./routes/adminRoutes"))
app.use("api/hod", require("./routes/hodRoutes"))
app.use("api/student", require("./routes/studentRoutes"))
app.use("api/placement", require("./routes/placementRoutes"))
app.use("api/application", require("./routes/jobApplicationRoutes"))
app.use("api/branch", require("./routes/branchRoutes"))
app.use("api/category", require("./routes/categoryRoutes"))
app.use("api/joblist", require("./routes/joblistRoutes"))






app.listen(process.env.PORT, () => {
    console.log(`App is listening to port: ${process.env.PORT}`)
})




