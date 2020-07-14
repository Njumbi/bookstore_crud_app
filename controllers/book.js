const Book = require('../model/book.model');
const fs = require('fs');

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

exports.postAddBook = (req, res, next) => {
    //collect data from the user
    const image = req.file.path;
    const name = req.body.name;
    const type = req.body.type;
    const price = req.body.price;
    const desc = req.body.desc;
    //check if another book exists
    Book.findOne({
            where: {
                name: name
            }
        })
        .then(book => {
            if (book) {
                res.status(200).json({
                    status: false,
                    message: "sorry another book already exists"
                })
            } else {
                //insert data
                newBook = new Book({
                    image: image,
                    name: name,
                    type: type,
                    price: price,
                    description: desc
                })
                newBook
                    .save()
                    .then(() => {
                        res.status(200).json({
                            status: true,
                            message: "book successfully added",
                        })
                    })
                    .catch(error => {
                        res.status(200).json({
                            status: false,
                            message: error,
                        })
                    })



            }

        })
        .catch(error => {
            res.status(200).json({
                status: false,
                message: error,
            })
            console.log(error)
        })
}

exports.getDeleteBook = (req, res, next) => {
    const id = req.query.id;
    const image = req.query.image;

    Book.destroy({
            where: {
                id: id
            }
        })
        .then(() => {
            deletedImage(image)
            res.status(200).json({
                status: true,
                message: "book successfully deleted"

            })
        })
        .catch(error => {
            console.log(error)
            res.status(200).json({
                status: false,
                message: error.message
            })
        })
}

exports.putEditBook = (req, res, next) => {
    // collect data from front end
    const image = req.file
    const name = req.body.name;
    const type = req.body.type;
    const price = req.body.price;
    const desc = req.body.desc;
    const id = req.body.id;

    // find one book to be edited
    Book.findOne({
            where: {
                id: id
            }
        })
        .then(b => {
            // check if there is a new image
            if (image) {
                deletedImage(b.image)
                b.image = image.path
            }
            //set new values
            b.name = name
            b.type = type
            b.price = price
            b.desc = desc

            //save edited book
            return b.save()

        })
        .then(() => {
                res.status(200).json({
                    status: true,
                    message: "book saved successfully"
                })
            }

        )


        .catch(error => {
            res.status(200).json({
                status: false,
                message: error.message
            })
        })


}

const deletedImage = (imagePath) => {
    fs.unlink("./" + imagePath, (err) => {
        if (err) {
            console.log("failed to delete local image:" + err);
        } else {
            console.log('successfully deleted local image');
        }
    });
}