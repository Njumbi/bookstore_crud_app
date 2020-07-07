const Book = require('../model/book.model');

exports.getBookPage = (req, res, next) => {
    res.render('books.ejs', {
        path: 'book'
    })
}
exports.getBookData = (req, res, next) => {
    Book.findAll()
        .then(data => {
            res.status(200).json({
                draw: req.body.draw,
                recordsTotal: data.length,
                data: data
            })
        })
        .catch(error => {
            console.log(error)
        })

}