
import { AdminSidebar } from "@/components/AdminSidebar";
import { StatsCard } from "@/components/StatsCard";
import { RecentOrders } from "@/components/RecentOrders";
import { TopProducts } from "@/components/TopProducts";
import { 
  ShoppingCart, 
  Users, 
  FileText, 
  Calendar,
  Search,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <AdminSidebar />
      
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input 
                  placeholder="Search..." 
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Bell size={16} className="mr-2" />
                Notifications
              </Button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentOrders />
            </div>
            <div>
              <TopProducts />
            </div>
          </div>

          {/* Additional Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h3>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Chart Placeholder - Sales Data</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">New Registrations</span>
                  <span className="font-semibold">+24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Active Sessions</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Bounce Rate</span>
                  <span className="font-semibold">23.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Avg. Session Duration</span>
                  <span className="font-semibold">4m 32s</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
