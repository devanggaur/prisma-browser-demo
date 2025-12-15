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
  newtab: "about:blank",
  inbox: "mail.google.com/mail/u/0/#inbox",
  invoice: "docs.dentalsupplies.com/invoice-2024-1847.pdf",
  gusto: "app.gusto.com/payroll/employees",
  wire: "business.bank.com/transfers/new",
  chase: "chase.com/business/banking",
};

const Index = () => {
  const [currentTab, setCurrentTab] = useState<Tab>("newtab");
  const [fraudProtection, setFraudProtection] = useState(true);
  const [payrollLock, setPayrollLock] = useState(true);
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus>("safe");
  const [enclaveMode, setEnclaveMode] = useState(false);
  const [availableTabs, setAvailableTabs] = useState<string[]>(["newtab"]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSecurityEvent = useCallback((status: SecurityStatus) => {
    setSecurityStatus(status);
  }, []);

  const handleTabChange = useCallback((tab: Tab) => {
    setIsLoading(true);

    setTimeout(() => {
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

      setIsLoading(false);
    }, 800);
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

  const handleNavigate = useCallback((url: string, addTab?: (tab: any) => void, fromTab?: string) => {
    // Remove protocol and www prefix for matching
    const cleanUrl = url.toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .trim();

    setIsLoading(true);

    // Simulate loading time for better UX
    setTimeout(() => {
      // Check if navigating to Gmail/Google Mail
      if (cleanUrl.includes('gmail.com') || cleanUrl.includes('mail.google.com') || cleanUrl === 'gmail') {
        if (!availableTabs.includes("inbox") && addTab) {
          setAvailableTabs(prev => [...prev, "inbox"]);
          addTab({ id: "inbox", label: "Inbox", url: "mail.google.com/mail/u/0/#inbox", closeable: true });
        }
        setCurrentTab("inbox");
        setSecurityStatus("safe");
      }
      // Check if navigating to Gusto
      else if (cleanUrl.includes('gusto.com') || cleanUrl === 'gusto') {
        if (!availableTabs.includes("gusto") && addTab) {
          setAvailableTabs(prev => [...prev, "gusto"]);
          addTab({ id: "gusto", label: "Gusto Payroll", url: "app.gusto.com/payroll/employees", closeable: true });
        }
        setCurrentTab("gusto");
        setSecurityStatus("safe");
      }
      // Check if navigating to Chase
      else if (cleanUrl.includes('chase.com') || cleanUrl.includes('chase')) {
        if (!availableTabs.includes("chase") && addTab) {
          setAvailableTabs(prev => [...prev, "chase"]);
          addTab({ id: "chase", label: "Chase Banking", url: "chase.com/business/banking", closeable: true });
        }
        setCurrentTab("chase");
        setEnclaveMode(true);
        toast.success("Financial Enclave Active", {
          description: "Extensions & Screen Sharing Disabled.",
          duration: 4000,
        });
      }

      setIsLoading(false);
    }, 1200); // 1.2 second loading time
  }, [availableTabs]);

  const handleOpenInvoice = useCallback(() => {
    setCurrentTab("invoice");
    setSecurityStatus("safe");
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden">
      {/* Main Demo Area */}
      <main className="h-full w-full">
        <div className="flex h-full w-full">
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
            {isLoading ? (
              <div className="h-full flex items-center justify-center bg-background">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin mx-auto" />
                  <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
                </div>
              </div>
            ) : currentTab === "inbox" ? (
              <GmailInboxScenario onOpenInvoice={handleOpenInvoice} />
            ) : currentTab === "invoice" ? (
              <InvoiceScenario
                fraudProtectionEnabled={fraudProtection}
                onSecurityEvent={handleSecurityEvent}
              />
            ) : currentTab === "gusto" ? (
              <GustoScenario
                payrollLockEnabled={payrollLock}
                onSecurityEvent={handleSecurityEvent}
              />
            ) : currentTab === "wire" ? (
              <WireTransferScenario
                onSecurityEvent={handleSecurityEvent}
              />
            ) : currentTab === "chase" ? (
              <ChaseAccountScenario />
            ) : !["inbox", "invoice", "gusto", "wire", "chase"].includes(currentTab) ? (
              <div className="h-full bg-gradient-to-br from-background via-muted/30 to-background p-8 overflow-auto">
                <div className="max-w-5xl mx-auto">
                  {/* Welcome Section */}
                  <div className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mb-4">
                      <Shield className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Prisma Access Browser</h1>
                    <p className="text-muted-foreground">Secure browsing for business operations</p>
                  </div>

                  {/* Quick Access Grid */}
                  <div className="mb-8">
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-1">Quick Access</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {/* Gmail */}
                      <button
                        onClick={() => handleNavigate("gmail.com")}
                        className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-200 text-left overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                          <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-3">
                            <span className="text-2xl">📧</span>
                          </div>
                          <h3 className="font-semibold text-foreground mb-1">Gmail</h3>
                          <p className="text-xs text-muted-foreground">Email & Communication</p>
                        </div>
                      </button>

                      {/* Gusto Payroll */}
                      <button
                        onClick={() => setCurrentTab("gusto")}
                        className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-200 text-left overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
                            <span className="text-2xl">💼</span>
                          </div>
                          <h3 className="font-semibold text-foreground mb-1">Gusto</h3>
                          <p className="text-xs text-muted-foreground">Payroll Management</p>
                        </div>
                      </button>

                      {/* Wire Transfer */}
                      <button
                        onClick={() => {
                          setCurrentTab("wire");
                          setEnclaveMode(true);
                        }}
                        className="group relative p-6 rounded-2xl bg-card border border-border hover:border-panw-orange/50 hover:shadow-lg transition-all duration-200 text-left overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-panw-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                          <div className="w-12 h-12 rounded-xl bg-panw-orange/10 flex items-center justify-center mb-3">
                            <span className="text-2xl">💸</span>
                          </div>
                          <h3 className="font-semibold text-foreground mb-1">Wire Transfer</h3>
                          <p className="text-xs text-muted-foreground">Secure Transactions</p>
                          <div className="mt-2 inline-flex items-center gap-1 text-xs text-panw-orange">
                            <Shield className="w-3 h-3" />
                            <span>Enclave Protected</span>
                          </div>
                        </div>
                      </button>

                      {/* Chase Banking */}
                      <button
                        onClick={() => handleNavigate("chase.com")}
                        className="group relative p-6 rounded-2xl bg-card border border-border hover:border-blue-500/50 hover:shadow-lg transition-all duration-200 text-left overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3">
                            <span className="text-2xl">🏦</span>
                          </div>
                          <h3 className="font-semibold text-foreground mb-1">Chase</h3>
                          <p className="text-xs text-muted-foreground">Business Banking</p>
                          <div className="mt-2 inline-flex items-center gap-1 text-xs text-panw-orange">
                            <Shield className="w-3 h-3" />
                            <span>Enclave Protected</span>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Recent/Suggestions */}
                  <div>
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-1">Frequently Used</h2>
                    <div className="grid gap-3">
                      <button
                        onClick={() => setCurrentTab("invoice")}
                        className="group p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all text-left flex items-center gap-4"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-xl">📄</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground">Invoice PDF</h3>
                          <p className="text-xs text-muted-foreground truncate">docs.dentalsupplies.com/invoice-2024-1847.pdf</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </BrowserFrame>
        </div>
      </main>
    </div>
  );
};

export default Index;
