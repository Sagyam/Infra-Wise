"use client";

import { AlertTriangle, Lightbulb } from "lucide-react";
import { useState } from "react";
import { CostForm } from "@/components/app/cost-form";
import { Header } from "@/components/app/header";
import { ResultsDisplay } from "@/components/app/results-display";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { CalculationResult, CostFormValues } from "@/lib/types";

export default function Home() {
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [calculationMode, setCalculationMode] =
    useState<CostFormValues["calculationMode"]>("tco");

  const handleCalculate = (
    data: CalculationResult | null,
    errorMsg: string | null
  ) => {
    if (data) {
      setResults(data);
      setCalculationMode(data.calculationMode);
    }
    setError(errorMsg);
    setIsLoading(false);
  };

  const handleLoading = () => {
    setIsLoading(true);
    setError(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2">
            <CostForm
              onCalculate={handleCalculate}
              onLoading={handleLoading}
              isLoading={isLoading}
              calculationMode={calculationMode}
              onCalculationModeChange={setCalculationMode}
            />
          </div>
          <div className="lg:col-span-3 flex flex-col">
            {isLoading ? (
              <Card className="flex-1 min-h-[600px]">
                <CardHeader>
                  <Skeleton className="h-8 w-3/5" />
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <Skeleton className="h-24" />
                    <Skeleton className="h-24" />
                    <Skeleton className="h-24" />
                  </div>
                  <Skeleton className="h-80" />
                </CardContent>
              </Card>
            ) : error ? (
              <Card className="flex-1 border-destructive bg-destructive/10 min-h-[600px]">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center gap-2">
                    <AlertTriangle />
                    Calculation Failed
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-destructive font-medium">{error}</p>
                  <p className="text-muted-foreground mt-2">
                    Please review your inputs and try again.
                  </p>
                </CardContent>
              </Card>
            ) : results ? (
              <ResultsDisplay
                results={results}
                calculationMode={calculationMode}
              />
            ) : (
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle className="font-headline">
                    Awaiting Your Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center h-full min-h-[600px] text-center">
                  <div className="p-4 bg-accent/10 rounded-full mb-4">
                    <Lightbulb className="w-12 h-12 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold font-headline">
                    Ready to Crunch the Numbers?
                  </h3>
                  <p className="mt-2 text-muted-foreground max-w-sm">
                    Fill out the form to compare the Total Cost of Ownership
                    (TCO) between cloud and on-premise infrastructure.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-muted-foreground text-sm border-t">
        © {new Date().getFullYear()} InfraWise. A financial modeling tool.
      </footer>
    </div>
  );
}
