function composeresbody (req, res) {
    return new Promise((resolve, reject) => {
    const original_write = res.write,
        original_end = res.end,
        chunks = [];
    res.write = function(chunk) {
        chunks.push(chunk);
        original_write.apply(res, arguments);
    };
    res.end = function(chunk) {
        if (chunk)
            chunks.push(chunk);
        res.body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
        original_end.apply(res, arguments);
        resolve(res.body);
    };
});
}

module.exports = composeresbody;