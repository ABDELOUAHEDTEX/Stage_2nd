import React from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts';

// ============================================
// Custom Tooltip
// ============================================

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
      <p className="text-white font-semibold mb-2">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-300">{entry.name}:</span>
          <span className="text-white font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

// ============================================
// Timeline Chart Component
// ============================================

export const TimelineChart = ({ data, height = 350 }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 text-gray-500">
        Aucune donnée disponible
      </div>
    );
  }
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="year" 
          stroke="#9CA3AF"
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="#9CA3AF"
          style={{ fontSize: '12px' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          wrapperStyle={{ fontSize: '14px', color: '#9CA3AF' }}
        />
        <Line 
          type="monotone" 
          dataKey="count" 
          stroke="#3B82F6" 
          strokeWidth={3}
          name="Nombre de stations"
          dot={{ fill: '#3B82F6', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

// ============================================
// Area Chart Component (Alternative Timeline)
// ============================================

export const AreaTimelineChart = ({ data, height = 350 }) => {
  if (!data || data.length === 0) return null;
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="year" 
          stroke="#9CA3AF"
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="#9CA3AF"
          style={{ fontSize: '12px' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area 
          type="monotone" 
          dataKey="count" 
          stroke="#3B82F6" 
          fillOpacity={1} 
          fill="url(#colorCount)"
          name="Stations"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

// ============================================
// Bar Chart Component (Provinces)
// ============================================

export const ProvinceBarChart = ({ data, height = 350 }) => {
  if (!data || data.length === 0) return null;
  
  // Trier et limiter aux top 10
  const sortedData = [...data].sort((a, b) => b.value - a.value).slice(0, 10);
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={sortedData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          type="number"
          stroke="#9CA3AF"
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          type="category"
          dataKey="name" 
          stroke="#9CA3AF"
          width={120}
          style={{ fontSize: '11px' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="value" 
          fill="#3B82F6"
          name="Stations"
          radius={[0, 8, 8, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

// ============================================
// Vertical Bar Chart Component
// ============================================

export const VerticalBarChart = ({ data, height = 350, dataKey = "value" }) => {
  if (!data || data.length === 0) return null;
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="name" 
          stroke="#9CA3AF"
          angle={-45}
          textAnchor="end"
          height={100}
          style={{ fontSize: '11px' }}
        />
        <YAxis 
          stroke="#9CA3AF"
          style={{ fontSize: '12px' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey={dataKey}
          fill="#10B981"
          name="Stations"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

// ============================================
// Pie Chart Component
// ============================================

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'];

export const StationPieChart = ({ data, height = 350 }) => {
  if (!data || data.length === 0) return null;
  
  // Limiter aux top 8 + "Autres"
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const topData = sortedData.slice(0, 8);
  const othersSum = sortedData.slice(8).reduce((sum, item) => sum + item.value, 0);
  
  const chartData = othersSum > 0 
    ? [...topData, { name: 'Autres', value: othersSum }]
    : topData;
  
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    if (percent < 0.05) return null; // Ne pas afficher si < 5%
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        style={{ fontSize: '12px', fontWeight: 'bold' }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomLabel}
          outerRadius={height / 3}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          verticalAlign="bottom"
          height={36}
          wrapperStyle={{ fontSize: '12px', color: '#9CA3AF' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

// ============================================
// Status Donut Chart
// ============================================

export const StatusDonutChart = ({ actives, inactives, height = 300 }) => {
  const data = [
    { name: 'En activité', value: actives, color: '#10B981' },
    { name: 'En arrêt', value: inactives, color: '#EF4444' },
  ];
  
  const total = actives + inactives;
  
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={height / 4}
            outerRadius={height / 3}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className="text-4xl font-bold text-white">{total}</p>
        <p className="text-sm text-gray-400">Total</p>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-300">{item.name}</span>
            <span className="text-sm font-bold text-white">({item.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// Stacked Bar Chart (Multi-series)
// ============================================

export const StackedBarChart = ({ data, height = 350 }) => {
  if (!data || data.length === 0) return null;
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="name" 
          stroke="#9CA3AF"
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="#9CA3AF"
          style={{ fontSize: '12px' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="actives" stackId="a" fill="#10B981" name="Actives" />
        <Bar dataKey="inactives" stackId="a" fill="#EF4444" name="En arrêt" />
      </BarChart>
    </ResponsiveContainer>
  );
};

// ============================================
// Chart Container Wrapper
// ============================================

export const ChartContainer = ({ title, children, subtitle, action }) => {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </div>
  );
};

export default {
  TimelineChart,
  AreaTimelineChart,
  ProvinceBarChart,
  VerticalBarChart,
  StationPieChart,
  StatusDonutChart,
  StackedBarChart,
  ChartContainer,
};
