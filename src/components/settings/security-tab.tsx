"use client";

import { useState } from "react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import {
  ShieldCheck,
  Fingerprint,
  Smartphone,
  Monitor,
  Tablet,
  Trash2,
  ShieldAlert,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuthStore } from "@/store/auth-store";
import { useBankingStore } from "@/store/banking-store";
import { relativeTime } from "@/lib/format";
import type { Device } from "@/lib/types";

function generateSecret() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let out = "";
  for (let i = 0; i < 32; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out.match(/.{1,4}/g)?.join(" ") ?? out;
}

const deviceIcons: Record<Device["type"], typeof Smartphone> = {
  mobile: Smartphone,
  desktop: Monitor,
  tablet: Tablet,
};

const severityStyles: Record<string, string> = {
  low: "bg-amber-500/10 text-amber-600",
  medium: "bg-orange-500/10 text-orange-600",
  high: "bg-red-500/10 text-red-600",
};

export function SecurityTab() {
  const { user, updateUser } = useAuthStore();
  const {
    devices,
    sessions,
    fraudAlerts,
    trustDevice,
    removeDevice,
    revokeSession,
    resolveFraudAlert,
  } = useBankingStore();

  const [totpOpen, setTotpOpen] = useState(false);
  const [disable2faOpen, setDisable2faOpen] = useState(false);
  const [code, setCode] = useState("");
  const [secret, setSecret] = useState(() => generateSecret());

  if (!user) return null;

  function handleToggle2fa(checked: boolean) {
    if (checked) {
      setCode("");
      setSecret(generateSecret());
      setTotpOpen(true);
    } else {
      setDisable2faOpen(true);
    }
  }

  function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    if (code.length !== 6) {
      toast.error("Enter the 6-digit code from your authenticator app");
      return;
    }
    updateUser({ twoFactorEnabled: true });
    toast.success("Two-factor authentication enabled");
    setTotpOpen(false);
  }

  function handleDisable2fa() {
    updateUser({ twoFactorEnabled: false });
    toast.success("Two-factor authentication disabled");
    setDisable2faOpen(false);
  }

  function handleBiometricToggle() {
    updateUser({ biometricEnabled: !user!.biometricEnabled });
    toast.success(user!.biometricEnabled ? "Biometric login disabled" : "Biometric login enabled");
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-jeebti-brand" />
            Two-factor authentication
          </CardTitle>
          <CardDescription>Add an extra layer of security with an authenticator app</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">
                {user.twoFactorEnabled ? "Enabled" : "Disabled"}
              </p>
              <p className="text-xs text-muted-foreground">
                Require a code from your authenticator app when signing in
              </p>
            </div>
            <Switch checked={user.twoFactorEnabled} onCheckedChange={handleToggle2fa} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fingerprint className="size-4 text-jeebti-brand" />
            Biometric login
          </CardTitle>
          <CardDescription>Use Face ID, Touch ID, or fingerprint to sign in faster</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">
                {user.biometricEnabled ? "Enabled" : "Disabled"}
              </p>
              <p className="text-xs text-muted-foreground">
                Unlock the app and approve payments using your device&apos;s biometrics
              </p>
            </div>
            <Switch checked={user.biometricEnabled} onCheckedChange={handleBiometricToggle} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Devices</CardTitle>
          <CardDescription>Devices that have signed in to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {devices.map((device) => {
            const Icon = deviceIcons[device.type];
            return (
              <div
                key={device.id}
                className="flex flex-col gap-3 rounded-lg border border-border p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-muted">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium">{device.name}</p>
                      {device.isCurrent && <Badge variant="secondary">This device</Badge>}
                      {device.trusted && (
                        <Badge className="bg-emerald-500/10 text-emerald-600" variant="outline">
                          Trusted
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {device.os} · {device.browser} · {device.location} · {relativeTime(device.lastActive)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!device.trusted && (
                    <Button variant="outline" size="sm" onClick={() => trustDevice(device.id)}>
                      Trust device
                    </Button>
                  )}
                  {!device.isCurrent && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="size-4" />
                          Remove
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove {device.name}?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This device will need to sign in again to access your account.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => removeDevice(device.id)}>Remove</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active sessions</CardTitle>
          <CardDescription>Where you&apos;re currently signed in</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex flex-col gap-3 rounded-lg border border-border p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium">{session.location}</p>
                  {session.isCurrent && <Badge variant="secondary">Current session</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">
                  Last active {relativeTime(session.lastActive)}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={session.isCurrent}
                onClick={() => revokeSession(session.id)}
              >
                Revoke
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="size-4 text-jeebti-brand" />
            Fraud alerts
          </CardTitle>
          <CardDescription>Suspicious activity detected on your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {fraudAlerts.length === 0 && (
            <p className="text-sm text-muted-foreground">No fraud alerts on your account.</p>
          )}
          {fraudAlerts.map((alert) => (
            <div key={alert.id} className="rounded-lg border border-border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={severityStyles[alert.severity]}>
                    {alert.severity}
                  </Badge>
                  <p className="text-sm font-medium">{alert.title}</p>
                </div>
                <Badge variant={alert.status === "open" ? "secondary" : "outline"}>{alert.status}</Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{alert.description}</p>
              {alert.status === "open" && (
                <div className="mt-2 flex justify-end">
                  <Button size="sm" variant="outline" onClick={() => resolveFraudAlert(alert.id)}>
                    Resolve
                  </Button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={totpOpen} onOpenChange={setTotpOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set up authenticator app</DialogTitle>
            <DialogDescription>
              Scan the QR code with your authenticator app, or enter the secret key manually.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-lg border border-border bg-card p-3">
              <QRCodeSVG value={`otpauth://totp/Jeebti:${user.email}?secret=${secret.replace(/\s/g, "")}&issuer=Jeebti`} size={160} />
            </div>
            <code className="w-full break-all rounded-md bg-muted px-3 py-2 text-center text-sm">
              {secret}
            </code>
            <form className="w-full space-y-3" onSubmit={handleVerifyCode}>
              <div className="space-y-2">
                <Label htmlFor="totp-code">6-digit code</Label>
                <Input
                  id="totp-code"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="123456"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full">
                  Verify & enable
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={disable2faOpen} onOpenChange={setDisable2faOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disable two-factor authentication?</AlertDialogTitle>
            <AlertDialogDescription>
              Your account will be less secure without a second sign-in step.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDisable2fa}
            >
              Disable
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
