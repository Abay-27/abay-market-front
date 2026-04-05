import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Package,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Activity,
  PackageX
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockOrders, mockUsers, products } from '@/lib/data';

const StatCard = ({ title, value, change, trend, icon: Icon, index }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.1 }}
  >
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-neutral-500">{title}</CardTitle>
        <div className="p-2 bg-orange-50 rounded-lg">
          <Icon className="h-4 w-4 text-orange-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-neutral-900">{value}</div>
        <div className="flex items-center mt-2">
          <Badge variant={trend === 'up' ? 'outline' : 'destructive'} className={`text-[10px] py-0 px-1.5 flex items-center gap-1 ${trend === 'up' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-50' : ''}`}>
            {trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {change}
          </Badge>
          <span className="text-xs text-neutral-400 ml-2">since last month</span>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export const DashboardPage = () => {
  // Using dynamic stats based on data.ts
  const totalRevenue = mockOrders.reduce((acc, curr) => acc + curr.total, 0);
  const activeUsersCount = mockUsers.filter(u => u.status === 'Active').length;
  const totalOrdersCount = mockOrders.length;
  const inventoryCount = products.length * 12; // Simplified logic

  const stats = [
    { title: 'Total Revenue', value: `Br ${totalRevenue.toLocaleString()}`, change: '0%', trend: 'up', icon: TrendingUp },
    { title: 'Active Users', value: activeUsersCount.toLocaleString(), change: '0%', trend: 'up', icon: Users },
    { title: 'Total Orders', value: totalOrdersCount.toLocaleString(), change: '0%', trend: 'up', icon: ShoppingCart },
    { title: 'Inventory Stock', value: inventoryCount.toLocaleString(), change: '0%', trend: 'up', icon: Package },
  ];

  // Using real empty orders
  const recentOrders = mockOrders.slice(0, 5);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Dashboard Overview</h2>
        <p className="text-neutral-500">Welcome back, here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={stat.title} {...stat} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 overflow-hidden border-neutral-200">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-neutral-50/50">
            <div>
              <CardTitle>Recent Sales Activity</CardTitle>
              <CardDescription>Latest orders from the marketplace</CardDescription>
            </div>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-neutral-100">
              {recentOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-neutral-500">
                  <PackageX className="w-12 h-12 mb-4 text-neutral-300" />
                  <p className="font-medium">No recent orders</p>
                  <p className="text-sm text-neutral-400">Your sales activity will appear here once orders start coming in.</p>
                </div>
              ) : (
                recentOrders.map((order: any, i) => (
                  <div key={order.id} className="flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-semibold text-orange-700">
                        {(order.customer || order.shippingAddress?.fullName || 'U').substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">{order.customer || order.shippingAddress?.fullName}</p>
                        <p className="text-xs text-neutral-500">{order.id} \u2022 Just now</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-bold text-neutral-900">Br {order.total.toLocaleString()}</p>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                          order.status === 'Delivered' ? 'text-emerald-600' : 
                          order.status === 'Processing' ? 'text-blue-600' : 'text-amber-600'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical size={16} />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-neutral-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-orange-600" />
              Live Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-500">Real-time Visitors</span>
                <span className="font-bold text-emerald-600">42 online</span>
              </div>
              <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  className="h-full bg-emerald-500" 
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-neutral-100">
              <h4 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">Top Channels</h4>
              {[
                { label: 'Direct', value: 'Br 0', color: 'bg-orange-500' },
                { label: 'Organic Search', value: 'Br 0', color: 'bg-neutral-800' },
                { label: 'Social Media', value: 'Br 0', color: 'bg-blue-500' },
              ].map((channel) => (
                <div key={channel.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${channel.color}`} />
                    <span className="text-sm text-neutral-600">{channel.label}</span>
                  </div>
                  <span className="text-sm font-bold">{channel.value}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 mt-6 rounded-xl bg-neutral-900 p-4 text-white">
              <p className="text-xs text-neutral-400">Monthly Target</p>
              <div className="flex items-end justify-between mt-1">
                <p className="text-xl font-bold">Br 1.5M</p>
                <p className="text-sm text-orange-400">0% reached</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};