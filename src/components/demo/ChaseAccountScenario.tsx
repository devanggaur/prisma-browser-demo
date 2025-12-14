import { useState } from "react";
import { Building2, CreditCard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function ChaseAccountScenario() {
  const [accountNickname, setAccountNickname] = useState("Business Checking");
  const [routingNumber, setRoutingNumber] = useState("021000021");
  const [accountNumber, setAccountNumber] = useState("987654321");

  return (
    <div className="h-full p-6 bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-up">
        {/* Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-border">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-panw-dark to-gray-800 border-2 border-panw-orange flex items-center justify-center">
            <Building2 className="w-8 h-8 text-panw-orange" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Chase Commercial Banking</h1>
            <p className="text-muted-foreground">Manage your business accounts securely</p>
          </div>
        </div>

        {/* Enclave Badge */}
        <div className="bg-gradient-to-r from-panw-orange/10 to-panw-orange/5 border border-panw-orange/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-panw-orange/20">
              <Shield className="w-5 h-5 text-panw-orange" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Secure Financial Enclave</h3>
              <p className="text-xs text-muted-foreground">
                This session is protected. Screen sharing and extensions are disabled.
              </p>
            </div>
          </div>
        </div>

        {/* Account Details Card */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Account Details</h2>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-panw-orange/10 border border-panw-orange/30">
              <div className="w-2 h-2 rounded-full bg-panw-orange animate-pulse" />
              <span className="text-xs font-medium text-panw-orange">Secured</span>
            </div>
          </div>

          {/* Account Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              Account Nickname
            </label>
            <Input
              value={accountNickname}
              onChange={(e) => setAccountNickname(e.target.value)}
              className="h-11"
            />
          </div>

          {/* Account Number */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Account Number</label>
            <div className="relative">
              <Input
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="h-11 font-mono"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-panw-orange/10">
                  <Shield className="w-3 h-3 text-panw-orange" />
                  <span className="text-xs font-medium text-panw-orange">Protected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Routing Number */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Routing Number</label>
            <Input
              value={routingNumber}
              onChange={(e) => setRoutingNumber(e.target.value)}
              className="h-11 font-mono"
              readOnly
            />
            <p className="text-xs text-muted-foreground">
              Chase Bank routing number for ACH and wire transfers
            </p>
          </div>

          <div className="h-px bg-border" />

          {/* Account Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">Available Balance</p>
              <p className="text-xl font-bold text-foreground">$248,562.18</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">Pending Transfers</p>
              <p className="text-xl font-bold text-foreground">$12,450.00</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1 bg-panw-orange hover:bg-panw-orange/90 transition-all text-white shadow-lg hover:shadow-xl"
            >
              Save Changes
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
            >
              View Statement
            </Button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border">
          <Shield className="w-4 h-4 text-muted-foreground mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <strong className="text-foreground">Protected by Prisma Access Browser.</strong> All
            account modifications are logged and require multi-factor authentication. Changes to
            banking details will trigger additional verification.
          </div>
        </div>
      </div>
    </div>
  );
}
