import React, { useEffect, useState } from 'react'
import MyCard from '../../../shared/MyCard'
import ReactApexChart from 'react-apexcharts'
import YearSelectorBanner from './YearSelectorBanner'
import { useAgentProfileStore } from '../store/agentProfile.store'

const TargetsDashboard = () => {
  const { monthAgentSales } = useAgentProfileStore()
  const seriesDesktop = [
    {
      name: 'Actual',
      data: monthAgentSales,
    },
  ]

  const optionsMob = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    colors: ['#FFAD0D'],
    dataLabels: {
      formatter: function (val: any, opt: any) {
        const goals =
          opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex].goals

        if (goals && goals.length) {
          return `${val} / ${goals[0].value}`
        }
        return val
      },
      enabled: false,
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['מכירות', 'יעד'],
      markers: {
        fillColors: ['#FFAD0D', '#6F3FF5'],
      },
      fill: {
        colors: ['#FFAD0D', '#6F3FF5'],
      },
    },
  }
  const optionsDesktop = {
    chart: {
      height: 350,
      width: 600,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        columnWidth: '60%',
      },
    },
    colors: ['#FFAD0D'],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['מכירות', 'יעד'],
      markers: {
        fillColors: ['#FFAD0D', '#6F3FF5'],
      },
    },
    fill: {
      colors: ['#FFAD0D', '#6F3FF5'],
    },
  }

  return (
    <div className="myMarginTop myMarginBottom">
      <MyCard>
        <div className="container targets-cont">
          <h4>עמידה ביעדים</h4>
          <div className="myMarginTop">
            <YearSelectorBanner isDashborad={true} />
          </div>
          {window.innerWidth > 1050 ? (
            <>
              <ReactApexChart
                //  @ts-ignore
                options={optionsDesktop}
                series={seriesDesktop}
                type="bar"
                height={350}
              />
            </>
          ) : (
            <>
              <ReactApexChart
                // @ts-ignore
                options={optionsMob}
                series={seriesDesktop}
                type="bar"
                height={550}
                styles
              />
            </>
          )}
        </div>
      </MyCard>
    </div>
  )
}

export default TargetsDashboard
