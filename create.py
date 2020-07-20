import time
from datetime import date

shortname = input('enter shortname')
link = input('enter link')
d = date.today()

wrt = ('''<!DOCTYPE html>
</html>
<head>
<meta charset="utf-8">
<script> 
window.location.href="%s";
</script>
</head>
<body>
<div style="max-width:800px; margin:auto">
	<h1>
		jntm.tk 链接中转站
	</h1>
	
	<p>你正在跳转到：<a href="%s">%s</a></p>
	<p>如果没有自动跳转，可以点击上面的链接或复制链接到浏览器访问。</p>
	
	<p style="color: Lightgrey">GitHub 托管，页面创建于 %d 年 %d 月 %d 日</p>
</div>
</body>
</html>'''% (link, link, link, d.year, d.month, d.day))

print(wrt)

with open(shortname, 'w') as file_object:
    file_object.write(wrt)
