import { Card } from "@/components/ui/card";

interface CodeBlockProps {
  code: string;
  title?: string;
}

export const CodeBlock = ({ code, title }: CodeBlockProps) => {
  return (
    <div className="space-y-2">
      {title && <p className="text-sm font-medium text-muted-foreground">{title}</p>}
      <Card className="bg-code-bg border-code-border">
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm font-mono text-foreground">{code}</code>
        </pre>
      </Card>
    </div>
  );
};
