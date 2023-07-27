var exec = cordova.require('cordova/exec');

function newProgressEvent(result) {
    var event = {
            loaded: result.loaded,
            total: result.total
    };
    return event;
}

exports.unzip = function(fileName, outputDirectory, callback, progressCallback) {
    var win = function(result) {
        if (result && typeof result.loaded != "undefined") {
            if (progressCallback) {
                return progressCallback(newProgressEvent(result));
            }
        } else if (callback) {
            callback(0);
        }
    };
    var fail = function(result) {
        if (callback) {
            callback(-1);
        }
    };
    var http2file = function (httpUrl) {
      const httpP = "http://localhost/__cdvfile_files__/"
      if (-1 == httpUrl.indexOf(httpP)) {
        return httpUrl
      }
      return httpUrl.replace(httpP, cordova.file.dataDirectory)
    }
    console.log({fileName, outputDirectory, fileNameFile:http2file(fileName), outputDirectoryFile:http2file(outputDirectory), cordova})
    exec(win, fail, 'Zip', 'unzip', [http2file(fileName), http2file(outputDirectory)]);
    // exec(win, fail, 'Zip', 'unzip', [fileName, outputDirectory]);
};