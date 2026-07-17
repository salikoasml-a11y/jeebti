"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { FileText, Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { demoKycSubmissions } from "@/lib/seed";
import type { KycSubmission } from "@/lib/types";
import { formatDateTime } from "@/lib/format";
import { KycStatusBadge, RiskScoreBadge } from "@/components/admin/status-badge";

const DOCUMENT_LABELS: Record<KycSubmission["documentType"], string> = {
  passport: "Passport",
  driving_licence: "Driving Licence",
  national_id: "National ID",
};

type TabValue = "pending" | "verified" | "rejected";

export default function AdminKycPage() {
  const [submissions, setSubmissions] = useState<KycSubmission[]>(() => [...demoKycSubmissions]);
  const [tab, setTab] = useState<TabValue>("pending");
  const [reviewing, setReviewing] = useState<KycSubmission | null>(null);
  const [notes, setNotes] = useState("");

  const filtered = useMemo(() => submissions.filter((s) => s.status === tab), [submissions, tab]);

  function openReview(s: KycSubmission) {
    setReviewing(s);
    setNotes(s.notes ?? "");
  }

  function decide(status: "verified" | "rejected") {
    if (!reviewing) return;
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === reviewing.id
          ? { ...s, status, reviewedAt: new Date().toISOString(), reviewedBy: "Nadia Hussain", notes }
          : s
      )
    );
    toast.success(status === "verified" ? `${reviewing.userName}'s KYC approved` : `${reviewing.userName}'s KYC rejected`);
    setReviewing(null);
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">KYC Review</h1>
        <p className="text-sm text-muted-foreground">Review identity verification submissions</p>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as TabValue)}>
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({submissions.filter((s) => s.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="verified">
            Verified ({submissions.filter((s) => s.status === "verified").length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({submissions.filter((s) => s.status === "rejected").length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-3">
        {filtered.map((s) => (
          <Card key={s.id}>
            <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-jeebti-brand/10 text-jeebti-brand">
                  <FileText className="size-4.5" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-medium">{s.userName}</p>
                  <p className="text-xs text-muted-foreground">{s.email}</p>
                  <p className="text-xs text-muted-foreground">
                    {DOCUMENT_LABELS[s.documentType]} · Submitted {formatDateTime(s.submittedAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:justify-end">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  Risk <RiskScoreBadge score={s.riskScore} />
                </div>
                <KycStatusBadge status={s.status} />
                {s.status === "pending" ? (
                  <Button size="sm" onClick={() => openReview(s)}>
                    Review
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => openReview(s)}>
                    View
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card>
            <CardContent className="py-10 text-center text-sm text-muted-foreground">No submissions in this category.</CardContent>
          </Card>
        )}
      </div>

      <Dialog open={!!reviewing} onOpenChange={(open) => !open && setReviewing(null)}>
        <DialogContent className="sm:max-w-lg">
          {reviewing && (
            <>
              <DialogHeader>
                <DialogTitle>KYC submission — {reviewing.userName}</DialogTitle>
                <DialogDescription>{reviewing.email}</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-y-2">
                  <span className="text-muted-foreground">Document type</span>
                  <span className="text-right">{DOCUMENT_LABELS[reviewing.documentType]}</span>
                  <span className="text-muted-foreground">Submitted</span>
                  <span className="text-right">{formatDateTime(reviewing.submittedAt)}</span>
                  <span className="text-muted-foreground">Risk score</span>
                  <span className="flex justify-end"><RiskScoreBadge score={reviewing.riskScore} /></span>
                  <span className="text-muted-foreground">Status</span>
                  <span className="flex justify-end"><KycStatusBadge status={reviewing.status} /></span>
                  {reviewing.reviewedBy && (
                    <>
                      <span className="text-muted-foreground">Reviewed by</span>
                      <span className="text-right">{reviewing.reviewedBy}</span>
                    </>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground" htmlFor="kyc-notes">
                    Review notes
                  </label>
                  <Textarea
                    id="kyc-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes about this decision…"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="destructive" onClick={() => decide("rejected")}>
                  <X className="size-4" /> Reject
                </Button>
                <Button onClick={() => decide("verified")}>
                  <Check className="size-4" /> Approve
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
