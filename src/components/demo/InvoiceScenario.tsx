import { useState } from "react";
import { FileText, AlertTriangle, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InvoiceScenarioProps {
  fraudProtectionEnabled: boolean;
  onSecurityEvent: (status: "warning" | "safe") => void;
}

export function InvoiceScenario({ fraudProtectionEnabled, onSecurityEvent }: InvoiceScenarioProps) {
  const [showWarning, setShowWarning] = useState(false);

  const handlePayNow = () => {
    if (fraudProtectionEnabled) {
      setShowWarning(true);
      onSecurityEvent("warning");
    }
  };

  const handleDismiss = () => {
    setShowWarning(false);
    onSecurityEvent("safe");
  };

  return (
    <div className="h-full p-6 relative">
      {/* PDF Viewer Mock */}
      <div className="max-w-2xl mx-auto bg-card rounded-xl shadow-lg overflow-hidden animate-fade-up">
        {/* PDF Header */}
        <div className="bg-muted px-4 py-3 flex items-center gap-3 border-b border-border">
          <FileText className="w-5 h-5 text-destructive" />
          <span className="text-sm font-medium text-foreground">invoice-2024-1847.pdf</span>
          <span className="text-xs text-muted-foreground ml-auto">1 of 1</span>
        </div>

        {/* Invoice Content */}
        <div className="p-8 space-y-6">
          {/* Company Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">INVOICE</h1>
              <p className="text-sm text-muted-foreground mt-1">#INV-2024-1847</p>
            </div>
            <div className="text-right">
              <h2 className="text-lg font-semibold text-primary">Dental Supplies Co.</h2>
              <p className="text-sm text-muted-foreground">1234 Medical Drive</p>
              <p className="text-sm text-muted-foreground">San Francisco, CA 94102</p>
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Bill To */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Bill To</p>
              <p className="text-sm font-medium text-foreground">Bright Smile Dental</p>
              <p className="text-sm text-muted-foreground">Attn: Sarah Chen</p>
              <p className="text-sm text-muted-foreground">456 Healthcare Blvd</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Invoice Date</p>
              <p className="text-sm text-foreground">December 14, 2024</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-4 mb-2">Due Date</p>
              <p className="text-sm text-foreground">December 28, 2024</p>
            </div>
          </div>

          {/* Line Items */}
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Description</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Qty</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Price</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-3 text-sm text-foreground">Dental Examination Gloves (Box/100)</td>
                  <td className="px-4 py-3 text-sm text-foreground text-right">50</td>
                  <td className="px-4 py-3 text-sm text-foreground text-right">$45.00</td>
                  <td className="px-4 py-3 text-sm text-foreground text-right">$2,250.00</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-foreground">Sterilization Pouches (500ct)</td>
                  <td className="px-4 py-3 text-sm text-foreground text-right">10</td>
                  <td className="px-4 py-3 text-sm text-foreground text-right">$125.00</td>
                  <td className="px-4 py-3 text-sm text-foreground text-right">$1,250.00</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-foreground">Premium Composite Refill Kit</td>
                  <td className="px-4 py-3 text-sm text-foreground text-right">5</td>
                  <td className="px-4 py-3 text-sm text-foreground text-right">$250.00</td>
                  <td className="px-4 py-3 text-sm text-foreground text-right">$1,250.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">$4,750.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (0%)</span>
                <span className="text-foreground">$0.00</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between font-semibold">
                <span className="text-foreground">Total Due</span>
                <span className="text-primary text-lg">$4,750.00</span>
              </div>
            </div>
          </div>

          {/* Wire Transfer Details */}
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Wire Transfer Instructions</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">Bank:</span>
              <span className="text-foreground">First National Bank</span>
              <span className="text-muted-foreground">Routing:</span>
              <span className="text-foreground">021000089</span>
              <span className="text-muted-foreground">Account:</span>
              <span className="text-foreground font-mono">****7823</span>
            </div>
          </div>

          {/* Pay Button */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={handlePayNow}
              size="lg"
              className="px-8 prisma-accent-gradient hover:opacity-90 transition-opacity"
            >
              Pay Now — $4,750.00
            </Button>
          </div>
        </div>
      </div>

      {/* Warning Overlay */}
      {showWarning && (
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 backdrop-blur-sm animate-fade-up">
          <div className="bg-card/95 backdrop-blur-md border border-palo-amber/30 shadow-xl rounded-2xl p-6 max-w-md mx-4 animate-scale-in">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-palo-amber/20">
                <AlertTriangle className="w-6 h-6 text-palo-amber" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">Caution</h3>
                <p className="text-sm mt-2 text-foreground/80">
                  Bank details in this invoice <span className="font-semibold text-palo-navy dark:text-palo-cyan">differ from your last payment</span> to "Dental Supplies Co."
                </p>
                <p className="text-sm text-palo-cyan mt-2 flex items-center gap-2 font-medium">
                  <Phone className="w-4 h-4" />
                  Call to verify before proceeding.
                </p>
              </div>
              <button
                onClick={handleDismiss}
                className="p-1 rounded-md hover:bg-foreground/10 transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1 bg-card hover:bg-muted"
                onClick={handleDismiss}
              >
                Cancel Payment
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleDismiss}
              >
                Proceed Anyway
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
