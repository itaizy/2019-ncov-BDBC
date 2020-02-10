# Encoding: utf-8
import os
import json
from urllib.request import urlretrieve
from PIL import Image
import numpy as np
val = os.system('cd .. && node scripts/build-origin.js')
# print(val)
f = open('data/overall.json',encoding='utf-8')
user_dic = json.load(f)
print("加载入文件完成...")
print(user_dic['dailyPics'])
for img_url in user_dic['dailyPics']:
    filename = 'images/' + img_url.split('/')[-1]
    urlretrieve(img_url, filename)
    im = Image.open(filename)
    im_array = im.load()
    im_nparray = np.array(im)
    print(im.size)
    for row in range(im.size[0]):
        for line in range(im.size[1]):
            if im_array[row, line][0] > 240 and im_array[row, line][1] > 240 and im_array[row, line][2] > 240:
                im_array[row, line] = (255, 255, 255)
    im.save()
val = os.system('cd .. && npm install')
print(安装依赖 + str(val))
val = os.system('cd .. && npm run build')
print(build complete.)
