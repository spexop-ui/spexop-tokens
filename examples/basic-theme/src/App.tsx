import { Grid, GridItem, Stack, Button, Card } from '@spexop/react';

export function App() {
  return (
    <Grid columns={12} gap={24} style={{ padding: '48px' }}>
      <GridItem span={12}>
        <h1>Basic Theme Example</h1>
        <p>Using pre-built tech.css theme</p>
      </GridItem>
      
      <GridItem span={6}>
        <Card>
          <h2>Themed Components</h2>
          <Stack gap={16}>
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
          </Stack>
        </Card>
      </GridItem>
      
      <GridItem span={6}>
        <Card>
          <h2>Grid Primitives</h2>
          <p>Using Spexop's primitives-first architecture</p>
        </Card>
      </GridItem>
    </Grid>
  );
}


