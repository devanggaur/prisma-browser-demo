import { useState, useCallback } from "react";
import { Shield } from "lucide-react";
import { BrowserFrame } from "@/components/demo/BrowserFrame";
import { GmailInboxScenario } from "@/components/demo/GmailInboxScenario";
import { InvoiceScenario } from "@/components/demo/InvoiceScenario";
import { GustoScenario } from "@/components/demo/GustoScenario";
import { WireTransferScenario } from "@/components/demo/WireTransferScenario";
import { ChaseAccountScenario } from "@/components/demo/ChaseAccountScenario";
import { toast } from "@/components/ui/sonner";

type Tab = "inbox" | "invoice" | "gusto" | "wire" | "chase" | string;
type SecurityStatus = "safe" | "warning" | "neutral";

const tabUrls: Record<string, string> = {
  inbox: "mail.google.com/mail/u/0/#inbox",
  invoice: "docs.dentalsupplies.com/invoice-2024-1847.pdf",
  gusto: "app.gusto.com/payroll/employees",
  wire: "business.bank.com/transfers/new",
  chase: "chase.com/business/banking",
};

const Index = () => {
  const [currentTab, setCurrentTab] = useState<Tab>("inbox");
  const [fraudProtection, setFraudProtection] = useState(true);
  const [payrollLock, setPayrollLock] = useState(true);
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus>("safe");
  const [enclaveMode, setEnclaveMode] = useState(false);

  const handleSecurityEvent = useCallback((status: SecurityStatus) => {
    setSecurityStatus(status);
  }, []);

  const handleTabChange = useCallback((tab: Tab) => {
    setCurrentTab(tab);
    setSecurityStatus("safe");

    const isBankingTab = tab === "wire" || tab === "chase";

    // Auto-activate enclave for banking operations
    if (isBankingTab && !enclaveMode) {
      setEnclaveMode(true);
      toast.success("Financial Enclave Active", {
        description: "Extensions & Screen Sharing Disabled.",
        duration: 4000,
      });
    }

    // Auto-disable enclave when leaving banking tabs
    if (!isBankingTab && enclaveMode) {
      setEnclaveMode(false);
      toast.info("Financial Enclave Deactivated", {
        description: "Standard browsing mode restored.",
        duration: 3000,
      });
    }
  }, [enclaveMode]);

  const handleEnclaveActivation = useCallback(() => {
    setEnclaveMode(true);
    setCurrentTab("wire");
    setSecurityStatus("safe");
    toast.success("Financial Enclave Active", {
      description: "Extensions & Screen Sharing Disabled.",
      duration: 4000,
    });
  }, []);

  const handleNavigate = useCallback((url: string) => {
    // Remove protocol and www prefix for matching
    const cleanUrl = url.toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .trim();

    // Check if navigating to Chase
    if (cleanUrl.includes('chase.com') || cleanUrl.includes('chase')) {
      setCurrentTab("chase");
      setEnclaveMode(true);
      toast.success("Financial Enclave Active", {
        description: "Extensions & Screen Sharing Disabled.",
        duration: 4000,
      });
    }
  }, []);

  const handleOpenInvoice = useCallback(() => {
    setCurrentTab("invoice");
    setSecurityStatus("safe");
  }, []);

  return (
    <div className="min-h-screen bg-muted/50 p-4 md:p-8">
      {/* Main Demo Area */}
      <main className="max-w-7xl mx-auto">
        <div className="flex h-[calc(100vh-120px)] min-h-[600px] rounded-2xl overflow-hidden border border-border bg-card shadow-lg">
          {/* Browser Frame */}
          <BrowserFrame
            currentTab={currentTab}
            onTabChange={handleTabChange}
            addressBarUrl={
              enclaveMode && currentTab === "wire"
                ? "commercial.chase.com/wire-transfer"
                : tabUrls[currentTab] || "about:blank"
            }
            securityStatus={securityStatus}
            fraudProtection={fraudProtection}
            onFraudProtectionChange={setFraudProtection}
            payrollLock={payrollLock}
            onPayrollLockChange={setPayrollLock}
            enclaveMode={enclaveMode}
            onEnclaveActivation={handleEnclaveActivation}
            onNavigate={handleNavigate}
          >
            {currentTab === "inbox" && (
              <GmailInboxScenario onOpenInvoice={handleOpenInvoice} />
            )}
            {currentTab === "invoice" && (
              <InvoiceScenario
                fraudProtectionEnabled={fraudProtection}
                onSecurityEvent={handleSecurityEvent}
              />
            )}
            {currentTab === "gusto" && (
              <GustoScenario
                payrollLockEnabled={payrollLock}
                onSecurityEvent={handleSecurityEvent}
              />
            )}
            {currentTab === "wire" && (
              <WireTransferScenario
                onSecurityEvent={handleSecurityEvent}
              />
            )}
            {currentTab === "chase" && (
              <ChaseAccountScenario />
            )}
            {!["inbox", "invoice", "gusto", "wire", "chase"].includes(currentTab) && (
              <div className="h-full flex items-center justify-center bg-background">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center">
                    <Shield className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">New Tab</h2>
                    <p className="text-sm text-muted-foreground mt-2">
                      Type a URL in the address bar or try <span className="font-mono text-primary">chase.com</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </BrowserFrame>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          Interactive Demo • Click the settings icon to configure security policies
        </p>
      </footer>
    </div>
  );
};

export default Index;
