import React from 'react'
import ReactApexChart from 'react-apexcharts'
import MyCard from '../../../shared/MyCard'
import Wrap from '../../../shared/Wrap'
import { useAgentProfileStore } from '../store/agentProfile.store'

const VisitsDashboard = () => {
  const { objectivesToday } = useAgentProfileStore()
  const total = objectivesToday?.visitsTotal
  const completed = objectivesToday?.visitsCompleted
  const precent = completed && total ? (completed / total) * 100 : 0
  const totalObj = objectivesToday?.objectiveTotal
  const completedObj = objectivesToday?.objectiveCompleted
  const precentObj =
    totalObj && completedObj ? (completedObj / totalObj) * 100 : 0
  const series2 = [precent]
  const options2 = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
      },
    },
    labels: ['ביקורים'],
    colors: ['#24426b'],
  }

  const series1 = [precentObj]
  const options1 = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
      },
    },
    labels: ['משימות'],
    colors: ['#24426b'],
  }
  return (
    <div className="myMarginTop">
      <MyCard>
        <div className="flex-container visit-dash-cont">
          <div className="container flex-container col-lg-6">
            <div className="textAlign col-lg-4">
              <h3>ביקורים</h3>
              <div className="text-wrap-cont">
                <h4>בוצע</h4>
                <Wrap>{objectivesToday?.visitsCompleted ?? 0}</Wrap>
              </div>
              <div className="text-wrap-cont">
                <h4>לביצוע</h4>
                <Wrap>{objectivesToday?.visitsTotal ?? 0}</Wrap>
              </div>
            </div>
            <div className="apex-cont col-lg-7">
              {/* @ts-ignore */}
              <ReactApexChart
                options={options2}
                series={series2}
                type="radialBar"
                height={250}
              />
            </div>
          </div>
          <div className="container flex-container col-lg-6">
            <div className="textAlign col-lg-4">
              <h3>משימות</h3>
              <div className="text-wrap-cont">
                <h4>בוצע</h4>
                <Wrap>{objectivesToday?.objectiveCompleted ?? 0}</Wrap>
              </div>
              <div className="text-wrap-cont">
                <h4>לביצוע</h4>
                <Wrap>{objectivesToday?.objectiveTotal ?? 0}</Wrap>
              </div>
            </div>
            <div className="apex-cont col-lg-7">
              {/* @ts-ignore */}
              <ReactApexChart
                options={options1}
                series={series1}
                type="radialBar"
                height={250}
              />
            </div>
          </div>
        </div>
      </MyCard>
    </div>
  )
}

export default VisitsDashboard
