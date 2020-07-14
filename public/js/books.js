$(document).ready(function () {
    getBook()
    addBook()
});

const getBook = () => {
    var table = $('#book_table').DataTable({
        "pageLength": 30,
        "processing": true,
        "serverSide": false,
        'ajax': {
            'type': 'GET',
            'url': '/book/data'
        },
        "columns": [{
                'data': "image",
                "defaultContent": "",
                "title": "image",
                'render': function (data, type, full, meta) {
                    return "<img src= " + data + " style='height:80px;width:100px;'/>"
                }
            },
            {
                'data': "name",
                "defaultContent": "",
                "title": "Name",
            },
            {
                'data': "type",
                "defaultContent": "",
                "title": "Type",
            },
            {
                'data': "price",
                "defaultContent": "",
                "title": "Price",
            },
            {
                'data': "description",
                "defaultContent": "",
                "title": "Description",
            },
            {
                'data': "createdAt",
                "defaultContent": "",
                "title": "Created At"
            },
            {
                "targets": -1,
                "data": null,
                "defaultContent": "<button id='edit' class='btn btn-info'>edit!</button>"
            },
            {
                "targets": -1,
                "data": null,
                "defaultContent": "<button id='delete' class='btn btn-danger'>Delete!</button>"
            },

        ]
    })

    //edit a select row
    $('#book_table').on('click', 'button#edit', function () {
        var data = table.row($(this).parents('tr')[0]).data();
        //display details
        $('#editBookModal').modal('show');

        //populate values
        $('#book_image').attr('src', data.image)
        $('#edit_b_name').val(data.name)
        $('#edit_b_type').val(data.type);
        $('#edit_b_price').val(data.price);
        $('#edit_desc').val(data.description);

        //prevent default submission
        $('#edit_book').submit(e => {
            e.preventDefault()

            //get values from your edit modal form

            const editBImage = $('#edit_b_img').get(0).files;
            const editBName = $('#edit_b_name').val();
            const editBType = $('#edit_b_type').val();
            const editBPrice = $('#edit_b_price').val();
            const editBDesc = $('#edit_desc').val();

            // check for any change
            if (data.name == editBName && data.type == editBType && data.price == editBPrice && data.description == editBDesc && editBImage[0] == null) {
                swal('No  change', 'No need to update book', 'error')
                return
            }
            swal({
                title: "Edit Book",
                text: "This book details will be changed",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Continue",
                closeOnConfirm: false,
                showLoaderOnConfirm: true,

            }, () => {
                //set new keys from html form values
                const formData = new FormData()
                formData.append("image", editBImage[0])
                formData.append("name", editBName)
                formData.append("type", editBType)
                formData.append("price", editBPrice)
                formData.append("desc", editBDesc)
                formData.append("id", data.id)

                // send request to controller
                $.ajax({
                    type: "PUT",
                    url: '/book/edit',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        if (data.status == true) {
                            swal("Success", data.message, "success")
                            $("#book_table").DataTable().ajax.reload(null, false);
                            $('#editBookModal').modal('hide');
                        } else {
                            swal("Error", data.message, "error")
                        }
                    }

                })

            })

        })
    })



    //select the row to be deleted
    $('#book_table').on('click', 'button#delete', function () {
        var data = table.row($(this).parents('tr')[0]).data();

        //delete the book
        swal({
            title: "Delete Book",
            text: "This book will be deleted from the system",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Continue",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, () => {
            //make request to controller
            $.get('/book/delete?id=' + data.id + '&image=' + data.image, function (data, status) {
                if (data.status == true) {
                    swal("success", data.message, "success")
                    $('#book_table').DataTable().ajax.reload(null, false)

                } else {
                    swal("Error", data.message, "error")

                }

            })

        })
    })
}

const addBook = () => {
    $('#add_book').submit(e => {
        e.preventDefault()
        swal({
            title: "Add Book",
            text: "This book will be added to the system",
            type: "warning",
            showCancelButdton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Continue",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, () => {
            const bookImage = $('#b_img').get(0).files;
            const bookName = $('#b_name').val();
            const bookType = $('#b_type').val();
            const bookPrice = $('#b_price').val();
            const bookDescription = $('#desc').val();

            const formData = new FormData();
            formData.append("image", bookImage[0]);
            formData.append("name", bookName)
            formData.append("type", bookType);
            formData.append("price", bookPrice);
            formData.append("desc", bookDescription);

            $.ajax({
                type: "POST",
                url: '/book/add',
                data: formData,
                processData: false,
                contentType: false,
                success: (data) => {
                    if (data.status === true) {
                        swal("Success", data.message, "success")
                        $("#book_table").DataTable().ajax.reload(null, false);
                        $('#addBook').modal('hide');
                        $('#add_book')[0].reset();
                    } else {
                        swal("Error", data.message, "error")
                    }
                }
            })
        })
    })
}