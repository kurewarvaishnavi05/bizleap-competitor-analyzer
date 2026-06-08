"use client";

import { useAppStore } from "@/store/useAppStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, FileSpreadsheet, File } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ReportsPage() {
  const { analysisResults, analysisInput, executionPlan } = useAppStore();

  if (!analysisResults || !analysisInput || !executionPlan) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold">No Report Available</h2>
        <p className="text-muted-foreground">Run an analysis to generate reports.</p>
        <Link href="/analysis">
          <Button size="lg">Start Analysis</Button>
        </Link>
      </div>
    );
  }

  const exportPDF = () => {
    import('jspdf').then(({ default: jsPDF }) => {
      import('jspdf-autotable').then(({ default: autoTable }) => {
        const doc = new jsPDF();
        
        // Title
        doc.setFontSize(22);
        doc.text("Competitive Intelligence Report", 14, 22);
        
        doc.setFontSize(14);
        doc.setTextColor(100);
        doc.text(`Generated for ${analysisInput.companyName}`, 14, 30);
        
        // Executive Summary
        doc.setFontSize(16);
        doc.setTextColor(0);
        doc.text("Executive Summary", 14, 45);
        
        doc.setFontSize(11);
        doc.setTextColor(50);
        const splitText = doc.splitTextToSize(analysisResults.overview.summary, 180);
        doc.text(splitText, 14, 55);
        
        let currentY = 55 + (splitText.length * 6) + 10;
        
        // Pricing Table
        doc.setFontSize(16);
        doc.setTextColor(0);
        doc.text("Pricing Analysis", 14, currentY);
        
        const tableColumn = ["Tier", analysisInput.companyName, ...analysisResults.competitors.slice(0, 2).map(c => c.name)];
        const tableRows = analysisResults.pricing.map(price => [
          price.tier, 
          price.myCompany, 
          price.competitor1 as string, 
          price.competitor2 as string
        ]);

        autoTable(doc, {
          startY: currentY + 10,
          head: [tableColumn],
          body: tableRows,
          theme: 'grid',
          headStyles: { fillColor: [79, 70, 229] }
        });
        
        doc.save(`${analysisInput.companyName}_Competitive_Report.pdf`);
      });
    });
  };

  const exportExcel = () => {
    import('xlsx').then((XLSX) => {
      // Create a new workbook
      const wb = XLSX.utils.book_new();
      
      // Features Sheet
      const featuresData = analysisResults.features.map(f => ({
        Feature: f.name,
        [analysisInput.companyName]: f.myCompany,
        "Competitor 1": f.competitor1,
        "Competitor 2": f.competitor2,
      }));
      const wsFeatures = XLSX.utils.json_to_sheet(featuresData);
      XLSX.utils.book_append_sheet(wb, wsFeatures, "Feature Comparison");
      
      // Pricing Sheet
      const pricingData = analysisResults.pricing.map(p => ({
        Tier: p.tier,
        [analysisInput.companyName]: p.myCompany,
        "Competitor 1": p.competitor1,
        "Competitor 2": p.competitor2,
      }));
      const wsPricing = XLSX.utils.json_to_sheet(pricingData);
      XLSX.utils.book_append_sheet(wb, wsPricing, "Pricing Analysis");
      
      // Competitors Sheet
      const compData = analysisResults.competitors.map(c => ({
        Name: c.name,
        URL: c.url,
        Positioning: c.positioning
      }));
      const wsComp = XLSX.utils.json_to_sheet(compData);
      XLSX.utils.book_append_sheet(wb, wsComp, "Competitors");
      
      XLSX.writeFile(wb, `${analysisInput.companyName}_Competitive_Data.xlsx`);
    });
  };

  const handleDownloadAll = () => {
    exportPDF();
    exportExcel();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Intelligence Reports</h1>
          <p className="text-muted-foreground mt-2">Generated on {new Date().toLocaleDateString()} for {analysisInput.companyName}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportPDF}>
            <File className="mr-2 h-4 w-4" /> Export PDF
          </Button>
          <Button variant="outline" onClick={exportExcel}>
            <FileSpreadsheet className="mr-2 h-4 w-4" /> Export Excel
          </Button>
          <Button onClick={handleDownloadAll}>
            <Download className="mr-2 h-4 w-4" /> Download All
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Executive Summary
          </CardTitle>
          <CardDescription>High-level overview of the competitive landscape</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg">{analysisResults.overview.summary}</p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold border-b border-border pb-2 mb-3">Key Findings</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong>Market Position:</strong> {analysisResults.marketPosition.differentiation}</li>
                  <li><strong>Competitive Score:</strong> {analysisResults.kpis.competitiveScore}/100</li>
                  <li><strong>Primary Target:</strong> {analysisResults.overview.targetAudience}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold border-b border-border pb-2 mb-3">Critical Risks</h3>
                <ul className="space-y-2 text-muted-foreground list-disc pl-4">
                  {analysisResults.marketPosition.gaps.map((gap, i) => (
                    <li key={i}>{gap}</li>
                  ))}
                  <li>{executionPlan.businessImpact.advantageScore < 90 ? "Advantage is not fully maximized yet." : "Maintaining advantage requires ongoing effort."}</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Competitive Intelligence Report</CardTitle>
          <CardDescription>Detailed breakdown of your market standing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* SWOT Summary */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-primary">SWOT Highlights</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                <h4 className="font-semibold text-green-500 mb-2">Strengths vs Weaknesses</h4>
                <p className="text-sm text-muted-foreground">Your product excels in <strong>{analysisResults.features[0].name}</strong> and <strong>{analysisResults.features[1].name}</strong>, where competitors are lagging. However, brand awareness remains a weakness compared to {analysisResults.marketPosition.leader}.</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-500 mb-2">Opportunities vs Threats</h4>
                <p className="text-sm text-muted-foreground">There is a clear gap in <strong>{analysisResults.marketPosition.gaps[0]}</strong>. The primary threat comes from rapid pricing changes by competitors aiming to undercut your {analysisResults.pricing[0].tier} tier.</p>
              </div>
            </div>
          </div>

          {/* Pricing Overview */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-primary">Pricing Analysis</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tier</TableHead>
                  <TableHead>Your Company</TableHead>
                  {analysisResults.competitors.slice(0, 2).map((c, i) => (
                    <TableHead key={i}>{c.name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {analysisResults.pricing.map((price, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{price.tier}</TableCell>
                    <TableCell className="font-semibold text-primary">{price.myCompany}</TableCell>
                    {analysisResults.competitors.slice(0, 2).map((c, i) => (
                      <TableCell key={i}>{price[`competitor${i + 1}`] as string}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
