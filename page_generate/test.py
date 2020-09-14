import sys
import markdown
import codecs

name = "test"
in_file = '%s.md' % (name)
out_file = '%s.html' % (name)

input_file = codecs.open(in_file, mode="r", encoding="utf-8")
text = input_file.read()
html = markdown.markdown(text)

print(html)