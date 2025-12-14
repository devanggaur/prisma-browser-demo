import { useState, useEffect } from "react";
import { Building2, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface WireTransferScenarioProps {
  onSecurityEvent: (status: "safe" | "neutral") => void;
}

export function WireTransferScenario({ onSecurityEvent }: WireTransferScenarioProps) {
  const [recipientName, setRecipientName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [showTrustBadge, setShowTrustBadge] = useState(false);

  useEffect(() => {
    // Show trust badge when account matches known trusted pattern
    if (
      accountNumber.toLowerCase().includes("1234") ||
      accountNumber.includes("****1234") ||
      accountNumber.includes("987654321")
    ) {
      setShowTrustBadge(true);
      onSecurityEvent("safe");
    } else if (accountNumber.length > 0) {
      setShowTrustBadge(false);
      onSecurityEvent("neutral");
    }
  }, [accountNumber, onSecurityEvent]);

  return (
    <div className="h-full p-6">
      <div className="max-w-xl mx-auto space-y-6 animate-fade-up">
        {/* Header */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl prisma-gradient flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">New Wire Transfer</h1>
          <p className="text-muted-foreground mt-1">Send funds securely to any US bank account</p>
        </div>

        {/* Form */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-5">
          {/* Recipient Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Recipient Name</label>
            <Input
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Enter recipient or business name"
              className="h-11"
            />
          </div>

          {/* Account Number with Trust Badge */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Account Number</label>
            <div className="relative">
              <Input
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter account number (try: 987654321)"
                className={cn(
                  "h-11 pr-44 transition-all",
                  showTrustBadge && "border-palo-green ring-1 ring-palo-green/20"
                )}
              />
              {/* Trust Badge */}
              {showTrustBadge && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 animate-badge-pop">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-palo-green/10 border border-palo-green/30">
                    <ShieldCheck className="w-3.5 h-3.5 text-palo-green" />
                    <span className="text-xs font-medium text-palo-green whitespace-nowrap">
                      Trusted by 450 Businesses
                    </span>
                  </div>
                </div>
              )}
            </div>
            {showTrustBadge && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground animate-fade-up">
                <Users className="w-3.5 h-3.5" />
                <span>Trusted by 450 businesses in the Palo Alto Network</span>
              </div>
            )}
          </div>

          {/* Routing Number */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Routing Number</label>
            <Input
              placeholder="Enter 9-digit routing number"
              className="h-11"
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="h-11 pl-7"
              />
            </div>
          </div>

          {/* Memo */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Memo (Optional)</label>
            <Input
              placeholder="Add a note for this transfer"
              className="h-11"
            />
          </div>

          <div className="h-px bg-border" />

          {/* Summary */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Transfer Fee</span>
            <span className="text-foreground">$25.00</span>
          </div>

          <Button
            size="lg"
            className="w-full prisma-accent-gradient hover:opacity-90 transition-opacity"
            disabled={!recipientName || !accountNumber || !amount}
          >
            Review & Send Wire
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Wire transfers are typically completed within 1-2 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
