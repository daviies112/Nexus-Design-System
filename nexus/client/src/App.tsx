import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import Home from "./pages/home";
import Checkout from "./pages/checkout";
import PosPagamento from "./pages/pos-pagamento";
import NotFound from "./pages/not-found";
import SobreNos from "./pages/sobre-nos";
import CentralAjuda from "./pages/central-ajuda";
import TermosUso from "./pages/termos-uso";
import PoliticaPrivacidade from "./pages/politica-privacidade";
import Integracoes from "./pages/integracoes";
import Seguranca from "./pages/seguranca";
import Funcionalidades from "./pages/funcionalidades";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/pos-pagamento" component={PosPagamento} />
      <Route path="/sobre-nos" component={SobreNos} />
      <Route path="/central-ajuda" component={CentralAjuda} />
      <Route path="/termos-uso" component={TermosUso} />
      <Route path="/politica-privacidade" component={PoliticaPrivacidade} />
      <Route path="/integracoes" component={Integracoes} />
      <Route path="/seguranca" component={Seguranca} />
      <Route path="/funcionalidades" component={Funcionalidades} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
