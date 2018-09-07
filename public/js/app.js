$(function(){

    $("#fetchdata").on('click', function(){
        $.get( "/profile/dashboard/fetchdata", function( data ) {
            var products = data['data'];
            $("#trdata").html('');

            $("#message").hide();

            var string = '';
            $.each(products, function(index, product ) {

                var id= product['_id'];
                //document.write(alert(m));
                string += '<tr><td>'+(index+1)+'</td><td>'+product['_id']+'</td><td>'+product['name']+'</td><td>'+product['category']+'</td><td>'+product['price']+'</td><td>'+product['manufacturer']+'</td><td><a href="profile/dashboard/update/'+id+'">Update</a> </td></tr>';
            });

            $("#trdata").html(string);
        });
    });

    $("#importdata").on('click', function(){
        $.get( "/profile/dashboard/import", function( data ) {
            $("#message").show().html(data['success']);
        });
    });

});