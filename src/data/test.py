import os
import json
from urllib.request import urlretrieve
# print(val)
f = open('zc.json',encoding='utf-8')
user_dic = json.load(f)
mydic = []
for one in user_dic:
    for kk in one.keys():
        tt = one[kk]
        tt["location"] = kk
        mydic.append(tt)
with open('zc_new.json', 'w', encoding='utf-8') as f:
    json.dump(mydic, f, ensure_ascii=False)
print(len(mydic))