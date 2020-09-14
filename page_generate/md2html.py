import os
import re
import markdown

# 遍历文件夹


def walkFile(file):
    for root, dirs, files in os.walk(file):

        # root 表示当前正在访问的文件夹路径
        # dirs 表示该文件夹下的子目录名list
        # files 表示该文件夹下的文件list

        # 遍历文件
        for f in files:
            print(os.path.join(root, f))

        # 遍历所有的文件夹
        for d in dirs:
            print(os.path.join(root, d))


def generate_artical(md_path, static_path, article_base_path):
    for root, dirs, files in os.walk(md_path):

        # root 表示当前正在访问的文件夹路径
        # dirs 表示该文件夹下的子目录名list
        # files 表示该文件夹下的文件list

        # 遍历文件
        for f in files:
            if f[-3:] == ".md":
                with open(md_path + "\\" + f, 'r', encoding="utf-8") as fe:
                    c = fe.read()
                    title = re.findall(r'题(.*?)⋘', c)[0]
                    img = re.findall(r'图(.*?)⋘', c)[0]
                    author = re.findall(r'作(.*?)⋘', c)[0]
                    extra = re.findall(r'补(.*?)⋘', c)[0]
                    date = re.findall(r'时(.*?)⋘', c)[0]
                    # print(title, img, author, extra, date)

                    with open(article_base_path, 'r', encoding="utf-8") as basef:
                        b = basef.read()
                        b = b.replace("replace_label", "正文")
                        b = b.replace("replace_title", title)
                        b = b.replace("replace_img", img)
                        b = b.replace("replace_name", author, 1)
                        b = b.replace("replace_name_extra", extra)
                        b = b.replace("replace_date", date)
                        b = b.replace("replace_html", markdown.markdown(c))
                        with open(static_path + "\\%s.html" % f, 'w', encoding="utf-8") as htmlw:
                            htmlw.write(b)


generate_artical(".\\markdown", ".\\static", ".\\article_base.html")
