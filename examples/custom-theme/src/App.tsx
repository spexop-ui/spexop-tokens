import {
  Button,
  Card,
  Grid,
  GridItem,
  Stack,
  ThemeProvider,
} from "@spexop/react";
import type { SpexopThemeConfig } from "@spexop/theme";

const myTheme: SpexopThemeConfig = {
  meta: {
    name: "My Custom Theme",
    version: "1.0.0",
  },
  colors: {
    primary: "#7c3aed",
    secondary: "#06b6d4",
    accent: "#f59e0b",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#3b82f6",
    background: "#ffffff",
    surface: "#f9fafb",
    text: "#111827",
    textSecondary: "#6b7280",
    border: "#e5e7eb",
    light: "#f9fafb",
    dark: "#1f2937",
    disabled: "#d1d5db",
    hover: "#f3f4f6",
  },
};

export function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <Grid columns={12} gap={24} style={{ padding: "48px" }}>
        <GridItem span={12}>
          <h1>Custom Theme Example</h1>
          <p>Purple primary, cyan secondary, amber accent</p>
        </GridItem>

        <GridItem span={4}>
          <Card>
            <h3>Custom Colors</h3>
            <Stack gap={12}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
            </Stack>
          </Card>
        </GridItem>

        <GridItem span={4}>
          <Card>
            <h3>Grid Layout</h3>
            <p>
              Using Spexop's primitives-first architecture with custom theming
            </p>
          </Card>
        </GridItem>

        <GridItem span={4}>
          <Card>
            <h3>Theme System</h3>
            <p>Easily create your own themes with SpexopThemeConfig</p>
          </Card>
        </GridItem>
      </Grid>
    </ThemeProvider>
  );
}
