"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { useMounted } from "@/hooks/use-mounted";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
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
import { useTranslation } from "@/hooks/use-translation";

export function GeneralTab() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const signOut = useAuthStore((s) => s.signOut);
  const router = useRouter();
  const { t } = useTranslation();

  function handleDeleteAccount() {
    signOut();
    toast.success(t("settings.general.toast.accountDeleted"));
    router.push("/");
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("settings.general.appearance.title")}</CardTitle>
          <CardDescription>{t("settings.general.appearance.desc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">{t("settings.general.theme")}</p>
              <p className="text-xs text-muted-foreground">{t("settings.general.theme.hint")}</p>
            </div>
            <Select value={mounted ? theme ?? "system" : undefined} onValueChange={setTheme}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder={t("settings.general.theme.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">{t("settings.general.theme.light")}</SelectItem>
                <SelectItem value="dark">{t("settings.general.theme.dark")}</SelectItem>
                <SelectItem value="system">{t("settings.general.theme.system")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("settings.general.region.title")}</CardTitle>
          <CardDescription>{t("settings.general.region.desc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium">{t("settings.general.region.label")}</p>
            <p className="text-sm text-muted-foreground">{t("currency.gbp")}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-destructive">{t("settings.general.danger.title")}</CardTitle>
          <CardDescription>{t("settings.general.danger.desc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">{t("settings.general.deleteAccount")}</p>
              <p className="text-xs text-muted-foreground">
                {t("settings.general.deleteAccount.hint")}
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">{t("settings.general.deleteAccount")}</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t("settings.general.deleteAccount.confirmTitle")}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("settings.general.deleteAccount.confirmDesc")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t("action.cancel")}</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={handleDeleteAccount}
                  >
                    {t("settings.general.deleteAccount")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
