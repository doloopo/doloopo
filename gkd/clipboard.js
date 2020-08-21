/*
* /clipboard.js
* 用于调用剪贴板。
*
* Elements:
* #pasteimage, <input type=text>, placeholder set, event added.
* #tulip, <image>, src set.
* #drawbutton, <button>, disabled set.
*/

var inputt = document.getElementById("pasteimage");
                    
inputt.addEventListener( 'paste', function( event ){
    var clipboardData = event.clipboardData, i = 0, items, item, types;

    if( clipboardData ){
        items = clipboardData.items;
    
        if( !items ){
            return;
        }
    
        item = items[0];
        // 保存在剪贴板中的数据类型
        types = clipboardData.types || [];
    
        for( ; i < types.length; i++ ){
            if( types[i] === 'Files' ){
                item = items[i];
                break;
            }
        }
    
        // 判断是否为图片数据
        if( item && item.kind === 'file' && item.type.match(/^image\//i) ){
            // 读取该图片           
            imgReader( item );
        }
    }
})
var imgReader = function( item ){
var file = item.getAsFile(),
    reader = new FileReader()
    // 读取文件后将其显示在网页中
    reader.onload = function( e ){
        document.getElementById("tulip").src = e.target.result;
    };
// 读取文件
reader.readAsDataURL( file );

document.getElementById("drawbutton").disabled = "";

document.getElementById("pasteimage").placeholder = "OK!";
};