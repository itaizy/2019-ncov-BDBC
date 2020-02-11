import React, { useEffect, useState } from 'react'
import ReactEcharts from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'

// import 'echarts/lib/chart/map'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/legend'

function Predict ({ data }) {

  const getOption = () => {
    return {
      // color: colors,

      // tooltip: {
      //     trigger: 'none',
      //     axisPointer: {
      //         type: 'cross'
      //     }
      // },
      legend: {
          data: data.legend
      },
      grid: {
          top: 30,
          bottom: 50
      },
      xAxis: [
          {
              type: 'category',
              axisTick: {
                  alignWithLabel: true
              },
              axisLine: {
                  onZero: false,
                  lineStyle: {
                      // color: colors[1]
                  }
              },
              axisLabel: {
                show: true,
                 textStyle: {
                   fontSize : 6      //更改坐标轴文字大小
                 },
                 interval: 0,
                 rotate: 60,
              },
              data: data.xAxis
          }
      ],
      yAxis: [
          {
              type: 'value',
              axisLabel: {
                show: true,
                 textStyle: {
                   fontSize : 6      //更改坐标轴文字大小
                 }
              },
          }
      ],
      series: [
          {
              name: data.legend[1],
              type: 'line',
              smooth: true,
              itemStyle:{
                  normal:{
                      lineStyle:{
                          width:2,
                          type:'dotted'  //'dotted'虚线 'solid'实线
                      }
                  }
              }, 
              data: data.predict
          },
          {
              name: data.legend[0],
              type: 'line',
              smooth: true,
              data: data.truedata
          }
      ]
    }
  }
  return (
    <ReactEcharts
      echarts={echarts}
      option={getOption()}
      lazyUpdate={true}
      onEvents={{
        click (e) {
          // onClick(e.name)
        }
      }}
      style={{height: "200px"}}
    />
  )
}

export default Predict
