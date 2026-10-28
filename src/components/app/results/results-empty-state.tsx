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
        <CardTitle className="font-heading">No results yet</CardTitle>
        <CardDescription>
          Pick a preset or fill in the form; the results update as you type.
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
