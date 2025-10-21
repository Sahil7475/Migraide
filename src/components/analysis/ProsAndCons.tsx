import { ProCon } from "@/types/migration";
import { Card } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Zap, Star, Users, Code, Wrench } from "lucide-react";

interface ProsAndConsProps {
  pros: ProCon[];
  cons: ProCon[];
}

const categoryIcons = {
  performance: Zap,
  features: Star,
  dx: Code,
  community: Users,
  maintenance: Wrench,
};

const ProConCard = ({ item, type }: { item: ProCon; type: "pro" | "con" }) => {
  const Icon = categoryIcons[item.category];
  const colorClass = type === "pro" ? "text-low" : "text-high";

  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${colorClass} mt-0.5 flex-shrink-0`} />
        <div className="flex-1">
          <h4 className="font-semibold mb-1">{item.title}</h4>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>
      </div>
    </Card>
  );
};

export const ProsAndCons = ({ pros, cons }: ProsAndConsProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Pros & Cons Analysis</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-5 h-5 text-low" />
            <h3 className="text-xl font-semibold">Advantages</h3>
          </div>
          <div className="space-y-3">
            {pros.map((pro, index) => (
              <ProConCard key={index} item={pro} type="pro" />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ThumbsDown className="w-5 h-5 text-high" />
            <h3 className="text-xl font-semibold">Considerations</h3>
          </div>
          <div className="space-y-3">
            {cons.map((con, index) => (
              <ProConCard key={index} item={con} type="con" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
