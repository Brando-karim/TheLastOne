import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
    ShoppingCart, 
    Users, 
    TrendingUp, 
    Package, 
    Search, 
    Bell, 
    Settings,
    BarChart,
    PieChart
} from 'lucide-react';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    PieChart as RechartPieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';
import './DashboardPage.css';

export default function DashboardPage() {
    const navigate = useNavigate();
    const role = useSelector(state => state.user.role);
    
    useEffect(() => {
        if (role !== "admin")
            navigate("/login");
    }, [role, navigate]);
    
    const [selectedPeriod, setSelectedPeriod] = useState('week');
    
    // Sales data for line chart
    const salesData = [
        { name: 'Mon', sales: 4000 },
        { name: 'Tue', sales: 3000 },
        { name: 'Wed', sales: 5000 },
        { name: 'Thu', sales: 2780 },
        { name: 'Fri', sales: 1890 },
        { name: 'Sat', sales: 6390 },
        { name: 'Sun', sales: 3490 },
    ];

    // Product category data for pie chart
    const categoryData = [
        { name: 'Electronics', value: 400 },
        { name: 'Houses ', value: 300 },
        { name: 'Vehicules', value: 300 },
        { name: 'Services ', value: 200 },
        { name: 'Others', value: 100 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
    
    const stats = [
        { title: "Total Sales", value: "$45,231", change: "+12.5%", icon: TrendingUp },
        { title: "Active Users", value: "1,234", change: "+8.1%", icon: Users },
        { title: "Orders", value: "842", change: "+5.4%", icon: ShoppingCart },
        { title: "Products", value: "150", change: "+2.3%", icon: Package }
    ];

    const recentOrders = [
        { id: "12345", items: 2, total: "$199.99", status: "Processing" },
        { id: "12346", items: 1, total: "$99.99", status: "Shipped" },
        { id: "12347", items: 3, total: "$299.99", status: "Processing" },
    ];

    const lowStockItems = [
        { name: "Wireless Earbuds", stock: 5, threshold: 10 },
        { name: "MotoCycles", stock: 8, threshold: 15 },
        { name: "FC 25", stock: 3, threshold: 20 },
    ];

    return (
        <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-container">
          <div className="logo"></div>
          <span className="logo-text">Store Admin</span>
        </div>
        
        <nav className="nav-menu">
          {[
            { icon: TrendingUp, label: 'Dashboard', active: true },
            { icon: ShoppingCart, label: 'Orders' },
            { icon: Package, label: 'Products' },
            { icon: Users, label: 'Customers' },
            { icon: Settings, label: 'Settings' }
          ].map((item, index) => (
            <button
              key={index}
              className={`nav-item ${item.active ? 'active' : ''}`}
            >
              <item.icon className="nav-icon" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="search-container">
            <h1>Dashboard</h1>
            <div className="search-box">
              <Search className="search-icon" />
              <input type="text" placeholder="Search..." />
            </div>
          </div>
          <div className="user-menu">
            <button className="notification-btn">
              <Bell />
            </button>
            <div className="user-avatar">
              <span>JD</span>
            </div>
          </div>
        </header>

        {/* Time Period Selector */}
        <div className="period-selector">
          {['week', 'month', 'year'].map((period) => (
            <button 
              key={period}
              className={`period-btn ${selectedPeriod === period ? 'active' : ''}`}
              onClick={() => setSelectedPeriod(period)}
            >
              This {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <div className="stat-info">
                  <p className="stat-title">{stat.title}</p>
                  <h3 className="stat-value">{stat.value}</h3>
                </div>
                <div className="stat-icon">
                  <stat.icon />
                </div>
              </div>
              <div className="stat-footer">
                <TrendingUp className="trend-icon" />
                <span className="change-value">{stat.change}</span>
                <span className="change-period">vs last {selectedPeriod}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Sales Trend Chart */}
          <div className="chart-card">
            <div className="card-header">
              <h2>Sales Trend</h2>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#4ade80' }}></div>
                  <span>Weekly Sales</span>
                </div>
              </div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#4ade80" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="orders-card">
            <div className="card-header">
              <h2>Recent Orders</h2>
              <button className="view-all">View All</button>
            </div>
            <div className="orders-list">
              {recentOrders.map((order, index) => (
                <div key={index} className="order-item">
                  <div className="order-info">
                    <div className="order-icon">
                      <Package />
                    </div>
                    <div className="order-details">
                      <p className="order-id">Order #{order.id}</p>
                      <p className="order-meta">{order.items} items • {order.total}</p>
                    </div>
                  </div>
                  <span className="order-status">{order.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Categories Pie Chart */}
          <div className="chart-card">
            <div className="card-header">
              <h2>Product Categories</h2>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <RechartPieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="stock-card">
            <h2>Low Stock Alerts</h2>
            <div className="stock-list">
              {lowStockItems.map((item, index) => (
                <div key={index} className="stock-item">
                  <div className="stock-info">
                    <p className="stock-name">{item.name}</p>
                    <div className="stock-bar-container">
                      <div 
                        className="stock-bar" 
                        style={{ 
                          width: `${(item.stock / item.threshold) * 100}%`,
                          backgroundColor: item.stock < item.threshold * 0.3 ? 'red' : 
                                           item.stock < item.threshold * 0.6 ? 'orange' : 'yellow'
                        }}
                      ></div>
                    </div>
                    <p className="stock-quantity">{item.stock} / {item.threshold} units</p>
                  </div>
                  <button className="restock-btn btn btn-outline-dark">Restock</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
    );
}