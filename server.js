const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// // GET route
// app.get('/', (req, res) => {
//   res.send({
//     message: "Hello World!"
//   })
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
})

// connect to server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});