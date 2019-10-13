const handlers = require('./handlers.js')

exports.posts = (req, res) => {
    if (req.method === 'POST') {
        return handlers.post(req,res);
    } else if (req.method === 'GET') {
        return handlers.get(req,res);
    }
}
