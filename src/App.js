import React, { useState, Suspense, useEffect } from 'react'
import keyBy from 'lodash.keyby'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

import all from './data/overall'
import provinces from './data/area'

// import { Fab, Action } from 'react-tiny-fab';
// import 'react-tiny-fab/dist/styles.css';
// import React from 'react'
import { Container, Button, Link } from 'react-floating-action-button'

import Tag from './Tag'

import './App.css'
import axios from 'axios'

dayjs.extend(relativeTime)

const Map = React.lazy(() => import('./Map'))

const provincesByName = keyBy(provinces, 'name')
const provincesByPinyin = keyBy(provinces, 'pinyin')

const fetcher = (url) => axios(url).then(data => {
  return data.data.data
})

function New ({ title, summary, sourceUrl, pubDate, pubDateStr }) {
  return (
    <div className="new">
      <div className="new-date">
        <div className="relative">
          {dayjs(pubDate).locale('zh-cn').fromNow()}
        </div>
        {dayjs(pubDate).format('YYYY-MM-DD HH:mm')}
      </div>
      <a className="title" href={sourceUrl}>{ title }</a>
      <div className="summary">{ summary.slice(0, 100) }...</div>
    </div>
  )
}

function News ({ province }) {
  const [len, setLen] = useState(8)
  const [news, setNews] = useState([])

  useEffect(() => {
    fetcher(`https://file1.dxycdn.com/2020/0130/492/3393874921745912795-115.json?t=${46341925 + Math.random()}`).then(news => {
      setNews(news)
    })
  }, [])

  return (
    <div className="card">
      <h2 id="News">实时动态</h2>
      {
        news
          .filter(n => province ? province.provinceShortName === (n.provinceName && n.provinceName.slice(0, 2)) : true)
          .slice(0, len)
          .map(n => <New {...n} key={n.id} />)
      }
      <div className="more" onClick={() => { setLen() }}>点击查看全部动态</div>
    </div>
  )
}

function Summary () {
  return (
    <div className="card info">
      <h2 id="Summary">信息汇总</h2>
      <li>
        <a href="https://m.yangshipin.cn/static/2020/c0126.html">疫情24小时 | 与疫情赛跑</a>
      </li>
      <li><a href="http://2019ncov.nosugartech.com/">确诊患者同行查询工具</a></li>
      <li><a href="https://news.qq.com/zt2020/page/feiyan.htm">腾讯新闻新冠疫情实时动态</a></li>
      <li><a href="https://3g.dxy.cn/newh5/view/pneumonia">丁香园新冠疫情实时动态</a></li>
      <li><a href="https://vp.fact.qq.com/home">新型冠状病毒实时辟谣</a></li>
      <li><a href="https://promo.guahao.com/topic/pneumonia">微医抗击疫情实时救助</a></li>
    </div>
  )
}

function Resource () {
  return (
    <div className="card info">
      <h2 id="Resource">抗疫资源</h2>
      <li><a href="http://www.to2025.com/">全国各省市口罩生产商联系方式</a> <h3>关注公众号"工业汇"查询</h3></li>
    </div>
  )
}

function About () {
  return (
    <div className="card info">
      <h2 id="About">关于我们</h2>
      <li><a href="http://bdbc.buaa.edu.cn/">ACTBIGDATA, BDBC</a></li>
    </div>
  )
}

function Stat ({ modifyTime, confirmedCount, suspectedCount, deadCount, curedCount, name }) {
  return (
    <div className="card">
      <h2 id="Stas">
        统计 {name ? `· ${name}` : '· 全国'}
        <span className="due">
          截止时间: {dayjs(modifyTime).format('YYYY-MM-DD HH:mm')}
        </span>
      </h2>
      <div className="row">
        <Tag number={confirmedCount} className="numberconfirmed">
          确诊
        </Tag>
        <Tag number={suspectedCount || '-'} className="number">
          疑似
        </Tag>
        <Tag number={deadCount} className="dead">
          死亡
        </Tag>
        <Tag number={curedCount} className="numbercured">
          治愈
        </Tag>
      </div>
    </div>
  )
}

function StatIncr ({ modifyTime}) {
  return (
    <div className="card">
      <h2 id="Incr">
        全国新增
        <span className="due">
          截止时间: {dayjs(modifyTime).format('YYYY-MM-DD HH:mm')}
        </span>
      </h2>
      <div className="row">
        <Tag number={all.confirmedIncr} className="numberconfirmed">
          确诊
        </Tag>
        <Tag number={all.suspectedIncr || '-'} className="number">
          疑似
        </Tag>
        <Tag number={all.seriousIncr} className="dead">
          重症
        </Tag>
        <Tag number={all.deadIncr} className="dead">
          死亡
        </Tag>
        <Tag number={all.curedIncr} className="numbercured">
          治愈
        </Tag>
      </div>
    </div>
  )
}

