"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { MoreHorizontal, Search, UserX, UserCheck, ShieldOff, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { demoAdminUsers, type AdminUser } from "@/lib/seed";
import { formatCurrency, formatDate, initials } from "@/lib/format";
import { DataPagination } from "@/components/admin/data-pagination";
import { UserStatusBadge, KycStatusBadge, RoleBadge } from "@/components/admin/status-badge";

const PAGE_SIZE = 10;

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(() => [...demoAdminUsers]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [kycFilter, setKycFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((u) => {
      const matchesSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || u.status === statusFilter;
      const matchesKyc = kycFilter === "all" || u.kycStatus === kycFilter;
      return matchesSearch && matchesStatus && matchesKyc;
    });
  }, [users, search, statusFilter, kycFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function updateUser(id: string, patch: Partial<AdminUser>) {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));
    setSelectedUser((prev) => (prev && prev.id === id ? { ...prev, ...patch } : prev));
  }

  function toggleSuspend(u: AdminUser) {
    const next = u.status === "suspended" ? "active" : "suspended";
    updateUser(u.id, { status: next });
    toast.success(next === "suspended" ? `${u.name} has been suspended` : `${u.name} has been reactivated`);
  }

  function resetKyc(u: AdminUser) {
    updateUser(u.id, { kycStatus: "pending" });
    toast.success(`KYC reset for ${u.name} — resubmission required`);
  }

  function onFilterChange(setter: (v: string) => void) {
    return (v: string) => {
      setter(v);
      setPage(1);
    };
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Users</h1>
        <p className="text-sm text-muted-foreground">{users.length} total platform users</p>
      </div>

      <Card className="p-0">
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or email…"
              className="pl-8"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <Select value={statusFilter} onValueChange={onFilterChange(setStatusFilter)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select value={kycFilter} onValueChange={onFilterChange(setKycFilter)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="KYC status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All KYC</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="unverified">Unverified</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>KYC</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageItems.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.name}</TableCell>
                <TableCell className="text-muted-foreground">{u.email}</TableCell>
                <TableCell>
                  <UserStatusBadge status={u.status} />
                </TableCell>
                <TableCell>
                  <KycStatusBadge status={u.kycStatus} />
                </TableCell>
                <TableCell>{formatCurrency(u.balance)}</TableCell>
                <TableCell className="text-muted-foreground">{formatDate(u.joinedAt)}</TableCell>
                <TableCell>
                  <RoleBadge role={u.role} />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" aria-label="Row actions">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={() => setSelectedUser(u)}>
                        <Eye className="size-4" /> View details
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => toggleSuspend(u)}>
                        {u.status === "suspended" ? (
                          <>
                            <UserCheck className="size-4" /> Activate
                          </>
                        ) : (
                          <>
                            <UserX className="size-4" /> Suspend
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => resetKyc(u)}>
                        <ShieldOff className="size-4" /> Reset KYC
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {pageItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-sm text-muted-foreground">
                  No users match your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <DataPagination page={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} />
      </Card>

      <Sheet open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          {selectedUser && (
            <>
              <SheetHeader>
                <SheetTitle>User details</SheetTitle>
                <SheetDescription>Full account information for {selectedUser.name}</SheetDescription>
              </SheetHeader>
              <div className="space-y-5 px-4 pb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-12 border border-border">
                    <AvatarFallback className="bg-jeebti-brand/10 text-jeebti-brand">
                      {initials(selectedUser.name.split(" ")[0] ?? "", selectedUser.name.split(" ")[1] ?? "")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedUser.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  </div>
                </div>
                <Separator />
                <dl className="grid grid-cols-2 gap-y-3 text-sm">
                  <dt className="text-muted-foreground">User ID</dt>
                  <dd className="text-right font-mono text-xs">{selectedUser.id}</dd>
                  <dt className="text-muted-foreground">Status</dt>
                  <dd className="text-right"><UserStatusBadge status={selectedUser.status} /></dd>
                  <dt className="text-muted-foreground">KYC status</dt>
                  <dd className="text-right"><KycStatusBadge status={selectedUser.kycStatus} /></dd>
                  <dt className="text-muted-foreground">Role</dt>
                  <dd className="text-right"><RoleBadge role={selectedUser.role} /></dd>
                  <dt className="text-muted-foreground">Balance</dt>
                  <dd className="text-right font-medium">{formatCurrency(selectedUser.balance)}</dd>
                  <dt className="text-muted-foreground">Joined</dt>
                  <dd className="text-right">{formatDate(selectedUser.joinedAt)}</dd>
                </dl>
                <Separator />
                <div className="flex gap-2">
                  <Button
                    variant={selectedUser.status === "suspended" ? "default" : "destructive"}
                    className="flex-1"
                    onClick={() => toggleSuspend(selectedUser)}
                  >
                    {selectedUser.status === "suspended" ? "Activate user" : "Suspend user"}
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => resetKyc(selectedUser)}>
                    Reset KYC
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
