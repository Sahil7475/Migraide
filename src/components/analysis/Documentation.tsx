import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen } from "lucide-react";

interface DocumentationProps {
  links: {
    title: string;
    url: string;
  }[];
}

export const Documentation = ({ links }: DocumentationProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Official Documentation</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {links.map((link, index) => (
          <Card key={index} className="p-4 hover:border-primary transition-colors">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between"
            >
              <span className="font-medium">{link.title}</span>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </a>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-primary">
        <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
        <p className="text-sm mb-4 opacity-90">
          Join the community discussions and get help from other developers who've completed
          similar migrations.
        </p>
        <Button variant="secondary">Join Discussion</Button>
      </Card>
    </div>
  );
};
