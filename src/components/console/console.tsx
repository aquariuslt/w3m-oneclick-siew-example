import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export type ConsoleProps = {
  data?: string
}

export const Console: React.FC<ConsoleProps> = ({ data }) => {
  return (
    <Card className="w-full mx-auto">
      <CardHeader className="flex justify-between">
        <CardTitle>Console</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-medium"></h3>
          <div className="bg-muted rounded-md p-4 text-sm text-muted-foreground">{JSON.stringify(data, null, 2)}</div>
        </div>
      </CardContent>
    </Card>
  )
}
