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
import { useTranslation } from "@/hooks/use-translation";
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

const severityStyleClasses: Record<string, string> = {
  low: "bg-amber-500/10 text-amber-600",
  medium: "bg-orange-500/10 text-orange-600",
  high: "bg-red-500/10 text-red-600",
};

const severityLabelKeys: Record<string, string> = {
  low: "settings.security.severity.low",
  medium: "settings.security.severity.medium",
  high: "settings.security.severity.high",
};

const alertStatusLabelKeys: Record<string, string> = {
  open: "settings.security.alertStatus.open",
  resolved: "settings.security.alertStatus.resolved",
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
  const { t } = useTranslation();

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
      toast.error(t("settings.security.2fa.toast.codeRequired"));
      return;
    }
    updateUser({ twoFactorEnabled: true });
    toast.success(t("settings.security.2fa.toast.enabled"));
    setTotpOpen(false);
  }

  function handleDisable2fa() {
    updateUser({ twoFactorEnabled: false });
    toast.success(t("settings.security.2fa.toast.disabled"));
    setDisable2faOpen(false);
  }

  function handleBiometricToggle() {
    updateUser({ biometricEnabled: !user!.biometricEnabled });
    toast.success(
      user!.biometricEnabled
        ? t("settings.security.biometric.toast.disabled")
        : t("settings.security.biometric.toast.enabled")
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-jeebti-brand" />
            {t("settings.security.2fa.title")}
          </CardTitle>
          <CardDescription>{t("settings.security.2fa.desc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">
                {user.twoFactorEnabled ? t("settings.security.2fa.enabled") : t("settings.security.2fa.disabled")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("settings.security.2fa.hint")}
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
            {t("settings.security.biometric.title")}
          </CardTitle>
          <CardDescription>{t("settings.security.biometric.desc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">
                {user.biometricEnabled ? t("settings.security.2fa.enabled") : t("settings.security.2fa.disabled")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("settings.security.biometric.hint")}
              </p>
            </div>
            <Switch checked={user.biometricEnabled} onCheckedChange={handleBiometricToggle} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("settings.security.devices.title")}</CardTitle>
          <CardDescription>{t("settings.security.devices.desc")}</CardDescription>
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
                      {device.isCurrent && <Badge variant="secondary">{t("settings.security.devices.thisDevice")}</Badge>}
                      {device.trusted && (
                        <Badge className="bg-emerald-500/10 text-emerald-600" variant="outline">
                          {t("settings.security.devices.trusted")}
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
                      {t("settings.security.devices.trustDevice")}
                    </Button>
                  )}
                  {!device.isCurrent && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="size-4" />
                          {t("settings.security.devices.remove")}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {t("settings.security.devices.removeConfirmTitle", { device: device.name })}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {t("settings.security.devices.removeConfirmDesc")}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>{t("action.cancel")}</AlertDialogCancel>
                          <AlertDialogAction onClick={() => removeDevice(device.id)}>
                            {t("settings.security.devices.remove")}
                          </AlertDialogAction>
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
          <CardTitle>{t("settings.security.sessions.title")}</CardTitle>
          <CardDescription>{t("settings.security.sessions.desc")}</CardDescription>
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
                  {session.isCurrent && <Badge variant="secondary">{t("settings.security.sessions.current")}</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("settings.security.sessions.lastActive", { time: relativeTime(session.lastActive) })}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={session.isCurrent}
                onClick={() => revokeSession(session.id)}
              >
                {t("settings.security.sessions.revoke")}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="size-4 text-jeebti-brand" />
            {t("settings.security.fraud.title")}
          </CardTitle>
          <CardDescription>{t("settings.security.fraud.desc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {fraudAlerts.length === 0 && (
            <p className="text-sm text-muted-foreground">{t("settings.security.fraud.empty")}</p>
          )}
          {fraudAlerts.map((alert) => (
            <div key={alert.id} className="rounded-lg border border-border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={severityStyleClasses[alert.severity]}>
                    {t(severityLabelKeys[alert.severity])}
                  </Badge>
                  <p className="text-sm font-medium">{alert.title}</p>
                </div>
                <Badge variant={alert.status === "open" ? "secondary" : "outline"}>
                  {t(alertStatusLabelKeys[alert.status])}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{alert.description}</p>
              {alert.status === "open" && (
                <div className="mt-2 flex justify-end">
                  <Button size="sm" variant="outline" onClick={() => resolveFraudAlert(alert.id)}>
                    {t("settings.security.fraud.resolve")}
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
            <DialogTitle>{t("settings.security.totp.title")}</DialogTitle>
            <DialogDescription>
              {t("settings.security.totp.desc")}
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
                <Label htmlFor="totp-code">{t("settings.security.totp.codeLabel")}</Label>
                <Input
                  id="totp-code"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder={t("settings.security.totp.codePlaceholder")}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full">
                  {t("settings.security.totp.verify")}
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={disable2faOpen} onOpenChange={setDisable2faOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("settings.security.disable2fa.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("settings.security.disable2fa.desc")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("action.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDisable2fa}
            >
              {t("settings.security.disable2fa.confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
