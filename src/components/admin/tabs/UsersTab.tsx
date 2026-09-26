'use client';

import React, { useState, useEffect } from 'react';
import type { SafeAdminUser } from '../../../lib/auth';
import { ConfirmDialog } from '../ConfirmDialog';
import { useToast } from '../Toast';
import {
  Users,
  UserPlus,
  ShieldCheck,
  Shield,
  KeyRound,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Search,
  RefreshCw,
  AlertCircle,
  X,
  User,
} from 'lucide-react';

interface UsersTabProps {
  currentUserEmail?: string;
  currentUserRole?: string;
}

export const UsersTab: React.FC<UsersTabProps> = ({
  currentUserEmail = '',
  currentUserRole = 'owner',
}) => {
  const { showToast } = useToast();

  const [users, setUsers] = useState<SafeAdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Add Admin Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'editor'>('admin');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset Password Modal State
  const [resetModalUser, setResetModalUser] = useState<SafeAdminUser | null>(null);
  const [resetPassword, setResetPassword] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Confirm Delete Dialog State
  const [userToDelete, setUserToDelete] = useState<SafeAdminUser | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      } else {
        showToast('Failed to load administrator accounts', 'error');
      }
    } catch {
      showToast('Network error loading users', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) {
      showToast('Email address is required', 'error');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      showToast('Password must be at least 6 characters long', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newEmail.trim(),
          password: newPassword,
          role: newRole,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Failed to create admin user', 'error');
        setIsSubmitting(false);
        return;
      }

      showToast(data.message || 'Admin account created successfully.', 'success');
      setUsers((prev) => [...prev, data.user]);
      setIsAddModalOpen(false);
      setNewEmail('');
      setNewPassword('');
      setNewRole('admin');
      setShowNewPassword(false);
    } catch {
      showToast('Network error creating administrator', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (user: SafeAdminUser) => {
    const nextStatus = user.status === 'active' ? 'disabled' : 'active';
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id,
          action: 'toggle_status',
          status: nextStatus,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Failed to update status', 'error');
        return;
      }

      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, status: nextStatus } : u))
      );
      showToast(data.message || 'Status updated', 'success');
    } catch {
      showToast('Network error updating status', 'error');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetModalUser) return;
    if (!resetPassword || resetPassword.length < 6) {
      showToast('Password must be at least 6 characters long', 'error');
      return;
    }

    setIsResetting(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: resetModalUser.id,
          action: 'reset_password',
          password: resetPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Failed to reset password', 'error');
        setIsResetting(false);
        return;
      }

      showToast('Password reset successfully.', 'success');
      setResetModalUser(null);
      setResetPassword('');
      setShowResetPassword(false);
    } catch {
      showToast('Network error resetting password', 'error');
    } finally {
      setIsResetting(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      const res = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userToDelete.id }),
      });

      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Failed to delete user', 'error');
        return;
      }

      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      showToast(data.message || 'User deleted successfully', 'success');
    } catch {
      showToast('Network error deleting user', 'error');
    } finally {
      setUserToDelete(null);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSelf = (user: SafeAdminUser) =>
    user.email.toLowerCase() === currentUserEmail.toLowerCase();

  const isOnlyActiveAdmin =
    users.filter((u) => u.status === 'active' && (u.role === 'owner' || u.role === 'admin'))
      .length <= 1;

  return (
    <div className="space-y-8">
      {/* Top Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>Admin User Management</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                {users.length} {users.length === 1 ? 'Account' : 'Accounts'}
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Authorized administrators can create new admin accounts, assign roles, and manage credentials.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchUsers}
            disabled={isLoading}
            className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Refresh Users"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Add Admin</span>
          </button>
        </div>
      </div>

      {/* Security Advisory Notice */}
      <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3 text-xs text-amber-300">
        <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
        <p className="leading-relaxed">
          <strong className="font-semibold text-amber-200">Strict Access Control:</strong> Only authenticated administrators can view this page and create additional administrative accounts. Passwords are securely hashed with PBKDF2 (SHA-512) and are never exposed in logs or APIs.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center gap-3 shadow-md">
        <Search className="w-4 h-4 text-slate-500 ml-2" />
        <input
          type="text"
          placeholder="Filter administrators by email, role, or status..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent border-none text-xs text-white placeholder-slate-500 focus:outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="p-1 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Admin Users Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-4 px-6">Administrator</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Created / Updated</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="font-semibold">No administrator accounts found</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const self = isSelf(user);
                  const disableBlock = self || (isOnlyActiveAdmin && user.status === 'active');

                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-850/50 transition-colors group"
                    >
                      {/* Email & Avatar */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold uppercase text-xs">
                            {user.email.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-100 text-sm">
                                {user.email}
                              </span>
                              {self && (
                                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-[10px] uppercase tracking-wider">
                                  You
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-500 font-mono">
                              ID: {user.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                            user.role === 'owner'
                              ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                              : user.role === 'admin'
                              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                              : 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                          }`}
                        >
                          <Shield className="w-3 h-3" />
                          <span>{user.role}</span>
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                            user.status === 'active'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}
                        >
                          {user.status === 'active' ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          <span className="capitalize">{user.status}</span>
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-slate-400 text-xs">
                        <div>
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                        </div>
                        <span className="text-[10px] text-slate-500">
                          {user.updatedAt ? `Updated ${new Date(user.updatedAt).toLocaleDateString()}` : ''}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Reset Password */}
                          <button
                            type="button"
                            onClick={() => {
                              setResetModalUser(user);
                              setResetPassword('');
                              setShowResetPassword(false);
                            }}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                            title="Reset password for this admin"
                          >
                            <KeyRound className="w-4 h-4 text-amber-400" />
                          </button>

                          {/* Toggle Active / Disabled */}
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(user)}
                            disabled={disableBlock}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                              user.status === 'active'
                                ? 'bg-amber-950/20 border-amber-900/40 text-amber-400 hover:bg-amber-950/40'
                                : 'bg-emerald-950/20 border-emerald-900/40 text-emerald-400 hover:bg-emerald-950/40'
                            }`}
                            title={
                              self
                                ? 'You cannot disable your own account'
                                : disableBlock
                                ? 'Cannot disable the last active administrator'
                                : user.status === 'active'
                                ? 'Disable this account'
                                : 'Re-activate this account'
                            }
                          >
                            {user.status === 'active' ? 'Disable' : 'Enable'}
                          </button>

                          {/* Delete Account */}
                          <button
                            type="button"
                            onClick={() => setUserToDelete(user)}
                            disabled={self || isOnlyActiveAdmin}
                            className="p-2 rounded-xl bg-red-950/30 hover:bg-red-900/40 text-red-400 border border-red-900/40 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                            title={
                              self
                                ? 'You cannot delete your own account'
                                : isOnlyActiveAdmin
                                ? 'Cannot delete the last administrator'
                                : 'Remove administrator'
                            }
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: + Add Admin */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Create New Administrator</h3>
                  <p className="text-xs text-slate-400">Grant portal access to a team member</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Administrator Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. colleague@portfolio.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Initial Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter initial password (min 6 characters)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 pr-12 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Must be at least 6 characters. The new administrator can sign in at /admin.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Role / Permission Level
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewRole('admin')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      newRole === 'admin'
                        ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs uppercase tracking-wider mb-0.5">Admin</div>
                    <div className="text-[11px] opacity-80">Full CMS & user control</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewRole('editor')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      newRole === 'editor'
                        ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs uppercase tracking-wider mb-0.5">Editor</div>
                    <div className="text-[11px] opacity-80">Content only, no users</div>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'Creating...' : 'Create Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Reset Password */}
      {resetModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Reset Admin Password</h3>
                  <p className="text-xs text-slate-400 truncate max-w-[240px]">
                    {resetModalUser.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setResetModalUser(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showResetPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter new password (min 6 characters)"
                    value={resetPassword}
                    onChange={(e) => setResetPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 pr-12 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowResetPassword(!showResetPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showResetPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setResetModalUser(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isResetting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {isResetting ? 'Saving...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DIALOG: Delete User */}
      <ConfirmDialog
        isOpen={!!userToDelete}
        title="Remove Administrator Account"
        message={`Are you sure you want to remove ${userToDelete?.email}? This person will no longer be able to log in to the admin portal.`}
        confirmLabel="Remove Admin"
        isDestructive={true}
        onConfirm={handleDeleteUser}
        onClose={() => setUserToDelete(null)}
      />
    </div>
  );
};
