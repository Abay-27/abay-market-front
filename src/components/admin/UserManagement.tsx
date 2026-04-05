import React, { useState } from 'react';
import { Search, Mail, Shield, MoreVertical, UserPlus, ShieldCheck, UserX, UserCheck, Edit3, Trash2, Filter } from 'lucide-react';
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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { mockUsers } from '@/lib/data';
import { User, UserRole, UserStatus } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUpdateStatus = (id: string, newStatus: UserStatus) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
    toast.success(`User status updated to ${newStatus}`);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    toast.success('User removed from directory');
  };

  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setIsEditDialogOpen(true);
  };

  const saveUserChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setUsers(prev => prev.map(u => u.id === currentUser.id ? currentUser : u));
    setIsEditDialogOpen(false);
    toast.success('User profile updated successfully');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-neutral-900">User Management</h2>
          <p className="text-neutral-500 text-lg">Control access and monitor activity across Work_Abay Mart.</p>
        </div>
        <Button 
          className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/20 h-12 px-6 rounded-xl font-bold"
          onClick={() => toast.info('Invitation system is being integrated')}
        >
          <UserPlus className="w-5 h-5 mr-2" /> Invite New Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Total Users', value: users.length, color: 'bg-blue-50 text-blue-700 border-blue-100' },
          { label: 'Active Sellers', value: users.filter(u => u.role === 'Merchant' && u.status === 'Active').length, color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
          { label: 'Pending Reviews', value: users.filter(u => u.status === 'Inactive').length, color: 'bg-orange-50 text-orange-700 border-orange-100' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-2xl border-2 ${stat.color} flex flex-col`}
          >
            <span className="text-sm font-bold uppercase tracking-widest opacity-70">{stat.label}</span>
            <span className="text-4xl font-black mt-1">{stat.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
        <div className="p-6 border-b border-neutral-50 flex flex-col lg:flex-row lg:items-center gap-4 bg-neutral-50/30">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <Input 
              placeholder="Search by name, email, or role..." 
              className="pl-12 h-12 border-neutral-200 bg-white rounded-xl shadow-none focus-visible:ring-2 focus-visible:ring-orange-600/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-neutral-200">
              <Filter size={16} className="text-neutral-400" />
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[130px] border-none shadow-none focus:ring-0 h-8">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Super Admin">Super Admin</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Merchant">Merchant</SelectItem>
                  <SelectItem value="Customer">Customer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-neutral-200">
              <Shield size={16} className="text-neutral-400" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px] border-none shadow-none focus:ring-0 h-8">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {(roleFilter !== 'all' || statusFilter !== 'all' || searchTerm) && (
              <Button 
                variant="ghost" 
                className="text-neutral-500 hover:text-orange-600 font-bold"
                onClick={() => {
                  setRoleFilter('all');
                  setStatusFilter('all');
                  setSearchTerm('');
                }}
              >
                Reset
              </Button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-50/50 hover:bg-neutral-50/50">
                <TableHead className="px-6 py-4 font-bold text-neutral-900 uppercase tracking-wider text-xs">User Profile</TableHead>
                <TableHead className="px-6 py-4 font-bold text-neutral-900 uppercase tracking-wider text-xs">Account Type</TableHead>
                <TableHead className="px-6 py-4 font-bold text-neutral-900 uppercase tracking-wider text-xs">Join Date</TableHead>
                <TableHead className="px-6 py-4 font-bold text-neutral-900 uppercase tracking-wider text-xs">Current Status</TableHead>
                <TableHead className="text-right px-6 py-4 font-bold text-neutral-900 uppercase tracking-wider text-xs">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={user.id} 
                      className="hover:bg-neutral-50/50 transition-colors border-b border-neutral-50"
                    >
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-neutral-100" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-700 border-2 border-white shadow-sm">
                              {user.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-neutral-900">{user.name}</p>
                            <p className="text-sm text-neutral-500 flex items-center gap-1">
                              <Mail size={12} /> {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {user.role === 'Super Admin' ? (
                            <ShieldCheck className="h-4 w-4 text-orange-600" />
                          ) : (
                            <Shield className="h-4 w-4 text-neutral-400" />
                          )}
                          <span className="text-sm font-semibold text-neutral-700">{user.role}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-neutral-500">{user.joined}</TableCell>
                      <TableCell className="px-6 py-4">
                        <Badge className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest border-2 shadow-sm ${
                          user.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                          user.status === 'Inactive' ? 'bg-neutral-50 text-neutral-500 border-neutral-100' :
                          'bg-red-50 text-red-700 border-red-100'
                        }`}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-neutral-100 rounded-full">
                              <MoreVertical size={18} className="text-neutral-500" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl shadow-xl border-neutral-200">
                            <DropdownMenuItem className="flex items-center gap-2 p-3 rounded-lg cursor-pointer" onClick={() => handleEditUser(user)}>
                              <Edit3 size={16} className="text-neutral-500" />
                              <span className="font-semibold">Edit Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1" />
                            {user.status !== 'Active' && (
                              <DropdownMenuItem 
                                className="flex items-center gap-2 p-3 rounded-lg text-emerald-600 cursor-pointer" 
                                onClick={() => handleUpdateStatus(user.id, 'Active')}
                              >
                                <UserCheck size={16} />
                                <span className="font-semibold">Activate Account</span>
                              </DropdownMenuItem>
                            )}
                            {user.status !== 'Suspended' && (
                              <DropdownMenuItem 
                                className="flex items-center gap-2 p-3 rounded-lg text-red-600 cursor-pointer" 
                                onClick={() => handleUpdateStatus(user.id, 'Suspended')}
                              >
                                <UserX size={16} />
                                <span className="font-semibold">Suspend Account</span>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator className="my-1" />
                            <DropdownMenuItem 
                              className="flex items-center gap-2 p-3 rounded-lg text-red-600 hover:bg-red-50 focus:bg-red-50 cursor-pointer"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash2 size={16} />
                              <span className="font-semibold">Delete User</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3 opacity-30">
                        <UserX size={48} />
                        <p className="text-xl font-bold">No users found matching your criteria</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-3xl border-none shadow-2xl">
          <form onSubmit={saveUserChanges}>
            <div className="bg-orange-600 p-8 text-white">
              <DialogTitle className="text-2xl font-black">Edit User Profile</DialogTitle>
              <DialogDescription className="text-orange-100 mt-2">
                Update account details and permissions for {currentUser?.name}.
              </DialogDescription>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="font-bold text-neutral-700">Full Name</Label>
                <Input 
                  id="edit-name" 
                  value={currentUser?.name || ''} 
                  onChange={(e) => setCurrentUser(prev => prev ? { ...prev, name: e.target.value } : null)}
                  className="h-12 rounded-xl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-email" className="font-bold text-neutral-700">Email Address</Label>
                <Input 
                  id="edit-email" 
                  type="email"
                  value={currentUser?.email || ''} 
                  onChange={(e) => setCurrentUser(prev => prev ? { ...prev, email: e.target.value } : null)}
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-bold text-neutral-700">Account Role</Label>
                  <Select 
                    value={currentUser?.role} 
                    onValueChange={(val: UserRole) => setCurrentUser(prev => prev ? { ...prev, role: val } : null)}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Super Admin">Super Admin</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Merchant">Merchant</SelectItem>
                      <SelectItem value="Customer">Customer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="font-bold text-neutral-700">Account Status</Label>
                  <Select 
                    value={currentUser?.status} 
                    onValueChange={(val: UserStatus) => setCurrentUser(prev => prev ? { ...prev, status: val } : null)}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter className="p-8 pt-0 bg-neutral-50/50">
              <div className="flex gap-3 w-full">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 h-12 rounded-xl font-bold"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white h-12 rounded-xl font-bold"
                >
                  Save Changes
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};