var CONTAINERS_URL = 'http://1....:8080/NamasteProfilePic/';
module.exports = function(Files) {

    Files.upload = function (ctx,options,cb) {
        if(!options) options = {};
        ctx.req.params.container = 'common';
        Files.app.models.container.upload(ctx.req,ctx.result,options,function (err,fileObj) {
            if(err) {
                cb(err);
            } else {
                var resultobj=[];
                var fileInfo = fileObj.files.file[0];
                /*console.log('length'+fileObj.files.file.length)
                for (var i =0; (fileObj.files.file.length-1)>i; i++) {
                    fileInfo = fileObj.files.file[i];
                    Files.create({
                    name: fileInfo.name,
                    type: fileInfo.type,
                    container: fileInfo.container,
                    url: CONTAINERS_URL+fileInfo.container+'/'+fileInfo.name
                },function (err,obj) {
                    if (err !== null) {
                        cb(err);
                    } else {
                        console.log(obj);
                        console.log(i);
                        resultobj.push(obj);
                        console.log('result object : '+resultobj);
                    }
                });
                }
                console.log(resultobj);

                cb(null, resultobj);*/
                var url=[];
                //var objs=[];
                for (var i =0; (fileObj.files.file.length)>i; i++) {
                    console.log(i);
                    //url: CONTAINERS_URL+fileInfo.container+'/'+fileInfo.name,
                     url[i]=CONTAINERS_URL+fileInfo.container+'/'+fileObj.files.file[i].name;
                    //objs.push(url[i]);
                    objs={
                             "message":"user status uploaded.",
                             "response_code":"200",
                             "status":true,
                             "url": url[i]
                        }
                    console.log(url[i]);
                }
                var objs={
                             "message":"user status uploaded.",
                             "response_code":"200",
                             "status":true,
                             "url": url
                        }

                Files.create({
                    name: fileInfo.name,
                    type: fileInfo.type,
                    container: fileInfo.container,
                    url:objs
                    //for (var i =0; (fileObj.files.file.length-1)>i; i++) {
                    //url: CONTAINERS_URL+fileInfo.container+'/'+fileInfo.name
                    //url: CONTAINERS_URL+fileInfo.container+'/'+fileObj.files.file[i].name
                
                },function (err,obj) {
                    if (err !== null) {
                        cb(err);
                    } else {
                        cb(null, obj);
                    }
                });
            }
        });
    };

    Files.remoteMethod(
        'upload',{
            description: 'Uploads a file',
            accepts: [
                { arg: 'ctx', type: 'object', http: { source:'context' } },
                { arg: 'options', type: 'object', http:{ source: 'query'} }
            ],
            returns: {
                arg: 'fileObject', type: 'object', root: true
            },
            http: {verb: 'post'}
        }
    );

};