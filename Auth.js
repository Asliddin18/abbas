const jwt = require('jsonwebtoken')
require("dotenv").config()
 var ACCESS_TOKEN_SECRET='963d48d8a5bbe8acd67458646d5d469f45bfda4b75629e20944efa56a24d32201c16c005da46b2fd7f8867fbf589541e957f51bbe19b3a9c6dd1c3aa473bba7e'
function authenticateToken(req, res, next) {
 const authHeader = req.headers["authorization"]
 const token = authHeader && authHeader.split(' ')[1]
 if(token == null) {
  res.status(401).send("The Token is Empty")
 }
 jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  if(err) {
   res.status(403).send("Error in Token")
  } else {
   req.user = user
   next()
  }
 })
} 


module.exports = authenticateToken