"use client";

import { Suspense, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralTab } from "@/components/settings/general-tab";
import { SecurityTab } from "@/components/settings/security-tab";
import { NotificationsTab } from "@/components/settings/notifications-tab";

const TAB_VALUES = ["general", "security", "notifications"] as const;
type TabValue = (typeof TAB_VALUES)[number];

export default function SettingsPage() {
  return (
    <Suspense fallback={null}>
      <SettingsPageContent />
    </Suspense>
  );
}

function SettingsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = useMemo<TabValue>(() => {
    const value = searchParams.get("tab");
    return (TAB_VALUES as readonly string[]).includes(value ?? "") ? (value as TabValue) : "general";
  }, [searchParams]);

  const handleTabChange = useCallback(
    (value: string) => {
      router.replace(`/settings?tab=${value}`, { scroll: false });
    },
    [router]
  );

  return (
    <div className="pb-12">
      <PageHeader title="Settings" description="Manage your account preferences and security" />

      <div className="px-4 sm:px-6">
        <Tabs value={tab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="mt-6">
            <GeneralTab />
          </TabsContent>
          <TabsContent value="security" className="mt-6">
            <SecurityTab />
          </TabsContent>
          <TabsContent value="notifications" className="mt-6">
            <NotificationsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
