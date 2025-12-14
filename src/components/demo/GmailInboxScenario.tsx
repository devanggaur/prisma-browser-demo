import { Mail, Star, Archive, Trash2, Clock, Paperclip, Reply, Forward, MoreVertical, Download, Print } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface GmailInboxScenarioProps {
  onOpenInvoice: () => void;
}

export function GmailInboxScenario({ onOpenInvoice }: GmailInboxScenarioProps) {
  const [selectedEmail, setSelectedEmail] = useState(0);

  return (
    <div className="h-full bg-background flex">
      {/* Left Sidebar */}
      <div className="w-56 border-r border-border p-3 space-y-2">
        <Button className="w-full justify-start gap-3 h-12 bg-prisma-blue hover:bg-prisma-blue/90 text-white">
          <Mail className="w-5 h-5" />
          Compose
        </Button>

        <div className="space-y-0.5 pt-3">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-medium cursor-pointer">
            <Mail className="w-4 h-4" />
            <span className="text-sm">Inbox</span>
            <span className="ml-auto text-xs font-semibold">3</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-muted cursor-pointer text-muted-foreground">
            <Star className="w-4 h-4" />
            <span className="text-sm">Starred</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-muted cursor-pointer text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Snoozed</span>
          </div>
        </div>
      </div>

      {/* Email List (Left Panel) */}
      <div className="w-80 flex flex-col border-r border-border">
        {/* Search Bar */}
        <div className="p-2 border-b border-border">
          <div className="bg-muted rounded-lg px-3 py-2">
            <span className="text-sm text-muted-foreground">Search mail</span>
          </div>
        </div>

        {/* Email Items - Compact List */}
        <div className="flex-1 overflow-auto">
          {/* First Email - Selected */}
          <div
            onClick={() => setSelectedEmail(0)}
            className={cn(
              "px-4 py-3 border-b border-border cursor-pointer transition-all",
              selectedEmail === 0 ? "bg-primary/5 border-l-4 border-l-primary" : "hover:bg-muted/50"
            )}
          >
            <div className="flex items-start gap-3">
              <Star className="w-4 h-4 mt-0.5 text-muted-foreground hover:text-yellow-500" />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-semibold text-sm truncate">Dental Supplies Co.</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">Nov 15</span>
                </div>
                <p className="text-sm font-medium truncate mt-0.5">Invoice #2024-11-A5432 - Payment Due</p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  Dear Sarah, Please find attached invoice...
                </p>
              </div>
              <Paperclip className="w-3.5 h-3.5 text-muted-foreground mt-0.5" />
            </div>
          </div>

          {/* Second Email */}
          <div
            onClick={() => setSelectedEmail(1)}
            className={cn(
              "px-4 py-3 border-b border-border cursor-pointer transition-all",
              selectedEmail === 1 ? "bg-primary/5 border-l-4 border-l-primary" : "hover:bg-muted/50"
            )}
          >
            <div className="flex items-start gap-3">
              <Star className="w-4 h-4 mt-0.5 text-muted-foreground hover:text-yellow-500" />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-medium text-sm text-muted-foreground truncate">LinkedIn</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">Nov 14</span>
                </div>
                <p className="text-sm truncate mt-0.5 text-muted-foreground">Your weekly job matches are here</p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  5 new jobs match your preferences...
                </p>
              </div>
            </div>
          </div>

          {/* Third Email */}
          <div
            onClick={() => setSelectedEmail(2)}
            className={cn(
              "px-4 py-3 border-b border-border cursor-pointer transition-all",
              selectedEmail === 2 ? "bg-primary/5 border-l-4 border-l-primary" : "hover:bg-muted/50"
            )}
          >
            <div className="flex items-start gap-3">
              <Star className="w-4 h-4 mt-0.5 text-muted-foreground hover:text-yellow-500" />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-medium text-sm text-muted-foreground truncate">Office Supplies Direct</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">Nov 13</span>
                </div>
                <p className="text-sm truncate mt-0.5 text-muted-foreground">Your order has shipped! 📦</p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  Track your package: Order #45821...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Reading Pane (Right Panel) */}
      {selectedEmail === 0 && (
        <div className="flex-1 flex flex-col bg-background">
          {/* Email Header */}
          <div className="border-b border-border p-4">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-semibold">Invoice #2024-11-A5432 - Payment Due</h2>
              <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Archive className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Sender Info */}
            <div className="flex items-start gap-3">
              <img
                src="https://i.pravatar.cc/150?img=5"
                alt="Sarah"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Dental Supplies Co.</p>
                    <p className="text-xs text-muted-foreground">accounts@dentalsupplies.com</p>
                  </div>
                  <span className="text-xs text-muted-foreground">Nov 15, 2024, 2:30 PM</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">to me</p>
              </div>
            </div>
          </div>

          {/* Email Body */}
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-2xl space-y-4">
              <p className="text-foreground">Dear Sarah,</p>

              <p className="text-foreground">
                Thank you for your continued partnership with Dental Supplies Co. Please find attached invoice
                <strong> #2024-11-A5432</strong> for the amount of <strong>$8,450.00</strong>.
              </p>

              <div className="bg-muted/50 border border-border rounded-lg p-4 space-y-2">
                <h3 className="font-semibold text-foreground">Invoice Summary</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Invoice Number:</span>
                  <span className="font-medium">#2024-11-A5432</span>
                  <span className="text-muted-foreground">Invoice Date:</span>
                  <span className="font-medium">November 15, 2024</span>
                  <span className="text-muted-foreground">Due Date:</span>
                  <span className="font-medium text-palo-amber">December 15, 2024</span>
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-bold text-lg">$8,450.00</span>
                </div>
              </div>

              <p className="text-foreground">
                Payment is due by <strong>December 15, 2024</strong>. You can view the complete invoice details
                and make a secure payment using the button below.
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <Button
                  onClick={onOpenInvoice}
                  size="lg"
                  className="bg-prisma-blue hover:bg-prisma-blue/90 text-white"
                >
                  <Paperclip className="w-4 h-4 mr-2" />
                  View Invoice & Pay
                </Button>
              </div>

              <p className="text-foreground">
                If you have any questions regarding this invoice, please don't hesitate to contact us.
              </p>

              <p className="text-foreground">
                Best regards,<br />
                <strong>Accounts Receivable Team</strong><br />
                Dental Supplies Co.
              </p>
            </div>
          </div>

          {/* Email Actions */}
          <div className="border-t border-border p-4 flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Reply className="w-4 h-4" />
              Reply
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Forward className="w-4 h-4" />
              Forward
            </Button>
          </div>
        </div>
      )}

      {/* Other email content placeholders */}
      {selectedEmail !== 0 && (
        <div className="flex-1 flex items-center justify-center bg-background">
          <div className="text-center text-muted-foreground">
            <Mail className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Email content</p>
          </div>
        </div>
      )}
    </div>
  );
}
