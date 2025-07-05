# SVG Icons

Place your SVG icon files in this directory. They will be automatically converted to React components via SVGR.

## Usage

1. **Add your SVG file** to this directory (e.g., `visa-logo.svg`)

2. **Import and use** in any component:

   ```tsx
   import VisaLogo from "@/assets/icons/visa-logo.svg";

   function MyComponent() {
     return (
       <div>
         <VisaLogo width={32} height={32} className="text-blue-500" />
       </div>
     );
   }
   ```

3. **With the Icon helper** (optional):

   ```tsx
   import MastercardLogo from '@/assets/icons/mastercard-logo.svg';

   // Direct usage
   <MastercardLogo className="w-6 h-6" />

   // Or pass to other components
   <SomeIconWrapper IconComponent={MastercardLogo} />
   ```

## File Naming Convention

- Use kebab-case: `visa-logo.svg`, `mastercard-logo.svg`
- Be descriptive: `google-pay-icon.svg`, `freeze-card-icon.svg`
- Avoid spaces and special characters

## SVG Optimization

- Ensure SVGs are optimized (remove unnecessary metadata)
- Use `currentColor` for fill/stroke when you want the icon to inherit text color
- Set appropriate viewBox for proper scaling

## Examples

Common icon categories you might add:

- `payment-logos/` - visa-logo.svg, mastercard-logo.svg, etc.
- `actions/` - freeze-icon.svg, settings-icon.svg, etc.
- `ui/` - chevron-down.svg, close-icon.svg, etc.
