
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: LucideIcon;
  iconColor: string;
}

export const StatsCard = ({ title, value, change, changeType, icon: Icon, iconColor }: StatsCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          <p className={`text-sm mt-2 flex items-center ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
            <span className="mr-1">{changeType === 'positive' ? '↗' : '↘'}</span>
            {change}
          </p>
        </div>
        <div className={`p-3 rounded-full ${iconColor}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
};
