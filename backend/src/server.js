import express from 'express';
import routes from './routes/index.js';
const app = express();

app.use(express.json());
app.use(routes);

app.use('/api', routes);


app.get('/', (req, res) => {
    res.send('Home Hello!');
});

app.listen(3001, ()=>{
    console.log('Server running on port 3001');
})