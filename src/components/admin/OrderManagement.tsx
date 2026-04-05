import React from 'react';
import { Search, Eye, Download, Filter, MapPin, PackageX } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { mockOrders } from '@/lib/data';

export const OrderManagement = () => {
  // Use mockOrders from data.ts (currently empty for deployment)
  const orders = mockOrders;

  const handleViewOrder = (id: string) => {
    toast.info("Order Details", {
      description: `Viewing detailed invoice and shipping log for order ${id}.`,
    });
  };

  const getStatusCounts = () => {
    return {
      all: orders.length,
      pending: orders.filter(o => o.status === 'Pending').length,
      shipped: orders.filter(o => o.status === 'Shipped').length,
      completed: orders.filter(o => o.status === 'Delivered').length, // Delivering is 'Delivered' in types.ts
    };
  };

  const stats = getStatusCounts();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Order Management</h2>
          <p className="text-neutral-500">Track and manage customer orders across all channels.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.info("Generating report...")} disabled={orders.length === 0}>
            <Download className="w-4 h-4 mr-2" /> Export Orders
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: 'All Orders', value: stats.all.toLocaleString(), color: 'bg-neutral-900' },
          { label: 'Pending', value: stats.pending.toLocaleString(), color: 'bg-amber-500' },
          { label: 'Shipped', value: stats.shipped.toLocaleString(), color: 'bg-blue-500' },
          { label: 'Completed', value: stats.completed.toLocaleString(), color: 'bg-emerald-500' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl font-bold mt-1 text-neutral-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="p-4 border-b border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <Input placeholder="Search by Order ID or Customer..." className="pl-10 h-10" />
          </div>
          <Button variant="ghost" size="sm" onClick={() => toast.info("Advanced filtering active")}>
            <Filter className="w-4 h-4 mr-2" /> Advanced Filters
          </Button>
        </div>

        <Table>
          <TableHeader className="bg-neutral-50/50">
            <TableRow>
              <TableHead className="px-6">Order ID</TableHead>
              <TableHead className="px-6">Customer</TableHead>
              <TableHead className="px-6">Date</TableHead>
              <TableHead className="px-6">Items</TableHead>
              <TableHead className="px-6">Total</TableHead>
              <TableHead className="px-6">Status</TableHead>
              <TableHead className="text-right px-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-64 text-center text-neutral-500">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="p-3 bg-neutral-50 rounded-full">
                      <PackageX className="w-6 h-6 text-neutral-400" />
                    </div>
                    <p className="font-medium">No orders found</p>
                    <p className="text-xs">When customers place orders, they will appear here.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order: any) => (
                <TableRow key={order.id} className="hover:bg-neutral-50 transition-colors group">
                  <TableCell className="px-6 font-bold text-neutral-900">{order.id}</TableCell>
                  <TableCell className="px-6">
                    <div className="flex flex-col">
                      <span className="font-medium text-neutral-900">{order.customer || order.shippingAddress?.fullName}</span>
                      <span className="text-xs text-neutral-400 flex items-center gap-1">
                        <MapPin size={10} /> {order.shippingAddress?.city || 'Addis Ababa'}, ET
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 text-sm text-neutral-600">{new Date(order.createdAt || Date.now()).toLocaleDateString()}</TableCell>
                  <TableCell className="px-6 text-sm text-neutral-600">{order.items?.length || 0} items</TableCell>
                  <TableCell className="px-6 font-bold text-neutral-900">Br {order.total.toLocaleString()}</TableCell>
                  <TableCell className="px-6">
                    <Badge className={`rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-50' :
                      order.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-50' :
                      order.status === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-50' :
                      'bg-red-50 text-red-700 border-red-100 hover:bg-red-50'
                    }`}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-neutral-400 hover:text-orange-600"
                        onClick={() => handleViewOrder(order.id)}
                      >
                        <Eye size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-neutral-400 hover:text-neutral-900"
                        onClick={() => toast.info("Downloading packing slip...")}
                      >
                        <Download size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};