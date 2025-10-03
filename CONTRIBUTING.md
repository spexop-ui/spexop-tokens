# Contributing to Spexop Design System

Thank you for your interest in contributing to Spexop Design System! We welcome contributions from the community.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

   ```bash
   git clone https://github.com/YOUR-USERNAME/design-system.git
   cd design-system
   ```

3. **Install dependencies:**

   ```bash
   pnpm install
   ```

## Development Workflow

1. **Create a new branch** for your feature or fix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and ensure they follow the project conventions

3. **Test your changes:**

   ```bash
   pnpm test
   ```

4. **Build the packages:**

   ```bash
   pnpm build
   ```

5. **Commit your changes** with a clear commit message:

   ```bash
   git commit -m "Add: brief description of your changes"
   ```

6. **Push to your fork:**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request** on GitHub

## Project Structure

``` bash
spexop-design-system/
├── packages/
│   └── tokens/          # Design tokens package
└── README.md
```

## Coding Standards

- Use **TypeScript** for all code
- Follow the existing code style
- Write clear, descriptive variable and function names
- Add comments for complex logic
- Keep commits atomic and well-described

## Token Naming Convention

All tokens use the `s` prefix (Spexop prefix):

- Colors: `sColor*`
- Spacing: `sSpacing*`
- Typography: `sFont*`
- Effects: `sShadow*`, `sBlur*`

## Pull Request Guidelines

- **Keep PRs focused** - one feature or fix per PR
- **Write clear descriptions** - explain what and why
- **Update documentation** - if you add or change features
- **Add tests** - for new functionality
- **Ensure all tests pass** - before submitting

## Reporting Issues

- **Check existing issues** before creating a new one
- **Use issue templates** when available
- **Provide clear reproduction steps** for bugs
- **Include version information** and environment details

## Questions?

Feel free to open a [GitHub Discussion](https://github.com/spexop-ui/design-system/discussions) if you have questions!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
