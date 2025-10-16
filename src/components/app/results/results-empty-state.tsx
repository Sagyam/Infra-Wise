import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function ResultsEmptyState() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">No Results Yet</CardTitle>
        <CardDescription>
          Please fill in the form and click Calculate to see results.
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
