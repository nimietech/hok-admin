
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, Upload } from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <AdminSidebar />
      
      <div className="flex-1 overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage your store settings and preferences</p>
            </div>
            
            <Button>
              <Save size={16} className="mr-2" />
              Save Changes
            </Button>
          </div>
        </header>

        <main className="p-6 space-y-6">
          {/* Store Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Store Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                <Input defaultValue="Hok Store" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                <Input defaultValue="contact@hokstore.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <Input defaultValue="+1 (555) 123-4567" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <Input defaultValue="USD" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Store Description</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows={3}
                defaultValue="Premium clothing and accessories for the modern lifestyle"
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive email alerts for new orders</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Low Stock Alerts</p>
                  <p className="text-sm text-gray-600">Get notified when products are running low</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Order Updates</p>
                  <p className="text-sm text-gray-600">Notifications for order status changes</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stripe Public Key</label>
                <Input placeholder="pk_test_..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PayPal Client ID</label>
                <Input placeholder="Your PayPal Client ID" />
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Accept Credit Cards</p>
                  <p className="text-sm text-gray-600">Allow customers to pay with credit/debit cards</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Accept PayPal</p>
                  <p className="text-sm text-gray-600">Enable PayPal checkout option</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Shipping Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Free Shipping Threshold</label>
                <Input defaultValue="$50.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Standard Shipping Rate</label>
                <Input defaultValue="$5.99" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Express Shipping Rate</label>
                <Input defaultValue="$12.99" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Processing Time (days)</label>
                <Input defaultValue="1-2" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
