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
                    return "<img src= " + data + " style='height:50px;width:50px;'/>"
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