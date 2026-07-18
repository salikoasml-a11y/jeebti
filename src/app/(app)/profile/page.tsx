"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Settings, ShieldCheck, LifeBuoy } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { useAuthStore } from "@/store/auth-store";
import { useTranslation } from "@/hooks/use-translation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatDate, initials } from "@/lib/format";
import { cn } from "@/lib/utils";

const kycStyles: Record<string, string> = {
  verified: "bg-emerald-500/10 text-emerald-600",
  pending: "bg-amber-500/10 text-amber-600",
  unverified: "bg-red-500/10 text-red-600",
  rejected: "bg-red-500/10 text-red-600",
};

const kycLabelKeys: Record<string, string> = {
  verified: "profile.kyc.verified",
  pending: "profile.kyc.pending",
  unverified: "profile.kyc.unverified",
  rejected: "profile.kyc.rejected",
};

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth ?? "");
  const [line1, setLine1] = useState(user?.address.line1 ?? "");
  const [city, setCity] = useState(user?.address.city ?? "");
  const [postcode, setPostcode] = useState(user?.address.postcode ?? "");
  const [country, setCountry] = useState(user?.address.country ?? "");

  if (!user) return null;

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    updateUser({
      firstName,
      lastName,
      phone,
      dateOfBirth,
      address: { line1, city, postcode, country },
    });
    toast.success(t("profile.toast.updated"));
  }

  return (
    <div className="pb-12">
      <PageHeader title={t("profile.title")} description={t("profile.description")} />

      <div className="space-y-6 px-4 sm:px-6">
        <Card>
          <CardContent className="flex flex-col items-center gap-4 pt-6 text-center sm:flex-row sm:text-left">
            <Avatar className="size-20">
              <AvatarFallback className="text-xl">
                {initials(user.firstName, user.lastName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <h2 className="text-xl font-semibold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground">
                {t("profile.memberSince", { date: formatDate(user.createdAt) })}
              </p>
            </div>
            <Badge
              variant="outline"
              className={cn("border-transparent px-3 py-1 text-sm", kycStyles[user.kycStatus])}
            >
              {t(kycLabelKeys[user.kycStatus])}
            </Badge>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-3">
          <Link href="/settings">
            <Card className="transition-colors hover:bg-accent">
              <CardContent className="flex items-center gap-3 pt-6">
                <Settings className="size-5 text-jeebti-brand" />
                <div>
                  <p className="text-sm font-medium">{t("profile.card.settings.title")}</p>
                  <p className="text-xs text-muted-foreground">{t("profile.card.settings.desc")}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/settings?tab=security">
            <Card className="transition-colors hover:bg-accent">
              <CardContent className="flex items-center gap-3 pt-6">
                <ShieldCheck className="size-5 text-jeebti-brand" />
                <div>
                  <p className="text-sm font-medium">{t("profile.card.security.title")}</p>
                  <p className="text-xs text-muted-foreground">{t("profile.card.security.desc")}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/help">
            <Card className="transition-colors hover:bg-accent">
              <CardContent className="flex items-center gap-3 pt-6">
                <LifeBuoy className="size-5 text-jeebti-brand" />
                <div>
                  <p className="text-sm font-medium">{t("profile.card.help.title")}</p>
                  <p className="text-xs text-muted-foreground">{t("profile.card.help.desc")}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("profile.personalInfo.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSave}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t("profile.field.firstName")}</Label>
                  <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t("profile.field.lastName")}</Label>
                  <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("profile.field.email")}</Label>
                  <Input id="email" value={user.email} readOnly disabled />
                  <p className="text-xs text-muted-foreground">{t("profile.field.email.hint")}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("profile.field.phone")}</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">{t("profile.field.dob")}</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">{t("profile.address.title")}</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="line1">{t("profile.field.line1")}</Label>
                    <Input id="line1" value={line1} onChange={(e) => setLine1(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">{t("profile.field.city")}</Label>
                    <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postcode">{t("profile.field.postcode")}</Label>
                    <Input id="postcode" value={postcode} onChange={(e) => setPostcode(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">{t("profile.field.country")}</Label>
                    <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit">{t("profile.action.saveChanges")}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
