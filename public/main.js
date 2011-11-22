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

        // Get variables to start reading the file
        var file = e.dataTransfer.files[0];
        var fileReader = new FileReader();
        var position = 0;

        // Read the first blob
        // TODO: Make this work in FF
        var blob = file.webkitSlice(0, BLOB_SIZE);
        fileReader.readAsBinaryString(blob);

        // Fired after each blob
        fileReader.onload = (function(file) {
            return function(e) {
                // just print to console for now
                console.log(e.target.result);

                // Update the current position in the file
                position = position + e.loaded;

                // Update progress diablog
                $('#progress').text(Math.round((position / file.size) * 100) + '%');

                // If the file isn't done
                if (e.loaded != 0) {
                    // Get the next blob
                    var blob = file.webkitSlice(position, position + BLOB_SIZE);
                    fileReader.readAsText(blob);
                }
            };
        })(file);
    });
});
