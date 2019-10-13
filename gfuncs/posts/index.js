const handlers = require('./handlers.js')

exports.posts = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET, POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else if (req.method === 'POST') {
        return handlers.post(req,res);
    } else if (req.method === 'GET') {
        return handlers.get(req,res);
    }
}
