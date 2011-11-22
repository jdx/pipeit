BLOB_SIZE = 128;

$(document).ready(function() {
    $.event.props.push('dataTransfer');
    var dropbox = $('#dropbox')
    .bind('dragover', function(e) {
        e.stopPropagation();
        e.preventDefault();
        $('#dropbox').css({'background-color': '#ff0000'});
    })
    .bind('dragleave', function() {
        $('#dropbox').css({'background-color': '#000000'});
    })
    .bind('drop', function(e) {
        e.stopPropagation();
        e.preventDefault();

        var file = e.dataTransfer.files[0];
        var fileReader = new FileReader();
        var blob = file.webkitSlice(0, BLOB_SIZE);
        var position = 0;
        fileReader.readAsBinaryString(blob);
        fileReader.onload = (function(file) {
            return function(e) {
                console.log(e.target.result);
                position = position + e.loaded;
                $('#progress').text(Math.round((position / file.size) * 100) + '%');
                var blob = file.webkitSlice(position, position + BLOB_SIZE);
                if (e.loaded != 0) {
                    fileReader.readAsText(blob);
                }
            };
        })(file);
    });
});
