"use client";

import { useState } from "react";
import { Bell, CreditCard, PiggyBank, ShieldAlert, Info, ArrowLeftRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useBankingStore } from "@/store/banking-store";
import { relativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { NotificationType } from "@/lib/types";

const typeIcons: Record<NotificationType, typeof Bell> = {
  transaction: ArrowLeftRight,
  security: ShieldAlert,
  savings: PiggyBank,
  card: CreditCard,
  system: Info,
  fraud: ShieldAlert,
};

export function NotificationsTab() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useBankingStore();

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const hasUnread = notifications.some((n) => !n.read);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification preferences</CardTitle>
          <CardDescription>Choose how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Email notifications</p>
              <p className="text-xs text-muted-foreground">Receipts, statements, and account updates</p>
            </div>
            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Push notifications</p>
              <p className="text-xs text-muted-foreground">Real-time alerts on your device</p>
            </div>
            <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">SMS alerts</p>
              <p className="text-xs text-muted-foreground">Text messages for critical security events</p>
            </div>
            <Switch checked={smsAlerts} onCheckedChange={setSmsAlerts} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Marketing emails</p>
              <p className="text-xs text-muted-foreground">Product news, tips, and offers</p>
            </div>
            <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Recent notifications</CardTitle>
            <CardDescription>Activity from your account</CardDescription>
          </div>
          <Button variant="outline" size="sm" disabled={!hasUnread} onClick={markAllNotificationsRead}>
            Mark all as read
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          {notifications.length === 0 && (
            <p className="text-sm text-muted-foreground">You have no notifications.</p>
          )}
          {notifications.map((notification) => {
            const Icon = typeIcons[notification.type];
            return (
              <button
                key={notification.id}
                type="button"
                onClick={() => markNotificationRead(notification.id)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg border border-border p-3 text-left transition-colors hover:bg-accent",
                  !notification.read && "bg-jeebti-brand/5"
                )}
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium">{notification.title}</p>
                    {!notification.read && <span className="size-2 shrink-0 rounded-full bg-jeebti-brand" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{notification.message}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {relativeTime(notification.createdAt)}
                  </p>
                </div>
              </button>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
