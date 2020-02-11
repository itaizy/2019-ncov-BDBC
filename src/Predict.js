import React, { useEffect, useState } from 'react'
import ReactEcharts from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'

// import 'echarts/lib/chart/map'
// import 'echarts/lib/component/visualMap'
import  'echarts/lib/chart/line';

function Predict ({ data }) {

  const getOption = () => {
    return {
      // color: colors,

      tooltip: {
          trigger: 'none',
          axisPointer: {
              type: 'cross'
          }
      },
      legend: {
          data: data.legend,
      },
      grid: {
          top: 70,
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
              axisPointer: {
                  label: {
                      formatter: function (params) {
                          return '降水量  ' + params.value
                              + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                      }
                  }
              },
              data: data.xAxis
          }
      ],
      yAxis: [
          {
              type: 'value'
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
    />
  )
}

export default Predict
