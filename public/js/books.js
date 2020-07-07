$(document).ready(function () {
    getBook()

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

const AddBook = () => {
    $('#add_book').submit(e => {
        e.preventDefault()
        swal({
            title: "Add Book",
            text: "This book will be added to the system",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Continue",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, () => {})
    })
}