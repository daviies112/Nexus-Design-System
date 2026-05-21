import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="w-full flex items-center justify-center pt-32 pb-20">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-foreground">404 Página Não Encontrada</h1>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              A página que você está procurando não existe ou foi movida.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
