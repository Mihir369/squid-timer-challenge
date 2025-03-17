
import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Sample data - this would come from your API in a real application
const sampleData = [
  { date: 'Jan 1', registrations: 156, capacity: 456 },
  { date: 'Jan 2', registrations: 230, capacity: 456 },
  { date: 'Jan 3', registrations: 305, capacity: 456 },
  { date: 'Jan 4', registrations: 350, capacity: 456 },
  { date: 'Jan 5', registrations: 410, capacity: 456 },
  { date: 'Jan 6', registrations: 425, capacity: 456 },
  { date: 'Jan 7', registrations: 432, capacity: 456 },
];

const RegistrationChart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="glass-card p-6 animate-slide-up">
      <div className="flex justify-between items-center mb-6">
        <h3 className="section-title text-squid-teal">Registration Status</h3>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 text-sm rounded-full font-medium ${isOpen ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {isOpen ? 'Registration Open' : 'Registration Closed'}
          </span>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={sampleData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
            <XAxis 
              dataKey="date" 
              stroke="#FFFFFF" 
              tick={{ fill: '#FFFFFF' }} 
            />
            <YAxis 
              stroke="#FFFFFF" 
              tick={{ fill: '#FFFFFF' }} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#222222', 
                borderColor: '#FF0A6C',
                color: '#FFFFFF',
              }} 
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="registrations" 
              stroke="#FF0A6C" 
              strokeWidth={3}
              activeDot={{ r: 8 }} 
              name="Registrations"
            />
            <Line 
              type="monotone" 
              dataKey="capacity" 
              stroke="#2CCED9" 
              strokeWidth={2}
              strokeDasharray="5 5" 
              name="Total Capacity"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 p-4 bg-black/20 rounded-lg border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Spots Remaining</p>
            <p className="text-2xl font-bold text-squid-teal">
              {sampleData[sampleData.length - 1].capacity - sampleData[sampleData.length - 1].registrations}
            </p>
          </div>
          
          <div>
            <p className="text-sm font-medium">Registration Rate</p>
            <p className="text-2xl font-bold text-squid-pink">
              {Math.round((sampleData[sampleData.length - 1].registrations / sampleData[sampleData.length - 1].capacity) * 100)}%
            </p>
          </div>
          
          <div>
            <p className="text-sm font-medium">Closing Date</p>
            <p className="text-2xl font-bold text-white">Jan 15</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationChart;
