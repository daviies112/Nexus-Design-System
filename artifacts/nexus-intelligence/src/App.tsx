import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import LandingPage from "@/pages/LandingPage";
import BrandKit from "@/pages/BrandKit";
import InstagramTemplates from "@/pages/InstagramTemplates";
import SobreNos from "@/pages/SobreNos";
import Funcionalidades from "@/pages/Funcionalidades";
import Integracoes from "@/pages/Integracoes";
import Seguranca from "@/pages/Seguranca";
import TermosUso from "@/pages/TermosUso";
import PoliticaPrivacidade from "@/pages/PoliticaPrivacidade";
import CentralAjuda from "@/pages/CentralAjuda";
import Checkout from "@/pages/Checkout";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/brand" component={BrandKit} />
        <Route path="/instagram" component={InstagramTemplates} />
        <Route path="/sobre-nos" component={SobreNos} />
        <Route path="/funcionalidades" component={Funcionalidades} />
        <Route path="/integracoes" component={Integracoes} />
        <Route path="/seguranca" component={Seguranca} />
        <Route path="/termos-uso" component={TermosUso} />
        <Route path="/politica-privacidade" component={PoliticaPrivacidade} />
        <Route path="/central-ajuda" component={CentralAjuda} />
        <Route path="/checkout" component={Checkout} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
