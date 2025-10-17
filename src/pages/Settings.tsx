import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";

// ✅ Small cute modal component
const SuccessModal = ({ message, onClose }: { message: string; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 2000); // auto-close after 2s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white px-6 py-4 rounded-2xl shadow-lg text-center animate-bounce">
        <p className="text-black font-semibold text-lg">{message}</p>
      </div>
    </div>
  );
};

const Settings = () => {
  // ✅ Load from localStorage or fallback to defaults
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("storeSettings");
    return saved
      ? JSON.parse(saved)
      : {
          storeName: "Hok Store",
          contactEmail: "contact@hokstore.com",
          phoneNumber: "+1 (555) 123-4567",
          currency: "USD",
          storeDescription: "Premium clothing and accessories for the modern lifestyle",

          notifications: {
            email: true,
            lowStock: true,
            orderUpdates: false,
          },

          payments: {
            stripeKey: "",
            paypalClientId: "",
            acceptCards: true,
            acceptPaypal: true,
          },

          shipping: {
            freeThreshold: "$50.00",
            standardRate: "$5.99",
            expressRate: "$12.99",
            processingTime: "1-2",
          },
        };
  });

  // ✅ Modal state
  const [showSuccess, setShowSuccess] = useState(false);

  // 2. Generic input handler
  const handleChange = (section: string, field: string, value: any) => {
    if (section) {
      setSettings((prev: any) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    } else {
      setSettings((prev: any) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  // 3. Save action (persist in localStorage)
  const handleSave = () => {
    localStorage.setItem("storeSettings", JSON.stringify(settings));
    setShowSuccess(true); // show modal
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <AdminSidebar />

      <div className="flex-1 overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">
                Manage your store settings and preferences
              </p>
            </div>

            <Button onClick={handleSave}>
              <Save size={16} className="mr-2" />
              Save Changes
            </Button>
          </div>
        </header>

        {/* ✅ The rest of your UI remains unchanged */}
        <main className="p-6 space-y-6">
          {/* Store Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Store Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Name
                </label>
                <Input
                  value={settings.storeName}
                  onChange={(e) =>
                    handleChange("", "storeName", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <Input
                  value={settings.contactEmail}
                  onChange={(e) =>
                    handleChange("", "contactEmail", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  value={settings.phoneNumber}
                  onChange={(e) =>
                    handleChange("", "phoneNumber", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <Input
                  value={settings.currency}
                  onChange={(e) =>
                    handleChange("", "currency", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Description
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows={3}
                value={settings.storeDescription}
                onChange={(e) =>
                  handleChange("", "storeDescription", e.target.value)
                }
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-600">
                    Receive email alerts for new orders
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.email}
                  onCheckedChange={(v) =>
                    handleChange("notifications", "email", v)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Low Stock Alerts</p>
                  <p className="text-sm text-gray-600">
                    Get notified when products are running low
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.lowStock}
                  onCheckedChange={(v) =>
                    handleChange("notifications", "lowStock", v)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Order Updates</p>
                  <p className="text-sm text-gray-600">
                    Notifications for order status changes
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.orderUpdates}
                  onCheckedChange={(v) =>
                    handleChange("notifications", "orderUpdates", v)
                  }
                />
              </div>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Settings
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stripe Public Key
                </label>
                <Input
                  value={settings.payments.stripeKey}
                  onChange={(e) =>
                    handleChange("payments", "stripeKey", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PayPal Client ID
                </label>
                <Input
                  value={settings.payments.paypalClientId}
                  onChange={(e) =>
                    handleChange("payments", "paypalClientId", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Accept Credit Cards</p>
                  <p className="text-sm text-gray-600">
                    Allow customers to pay with credit/debit cards
                  </p>
                </div>
                <Switch
                  checked={settings.payments.acceptCards}
                  onCheckedChange={(v) =>
                    handleChange("payments", "acceptCards", v)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Accept PayPal</p>
                  <p className="text-sm text-gray-600">
                    Enable PayPal checkout option
                  </p>
                </div>
                <Switch
                  checked={settings.payments.acceptPaypal}
                  onCheckedChange={(v) =>
                    handleChange("payments", "acceptPaypal", v)
                  }
                />
              </div>
            </div>
          </div>

          {/* Shipping Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Shipping Settings
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Free Shipping Threshold
                </label>
                <Input
                  value={settings.shipping.freeThreshold}
                  onChange={(e) =>
                    handleChange("shipping", "freeThreshold", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Standard Shipping Rate
                </label>
                <Input
                  value={settings.shipping.standardRate}
                  onChange={(e) =>
                    handleChange("shipping", "standardRate", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Express Shipping Rate
                </label>
                <Input
                  value={settings.shipping.expressRate}
                  onChange={(e) =>
                    handleChange("shipping", "expressRate", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Processing Time (days)
                </label>
                <Input
                  value={settings.shipping.processingTime}
                  onChange={(e) =>
                    handleChange("shipping", "processingTime", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ✅ Success Modal */}
      {showSuccess && (
        <SuccessModal
          message="Settings saved successfully!"
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
};

export default Settings;
