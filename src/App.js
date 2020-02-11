import React, { useState, Suspense, useEffect } from 'react'
import keyBy from 'lodash.keyby'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Carousel, WingBlank } from 'antd-mobile';
import all from './data/overall'
import provinces from './data/area'
import policy from './data/zc_new'

// import { Fab, Action } from 'react-tiny-fab';
// import 'react-tiny-fab/dist/styles.css';
// import React from 'react'
import { Container, Button, Link } from 'react-floating-action-button'

import Tag from './Tag'
import Person from './person'

import './App.css'
import axios from 'axios'
import TotalTag from "./TotalTag";

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

function OnePolicy ({ title, content, url, time, publisher, location }) {
  return (
    <div className="new">
      <div className="new-date">
        <div className="relative">
            {location}
        </div>
        {time}
      </div>
      <a className="title" href={url}>{ title }</a>
      <div className="summary">{ content.slice(0, 100) }...</div>
      <div className="relative-right">
          {publisher}
      </div>
    </div>
  )
}

function Policys () {
  const [len, setLen] = useState(8)
  // const [news, setNews] = useState([])

  return (
    <div className="card">
      <h2 id="Policy">政策扶持</h2>
      {
        policy
        .slice(0, len)
        .map(n => <OnePolicy {...n} key={n.index}/>)
      })
        
      }
      <div className="more" onClick={() => { setLen() }}>点击查看全部动态</div>
    </div>
  )
}

function Summary () {
  return (
    <div className="card info">
      <h2 id="Summary">信息汇总</h2>
      <li id="Trip"><a href="http://2019ncov.nosugartech.com/">确诊患者同行查询工具</a></li>
      <li>
        <a href="https://m.yangshipin.cn/static/2020/c0126.html">疫情24小时 | 与疫情赛跑</a>
      </li>
      <li><a href="https://news.qq.com/zt2020/page/feiyan.htm">腾讯新闻新冠疫情实时动态</a></li>
      <li><a href="https://3g.dxy.cn/newh5/view/pneumonia">丁香园新冠疫情实时动态</a></li>
      <li><a href="https://vp.fact.qq.com/home">新型冠状病毒实时辟谣</a></li>
      <li><a href="https://promo.guahao.com/topic/pneumonia">微医抗击疫情实时救助</a></li>
      <li><a href="http://www.ncov-report.com/">疫情评估与预测报告-北航</a></li>
      <li><a href="http://ncov.deepeye.tech/">疫情可视化分析-清华</a></li>
      <li><a href="http://vis.pku.edu.cn/ncov/">疫情可视化分析-北大</a></li>
    </div>
  )
}

function Resource () {
  return (
    <div className="card info">
      <h2 id="Resource">抗疫资源</h2>
      <li><a href="https://mp.weixin.qq.com/s/IQaSZxNirg-mIXCNTG-lTw">全国各省市口罩生产商联系方式</a></li>
    </div>
  )
}

function About () {
  return (
    <div className="card info">
      <h2 id="About">关于我们</h2>
      <li><a href="http://bdbc.buaa.edu.cn/">北京市大数据科学与脑机智能高精尖创新中心(BDBC)</a></li>
      <li><a href="https://rse.buaa.edu.cn/plus/view.php?aid=117">北航可靠性与系统工程学院李大庆课题组</a></li>
      {/* <a href="http://act.buaa.edu.cn/lijx/"><Person Icon="http://act.buaa.edu.cn/lijx/pics/lijx.JPG" Name="李建欣" Title="教授" Organization="计算机学院"/></a> */}
      {/* <a href="https://rse.buaa.edu.cn/plus/view.php?aid=117"><Person Icon="https://rse.buaa.edu.cn/uploads/150919/1-1509191GT43J.jpg" Name="李大庆" Title="研究员" Organization="可靠性与系统工程学院"/></a> */}
    </div>
  )
}

