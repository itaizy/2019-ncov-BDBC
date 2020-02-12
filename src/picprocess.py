# Encoding: utf-8
import os
import json
from urllib.request import urlretrieve
from PIL import Image
import numpy as np
val = os.system('cd .. && node scripts/build-origin.js')
print('DXY Data update.' + str(val))
val = os.system('wget -O - http://c.m.163.com/nc/article/headline/T1348647853363/0-40.html > data/n163.json')
print('n163 Data update.' + str(val))
f = open('data/overall.json',encoding='utf-8')
user_dic = json.load(f)
print("加载入文件完成...")
print(user_dic['dailyPics'])
for img_url in user_dic['quanguoTrendChart']:
    kp = img_url['imgUrl']
    filename = 'images/' + kp.split('/')[-1]
    urlretrieve(kp, filename)
    im = Image.open(filename)
    im_array = im.load()
    im_nparray = np.array(im)
    print(im.size)
    for row in range(im.size[0]):
        for line in range(im.size[1]):
            if im_array[row, line][0] > 240 and im_array[row, line][1] > 240 and im_array[row, line][2] > 240:
                im_array[row, line] = (255, 255, 255)
    im.save(filename)
for img_url in user_dic['hbFeiHbTrendChart']:
    kp = img_url['imgUrl']
    filename = 'images/' + kp.split('/')[-1]
    urlretrieve(kp, filename)
    im = Image.open(filename)
    im_array = im.load()
    im_nparray = np.array(im)
    print(im.size)
    for row in range(im.size[0]):
        for line in range(im.size[1]):
            if im_array[row, line][0] > 240 and im_array[row, line][1] > 240 and im_array[row, line][2] > 240:
                im_array[row, line] = (255, 255, 255)
    im.save(filename)
val = os.system('cd .. && npm install')
print('安装依赖' + str(val))
val = os.system('cd .. && npm run build')
print('build complete' + str(val))
val = os.system('cp ../build/index.html ../build/ncov/')
print('Done.' + str(val))
