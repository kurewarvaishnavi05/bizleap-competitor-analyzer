import { RecommendationsDashboard } from "@/components/recommendations/RecommendationsDashboard";
import { Header } from "@/components/Header";

export default function RecommendationsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <RecommendationsDashboard />
      </main>
    </div>
  );
}
