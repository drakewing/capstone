$(document).on('click', '#next', function(e) {

    let nextCursor = $("#next").attr("data-cursor");
    console.log(nextCursor);

    $.ajax({
        type: "GET",
        url: '/animals?cursor='+nextCursor,
        crossDomain: true,
        success: function (data) {
            $('#searchgrid').html(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log('xHR: ' + xhr);
            console.log('ajaxOption: ' + ajaxOptions);
            console.log('thrownError: ' + thrownError);
        }
    });
});
