
import { useState } from "react";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Settings, 
  FileText,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: ShoppingCart, label: "Products" },
  { icon: FileText, label: "Orders" },
  { icon: Users, label: "Customers" },
  { icon: Settings, label: "Settings" },
];

export const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} min-h-screen`}>
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
            <h1 className="text-xl font-bold text-gray-900">Hok Store</h1>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setCollapsed(!collapsed)}
          className="hover:bg-gray-100"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon size={20} />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
