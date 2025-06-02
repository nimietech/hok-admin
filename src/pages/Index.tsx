
import { AdminSidebar } from "@/components/AdminSidebar";
import { StatsCard } from "@/components/StatsCard";
import { RecentOrders } from "@/components/RecentOrders";
import { TopProducts } from "@/components/TopProducts";
import { SalesChart } from "@/components/SalesChart";
import { 
  ShoppingCart, 
  Users, 
  FileText, 
  Calendar,
  Search,
  Bell,
  TrendingUp,
  ArrowUpRight,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className="flex w-full">
        {/* Sidebar - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:block">
          <AdminSidebar />
        </div>
        
        {/* Mobile sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
          <AdminSidebar />
        </div>
        
        <div className="flex-1 w-full overflow-hidden">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Mobile menu button */}
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu size={20} />
                </Button>
                
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-sm lg:text-base text-gray-600 hidden sm:block">Welcome back! Here's what's happening with your store.</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 lg:space-x-4">
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input 
                    placeholder="Search..." 
                    className="pl-10 w-48 lg:w-64"
                  />
                </div>
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <Bell size={16} className="mr-2" />
                  <span className="hidden lg:inline">Notifications</span>
                </Button>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-4 lg:p-6 space-y-4 lg:space-y-6 overflow-auto">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <StatsCard
                title="Total Revenue"
                value="$54,239"
                change="+12.5% from last month"
                changeType="positive"
                icon={ShoppingCart}
                iconColor="bg-gradient-to-r from-green-500 to-green-600"
              />
              <StatsCard
                title="Total Orders"
                value="1,429"
                change="+8.2% from last month"
                changeType="positive"
                icon={FileText}
                iconColor="bg-gradient-to-r from-blue-500 to-blue-600"
              />
              <StatsCard
                title="Total Customers"
                value="892"
                change="+15.1% from last month"
                changeType="positive"
                icon={Users}
                iconColor="bg-gradient-to-r from-purple-500 to-purple-600"
              />
              <StatsCard
                title="This Month"
                value="23"
                change="-2.4% from last month"
                changeType="negative"
                icon={Calendar}
                iconColor="bg-gradient-to-r from-orange-500 to-orange-600"
              />
            </div>

            {/* Charts and Tables Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              <div className="lg:col-span-2">
                <RecentOrders />
              </div>
              <div>
                <TopProducts />
              </div>
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <SalesChart />
              
              <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
                  <Button variant="ghost" size="sm">
                    <ArrowUpRight size={16} />
                  </Button>
                </div>
                <div className="space-y-4 lg:space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <TrendingUp size={16} className="lg:w-5 lg:h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm lg:text-base">Conversion Rate</p>
                        <p className="text-xs lg:text-sm text-gray-600">From visits to sales</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">3.4%</p>
                      <p className="text-sm text-green-600">+0.3%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Users size={16} className="lg:w-5 lg:h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm lg:text-base">New Customers</p>
                        <p className="text-xs lg:text-sm text-gray-600">This week</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">127</p>
                      <p className="text-sm text-green-600">+23</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <ShoppingCart size={16} className="lg:w-5 lg:h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm lg:text-base">Average Order</p>
                        <p className="text-xs lg:text-sm text-gray-600">Per customer</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">$67.50</p>
                      <p className="text-sm text-green-600">+$4.20</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <FileText size={16} className="lg:w-5 lg:h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm lg:text-base">Pending Orders</p>
                        <p className="text-xs lg:text-sm text-gray-600">Awaiting processing</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">8</p>
                      <p className="text-sm text-red-600">+3</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
