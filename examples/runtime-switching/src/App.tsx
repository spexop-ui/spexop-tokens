import {
  Button,
  Card,
  Grid,
  GridItem,
  Stack,
  ThemeProvider,
} from "@spexop/react";
import {
  healthcarePreset,
  minimalPreset,
  startupPreset,
  techPreset,
} from "@spexop/theme";
import { useState } from "react";

const themes = {
  tech: techPreset,
  healthcare: healthcarePreset,
  startup: startupPreset,
  minimal: minimalPreset,
};

export function App() {
  const [currentTheme, setCurrentTheme] = useState<keyof typeof themes>("tech");

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <Grid columns={12} gap={24} style={{ padding: "48px" }}>
        <GridItem span={12}>
          <h1>Runtime Theme Switching</h1>
          <Stack direction="horizontal" gap={12} style={{ marginTop: "16px" }}>
            {Object.keys(themes).map((name) => (
              <Button
                key={name}
                variant={currentTheme === name ? "primary" : "outline"}
                onClick={() => setCurrentTheme(name as keyof typeof themes)}
              >
                {name}
              </Button>
            ))}
          </Stack>
        </GridItem>

        <GridItem span={6}>
          <Card>
            <h2>Current Theme: {themes[currentTheme].meta.name}</h2>
            <p>All components update automatically when theme changes</p>
          </Card>
        </GridItem>

        <GridItem span={6}>
          <Card>
            <h3>Theme Switching</h3>
            <p>
              Click buttons above to switch between different theme presets in
              real-time
            </p>
          </Card>
        </GridItem>

        <GridItem span={12}>
          <Card>
            <h3>Available Themes</h3>
            <Stack gap={8}>
              <p>
                <strong>Tech:</strong> Blue and modern tech aesthetic
              </p>
              <p>
                <strong>Healthcare:</strong> Clean and trustworthy medical theme
              </p>
              <p>
                <strong>Startup:</strong> Bold and energetic startup vibe
              </p>
              <p>
                <strong>Minimal:</strong> Simple and elegant minimalism
              </p>
            </Stack>
          </Card>
        </GridItem>
      </Grid>
    </ThemeProvider>
  );
}
