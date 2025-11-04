import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AuthCodeError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Authentication Error</h1>
          <p className="text-muted-foreground">
            Sorry, there was an error during the authentication process.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This could be due to:
          </p>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li>Invalid or expired authentication code</li>
            <li>GitHub OAuth configuration issues</li>
            <li>Network connectivity problems</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Try Again</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}