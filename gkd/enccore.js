/*
* /enccode.js.
* 加密核心。
*
* myRandom(seed, min, max)
* DrawOnCanvas()
*     Elements:
*         #myCanvas
*         #tulip
* DownloadPNG()
*     Dependences:
*         /download.js
* SwapCanvasLines(A, B, deltah)
*     Elements:
*         #myCanvas
* Enc(). Dec()
*     Elements:
*         #myCanvas
*         #key
*         #count
*         #deltah
*/
            function myRandom(seed, min, max){
                seed = (seed * 9301 + 49297) % 233280;

                return parseInt((seed / 233280.0 * 10000000) % (max - min + 1) + min);
            }

            function Test3(){
                document.getElementById("debug").innerHTML += (myRandom(document.getElementById('key').value, 1, 2) + "<br />");
                document.getElementById("debug").innerHTML += (myRandom(document.getElementById('key').value, 1, 100) + "<br />");
                document.getElementById("debug").innerHTML += (myRandom(document.getElementById('key').value, 1, 100) + "<br />");
                document.getElementById("debug").innerHTML += (myRandom(document.getElementById('key').value, 1, 2) + "<br />");
            }

            //把图画上canvas的函数
            function DrawOnCanvas(){

                //document.getElementById("tulip").src = window.URL.createObjectURL(document.getElementById("laFile").files[0]);

                var c=document.getElementById("myCanvas");
                var ctx=c.getContext("2d");
                var img=document.getElementById("tulip");

                c.style="Width: " + img.naturalWidth + "px; Height: " + img.naturalHeight + "px"; 
                c.width = img.naturalWidth;
                c.height = img.naturalHeight;
                ctx.clearRect(0,0,c.width,c.height);  
                ctx.drawImage(img, 0, 0, c.width, c.height);
            }

            /* 这个函数在手机端有bug
            function Download(srlink){
                var link = document.createElement('a');
                //设置下载的文件名
                var myDate = new Date();
                link.download = "Image" + myDate.toLocaleString( ) + ".png";
                link.style.display = 'none';
                //设置下载路径
                link.href = srlink;
                //触发点击
                document.body.appendChild(link);
                link.click();
                //移除节点
                document.body.removeChild(link);
            }
            */

            function DownloadPNG(){
                var myDate = new Date();
                download(document.getElementById('myCanvas').toDataURL('image/png'), "Image" + myDate.toLocaleString( ) + ".png");
            }

            //交换第 A 行与第 B 行，从第 1 行开始，行高为 deltah
            function SwapCanvasLines(A, B, deltah){
                var c=document.getElementById("myCanvas");
                var ctx=c.getContext("2d");

                var dataA = ctx.getImageData(0, A - 1, c.clientWidth - 1, deltah);
                var dataB = ctx.getImageData(0, B - 1, c.clientWidth - 1, deltah);

                ctx.putImageData(dataB, 0, A - 1);
                ctx.putImageData(dataA, 0, B - 1);
            }

            function Enc(){
                var c=document.getElementById("myCanvas");
                var dh = document.getElementById("deltah").value;

                for(var j = 0; j < document.getElementById("count").value; j++){
                    for (var i=parseInt((c.clientHeight-dh+1)/dh);i>=1;i--)
                    { 
                        SwapCanvasLines(myRandom(document.getElementById('key').value, 1, i)*dh, i*dh, dh);
                    }
                }
            }

            function Dec(){
                var c = document.getElementById("myCanvas");
                var dh = document.getElementById("deltah").value;

                for(var j = 0; j < document.getElementById("count").value; j++){
                    for (var i=1;i<=parseInt((c.clientHeight-dh+1)/dh);i++)
                    { 
                        SwapCanvasLines(myRandom(document.getElementById('key').value, 1, i)*dh, i*dh, dh);
                    }
                }
            }