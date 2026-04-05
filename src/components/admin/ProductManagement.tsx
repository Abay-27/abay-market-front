import React from 'react';
import { Plus, Edit2, Trash2, Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { products } from '@/lib/data';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export const ProductManagement = () => {
  const handleDelete = (name: string) => {
    toast.error("Action Denied", {
      description: `You don't have permission to delete "${name}" in this preview environment.`,
    });
  };

  const handleEdit = (name: string) => {
    toast.info("Editor Loading", {
      description: `Opening property manager for "${name}"...`,
    });
  };

  const handleAdd = () => {
    toast.success("Draft Created", {
      description: "A new product template has been added to your inventory drafts.",
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Product Management</h2>
          <p className="text-neutral-500">Manage your product catalog, pricing, and inventory.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.info("Exporting catalog...")}>
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
          <Button 
            onClick={handleAdd}
            className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm shadow-orange-200"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
          <Input 
            placeholder="Search by name, SKU, or category..." 
            className="pl-10 h-10 border-neutral-200" 
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          <select className="flex-1 sm:flex-none h-10 px-3 py-2 bg-white border border-neutral-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-orange-500/20">
            <option>All Categories</option>
            <option>Coffee</option>
            <option>Agriculture</option>
            <option>Traditional Wear</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200">
        <Table>
          <TableHeader className="bg-neutral-50/80">
            <TableRow>
              <TableHead className="w-[40%] px-6">Product</TableHead>
              <TableHead className="px-6">Category</TableHead>
              <TableHead className="px-6">Price</TableHead>
              <TableHead className="px-6">Stock Level</TableHead>
              <TableHead className="px-6">Status</TableHead>
              <TableHead className="text-right px-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, i) => (
              <TableRow key={product.id} className="hover:bg-neutral-50/50 transition-colors group">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-12 h-12 rounded-lg object-cover ring-1 ring-neutral-200" 
                    />
                    <div>
                      <p className="font-semibold text-neutral-900 group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </p>
                      <p className="text-xs text-neutral-400">SKU: WAB-{(1000 + i).toString()}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-6">
                  <Badge variant="outline" className="bg-neutral-50 text-neutral-600 font-medium border-neutral-200">
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 font-medium text-neutral-900">
                  Br {product.price.toLocaleString()}
                </TableCell>
                <TableCell className="px-6">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 w-16 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-3/4 rounded-full" />
                    </div>
                    <span className="text-xs font-medium text-neutral-600">42 unit</span>
                  </div>
                </TableCell>
                <TableCell className="px-6">
                  <div className="flex items-center gap-1.5 text-emerald-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider">Active</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-neutral-400 hover:text-orange-600"
                      onClick={() => handleEdit(product.name)}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-neutral-400 hover:text-red-600"
                      onClick={() => handleDelete(product.name)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 border-t border-neutral-100 bg-neutral-50/30 flex items-center justify-between text-sm text-neutral-500">
          <p>Showing 1 to {products.length} of {products.length} products</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};