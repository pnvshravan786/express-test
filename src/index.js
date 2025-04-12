// import express from "express";
// import os from "os";

// const containerId = os.hostname();

// const app = express();
// const PORT = 5000;

// app.get('/', (req,res)=>{
//     const headers = req.headers;
//     res.send(`Hello from the backend server running in container ID: ${containerId}`);
// });

// app.get('/header', (req,res)=>{
//     const headers = req.headers;
//     res.send(headers);
// });

// app.listen(PORT, () =>{
//     console.log(`Express listening on port ${PORT}`);
// })

import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Server is running!');
});

const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export { app, server };
