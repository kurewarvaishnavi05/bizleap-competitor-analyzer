"use client";

import React from 'react';
import { Recommendation, RecommendationScores } from './types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Download, Share2, FileText } from 'lucide-react';

interface ExportActionsProps {
  recommendations: Recommendation[];
  scores: RecommendationScores;
  summary: string;
}

export const ExportActions: React.FC<ExportActionsProps> = ({ recommendations, scores, summary }) => {
  
  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 100);
    doc.text("Bizleap AI Recommendations Report", 14, 20);
    
    // Executive Summary
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Executive Summary", 14, 35);
    
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    const splitSummary = doc.splitTextToSize(summary, 180);
    doc.text(splitSummary, 14, 45);
    
    let currentY = 45 + (splitSummary.length * 5) + 10;
    
    // Scores
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Key Improvement Scores", 14, currentY);
    
    currentY += 10;
    const scoreData = [
      ['Overall Improvement', scores.overallImprovement.toString() + '/100'],
      ['Growth Opportunity', scores.growthOpportunity.toString() + '/100'],
      ['Competitive Advantage', scores.competitiveAdvantage.toString() + '/100'],
      ['Innovation Score', scores.innovation.toString() + '/100'],
      ['Risk Assessment', scores.riskAssessment.toString() + '/100'],
    ];
    
    autoTable(doc, {
      startY: currentY,
      head: [['Metric', 'Score']],
      body: scoreData,
      theme: 'grid',
      headStyles: { fillColor: [79, 70, 229] }
    });
    
    // Recommendations Table
    const finalY = (doc as any).lastAutoTable.finalY + 15;
    
    doc.setFontSize(14);
    doc.text("Detailed Recommendations", 14, finalY);
    
    const recData = recommendations.map(r => [
      r.title,
      r.category,
      r.priority,
      r.difficulty,
      `+${r.growthPotentialPercent}%`
    ]);
    
    autoTable(doc, {
      startY: finalY + 5,
      head: [['Recommendation', 'Category', 'Priority', 'Difficulty', 'Growth Potential']],
      body: recData,
      theme: 'striped',
      headStyles: { fillColor: [79, 70, 229] },
      columnStyles: { 0: { cellWidth: 70 } }
    });
    
    doc.save("bizleap_recommendations_report.pdf");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Bizleap AI Recommendations',
        text: 'Check out our latest AI-generated business improvement recommendations!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  const handleDownloadSummary = () => {
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'executive_summary.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <button 
        onClick={handleExportPDF}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20"
      >
        <Download className="w-4 h-4" /> Export as PDF
      </button>
      
      <button 
        onClick={handleDownloadSummary}
        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg font-medium transition-all backdrop-blur-sm border border-white/10"
      >
        <FileText className="w-4 h-4" /> Download Summary
      </button>
      
      <button 
        onClick={handleShare}
        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg font-medium transition-all backdrop-blur-sm border border-white/10"
      >
        <Share2 className="w-4 h-4" /> Share Report
      </button>
    </div>
  );
};