function Callback () {
  return (
    <div className="card info">
      <h2>意见反馈</h2>
      <li><a href="mailto:itaizy@163.com;taizy@act.buaa.edu.cn;yusc@act.buaa.edu.cn">发送邮件</a></li>
    </div>
  )
}

function Stat ({ modifyTime, confirmedCount, suspectedCount, deadCount, curedCount, name }) {
  return (
    <div>
      <h3 id="Stas">
        地域 {name ? `: ${name}` : ': 全国'}
        <span className="due">
          截止到: {dayjs(modifyTime).format('YYYY-MM-DD HH:mm')}
        </span>
      </h3>
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
        实时数据
        <span className="due">
          截止时间: {dayjs(modifyTime).format('YYYY-MM-DD HH:mm')}
        </span>
      </h2>
      <div className="row">
        <TotalTag number={all.confirmedIncr} total={all.confirmedCount} className="numberconfirmed">
          确诊
        </TotalTag>
        <TotalTag number={all.suspectedIncr || '-'}  total={all.suspectedCount} className="number">
          疑似
        </TotalTag>
        <TotalTag number={all.seriousIncr} total={all.seriousCount} className="dead">
          重症
        </TotalTag>
        <TotalTag number={all.deadIncr} total={all.deadCount} className="dead">
          死亡
        </TotalTag>
        <TotalTag number={all.curedIncr} total={all.curedCount} className="numbercured">
          治愈
        </TotalTag>
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
      <img src={require("./noprovince-small.jpg")} width="100%"/>

      {/* <div className="bg"></div> */}
      {/* <h1> */}
        {/* <small>新冠</small> */}
        {/* <br /> */}
        {/* 新冠疫情动态 · { province ? province.name : '全国' } */}
      {/* </h1> */}
      {/* <div> */}
        {/* <a href="http://bdbc.buaa.edu.cn/">By BDBC</a> */}
      {/* </div> */}
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
      // window.document.title = `新冠疫情实时地图 | ${province.name}`
      window.document.title = `新冠疫情实时数据导航`
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
      <Container
        style = {{zIndex: 100}}
      >
            <Link href="#Incr" >趋势</Link>
            <Link href="#Map"  >地图</Link>
            <Link href="#local" >定位</Link>
            <Link href="#Trip" >同程</Link>
            <Link href="#News" >动态</Link>
            <Link href="#Summary" >讯息</Link>
            <Link href="#Policy" >政策</Link>
            <Link href="#Resource" >资源</Link>
            <Link href="#About" >关于</Link>
            <Button
                rotate={true}
                 >导航</Button>
        </Container>
      <Header province={province} />
      <StatIncr modifyTime={all.modifyTime}/>
      {/* <WingBlank> */}
        {/* <Carousel
            autoplay={false}
            infinite
        > */}
            {all.dailyPics.map(n => (
              <div>
                <img src={require('./images/' + n.split('/')[n.split('/').length - 1])}
                     alt=""
                    //  style={{ width: '100%', verticalAlign: 'top' }}
                     style={{ width: '100%'}}
                     onLoad={() => {
                         // fire window resize event to change height
                         window.dispatchEvent(new Event('resize'));
                     }}/>
                     <WingBlank /></div>))}
        {/* </Carousel> */}
      {/* </WingBlank> */}
      
      <div className="card">
        <h2 id="Map">疫情地图 { province ? `· ${province.name}` : "(点击省市查看详情)" }
        {
          province ? <small
            onClick={() => setProvince(null)}
          >返回全国</small> : null
        }
        </h2>
        {/* <h3>点击省市查看详情</h3> */}
        <Stat { ...overall } name={province && province.name} modifyTime={all.modifyTime} />
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
        <h2 id="local">患者小区查询</h2>

      </div>
      <iframe src="https://map.sogou.com/m/shouji4/page/emap/?_=0.8058073278712437" width="100%" height="500px" frameBorder="0"></iframe>
      <News province={province} />
      <Policys />
      <Summary />
      <Resource />
      <About />
      <Callback />
      <Fallback />
    </div>
  );
}

export default App;
