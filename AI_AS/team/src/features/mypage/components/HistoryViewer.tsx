'use client'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Table, LayoutGrid } from 'lucide-react'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface HistoryItem {
  date: string
  score: number
}

interface HistoryViewerProps {
  items: HistoryItem[]
}

export default function HistoryViewer({ items }: HistoryViewerProps) {
  const [view, setView] = useState<'card' | 'table'>('card')
  const labels = items.map(i => i.date)
  const data = items.map(i => i.score)

  return (
    <section className="w-full max-w-2xl mx-auto mt-8">
      <div className="flex gap-2 mb-4">
        <button onClick={() => setView('card')} className={`p-2 rounded ${view === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}><LayoutGrid /></button>
        <button onClick={() => setView('table')} className={`p-2 rounded ${view === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}><Table /></button>
      </div>
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h3 className="text-lg font-bold text-blue-700 mb-2">점수 추이</h3>
        <Line
          data={{
            labels,
            datasets: [
              {
                label: '점수',
                data,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37,99,235,0.1)',
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
            },
            scales: {
              y: { min: 0, max: 5, ticks: { stepSize: 1 } },
            },
          }}
        />
      </div>
      {view === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div key={i} className="bg-blue-50 rounded-xl p-4 flex flex-col gap-2">
              <div className="font-semibold text-blue-700">{item.date}</div>
              <div className="text-gray-700">점수: <span className="font-bold">{item.score}</span></div>
            </div>
          ))}
        </div>
      ) : (
        <table className="w-full text-left mt-4">
          <thead>
            <tr className="text-blue-700 border-b">
              <th className="py-2">날짜</th>
              <th className="py-2">점수</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-b">
                <td className="py-2">{item.date}</td>
                <td className="py-2">{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
} 