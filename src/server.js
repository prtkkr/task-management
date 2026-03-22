import app from './app.js';
import process from 'process';

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
});