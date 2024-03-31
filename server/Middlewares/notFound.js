const notFound = (req,res) => {
    res.status(404).json({success : false , msg : `can route ${req.url} does not exist `})
}


module.exports = {
    notFound
};
