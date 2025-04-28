import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold italic text-primary">
            Build Your Own Future
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">
            Take our personality test to discover career paths tailored to you.
          </p>
          <Link href="/test">
            <Button size="lg" className="w-full sm:w-auto">
              Start Test
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
