# Encoding: utf-8
import os
import json
from urllib.request import urlretrieve
from PIL import Image
import numpy as np
val = os.system('cd .. && /usr/local/bin/node scripts/build-origin.js')
print('DXY Data update.' + str(val))
val = os.system('wget -O - http://c.m.163.com/nc/article/headline/T1348647853363/0-40.html > data/n163.json')
f163 = open('data/n163.json',encoding='utf-8')
news = json.load(f163)
f163.close()
newsDict = {}
for new in news['T1348647853363']:
    newsDict[new['docid']] = new
newsf = []
for new in newsDict:
    newsf.append(newsDict[new])
newsfw = {}
newsfw['T1348647853363'] = newsf
with open('./data/n163.json', 'w', encoding='utf-8') as fp:
    json.dump(newsfw, fp, ensure_ascii=False)
fp.close()
print('n163 Data update.' + str(val))
f = open('data/overall.json',encoding='utf-8')
user_dic = json.load(f)
print("加载入文件完成...")
print(user_dic['dailyPics'])
for img_url in user_dic['quanguoTrendChart']:
    kp = img_url['imgUrl']
    print(kp)
    filename = 'images/' + kp.split('/')[-1]
    urlretrieve(kp, filename)
    im = Image.open(filename)
    im_array = im.load()
    im_nparray = np.array(im)
    print(im.size)
    for row in range(im.size[0]):
        for line in range(im.size[1]):
            if im_array[row, line][0] >= 235 and im_array[row, line][1] >= 235 and im_array[row, line][2] >= 235:
                im_array[row, line] = (255, 255, 255)
    im = im.crop((0, 140, im.size[0], im.size[1]))
    if (img_url['title'] == '非湖北现存确诊'):
        im = im.crop((0, 140, im.size[0], im.size[1]))
    im.save(filename)
for img_url in user_dic['hbFeiHbTrendChart']:
    kp = img_url['imgUrl']
    print(kp)
    filename = 'images/' + kp.split('/')[-1]
    urlretrieve(kp, filename)
    im = Image.open(filename)
    im_array = im.load()
    im_nparray = np.array(im)
    print(im.size)
    for row in range(im.size[0]):
        for line in range(im.size[1]):
            if im_array[row, line][0] >= 235 and im_array[row, line][1] >= 235 and im_array[row, line][2] >= 235:
                im_array[row, line] = (255, 255, 255)
    im  = im.crop((0, 140, im.size[0], im.size[1]))
    im.save(filename)
val = os.system('cd .. && /usr/local/bin/npm install')
print('安装依赖' + str(val))
val = os.system('cd .. && /usr/local/bin/npm run build')
print('build complete' + str(val))
val = os.system('cp ../build/index.html ../build/ncov/')
print('Done.' + str(val))
val = os.system('/usr/bin/python3 gb.py')
print('GB Done.' + str(val))
val = os.system('cp -r data/ ../build/ncov/')
print('GB Done.' + str(val))

f = open('./data/policy_2020.2.18.json')
fg = open('../build/ncov/data/zc_zhy.json', 'w')
fb = open('../build/ncov/data/zc_bj.json', 'w')
fd = open('../build/ncov/data/zc_df.json', 'w')
jd = json.load(f)
gwy = []
bj = []
df = []
for line in jd:
    if '国务院' in line['publisher'] or '商务部' in line['publisher']:
        gwy.append(line)
    elif '北京' in line['publisher']:
        bj.append(line)
    else:
        df.append(line)
json.dump(gwy, fg)
json.dump(bj, fb)
json.dump(df, fd)
f.close()
fg.close()
fb.close()
fd.close()

