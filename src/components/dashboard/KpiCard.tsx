import { Card, CardContent } from "@/components/ui/card";

export default function KpiCard({ title, value }: any) {
  return (
    <Card className="hover:shadow-lg transition">
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </CardContent>
    </Card>
  );
}