function Fallback () {
  return (
    <div className="fallback">
      <div>
        特别鸣谢: <a href="https://github.com/shfshanyue">shfshanyue</a>
      </div>
    </div>
  )
}

function Area ({ area, onChange }) {
  const renderArea = () => {
    return area.map(x => (
      <div className="province" key={x.name || x.cityName} onClick={() => {
        // 表示在省一级
        if (x.name) {
          onChange(x)
        }
      }}>
        <div className={`area ${x.name ? 'active' : ''}`}>
          { x.name || x.cityName }
        </div>
        <div className="confirmed">{ x.confirmedCount }</div>
        <div className="death">{ x.deadCount }</div>
        <div className="cured">{ x.curedCount }</div>
      </div>
    ))
  }

  return (
    <>
      <div className="province header">
        <div className="area">地区</div>
        <div className="confirmed">确诊</div>
        <div className="death">死亡</div>
        <div className="cured">治愈</div>
      </div>
      { renderArea() }
    </>
  )
}

function Header ({ province }) {
  return (
    <header>
      <div className="bg"></div>
      <h1>
        {/* <small>新冠</small> */}
        <br />
        新冠疫情动态 · { province ? province.name : '全国' }
      </h1>
      <div>
        <a href="http://bdbc.buaa.edu.cn/">By ACTBIGDATA, BDBC</a>
      </div>
      { /* <i>By ACTBigData in BDBC</i> */}
    </header>
  )
}

function App () {
  const [province, _setProvince] = useState(null)
  const setProvinceByUrl = () => {
    const p = window.location.pathname.slice(1)
    _setProvince(p ? provincesByPinyin[p] : null)
  }

  useEffect(() => {
    setProvinceByUrl()
    window.addEventListener('popstate', setProvinceByUrl)
    return () => {
      window.removeEventListener('popstate', setProvinceByUrl)
    }
  }, [])

  useEffect(() => {
    if (province) {
      window.document.title = `新冠疫情实时地图 | ${province.name}`
    }
  }, [province])

  const setProvince = (p) => {
    _setProvince(p)
    window.history.pushState(null, null, p ? p.pinyin : '/')
  }

  const data = !province ? provinces.map(p => ({
    name: p.provinceShortName,
    value: p.confirmedCount
  })) : provincesByName[province.name].cities.map(city => ({
    name: city.fullCityName,
    value: city.confirmedCount
  }))

  const area = province ? provincesByName[province.name].cities : provinces
  const overall = province ? province : all

  return (
    <div>
      <Container>
            <Link href="#Incr" >趋势</Link>
            <Link href="#Stas" >统计</Link>
            <Link href="#Map"  >地图</Link>
            <Link href="#News" >动态</Link>
            <Link href="#Summary" >汇总</Link>
            <Link href="#Resource" >资源</Link>
            <Link href="#About" >About</Link>
            <Button
                rotate={true}
                 >导航</Button>
        </Container>
      <Header province={province} />
      <StatIncr modifyTime={all.modifyTime}/>
      {
        all.dailyPics.map(n => <img src={n} width="100%"></img>)
      }
      <Stat { ...overall } name={province && province.name} modifyTime={all.modifyTime} />
      
      <div className="card">
        <h2 id="Map">疫情地图 { province ? `· ${province.name}` : false }
              <div className="tip">
                点击省市查看详情
              </div>
        {
          province ? <small
            onClick={() => setProvince(null)}
          >返回全国</small> : null
        }
        </h2>
        <Suspense fallback={<div className="loading">地图正在加载中...</div>}>
          <Map province={province} data={data} onClick={name => {
            const p = provincesByName[name]
            if (p) {
              setProvince(p)
            }
          }} />
          {/*
            province ? false :
              <div className="tip">
                在地图中点击省份可跳转到相应省份的疫情地图，并查看该省相关的实时动态
              </div>
          */ }
        </Suspense>
        <Area area={area} onChange={setProvince} />
      </div>
      <div className="card">
        <h2>患者小区查询</h2>
      
      </div>
      <iframe src="https://map.sogou.com/m/shouji4/page/emap/?_=0.8058073278712437" width="100%" height="500px" frameborder="0"></iframe>
      <News province={province} />
      <Summary />
      <Resource />
      <About />
      <Fallback />
    </div>
  );
}

export default App;
