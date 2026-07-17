---
name: Academic Navy
colors:
  surface: '#f8f9ff'
  surface-dim: '#d1daec'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#e0e9fa'
  surface-container-highest: '#dae3f5'
  on-surface: '#131c29'
  on-surface-variant: '#45464d'
  inverse-surface: '#28313e'
  inverse-on-surface: '#ebf1ff'
  outline: '#75777e'
  outline-variant: '#c5c6ce'
  surface-tint: '#525e7d'
  primary: '#000a24'
  on-primary: '#ffffff'
  primary-container: '#14213d'
  on-primary-container: '#7c89aa'
  inverse-primary: '#b9c6ea'
  secondary: '#485f83'
  on-secondary: '#ffffff'
  secondary-container: '#bed6ff'
  on-secondary-container: '#455c80'
  tertiary: '#120a00'
  on-tertiary: '#ffffff'
  tertiary-container: '#2e1f00'
  on-tertiary-container: '#a68441'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#b9c6ea'
  on-primary-fixed: '#0d1b36'
  on-primary-fixed-variant: '#3a4664'
  secondary-fixed: '#d5e3ff'
  secondary-fixed-dim: '#b0c8f0'
  on-secondary-fixed: '#001c3b'
  on-secondary-fixed-variant: '#30476a'
  tertiary-fixed: '#ffdea5'
  tertiary-fixed-dim: '#e9c178'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5d4202'
  background: '#f8f9ff'
  on-background: '#131c29'
  surface-variant: '#dae3f5'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-sm:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  numeral-lg:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: '0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 16px
---

## Brand & Style

This design system is built for administrative excellence and academic rigor. It prioritizes structure, clarity, and a sense of institutional permanence. The brand personality is professional, authoritative, and dependable, catering to educators and administrators who require a focused environment for managing complex data.

The design style is **Corporate Modern** with a lean toward **Minimalism**. It utilizes a "Surface-on-Surface" approach where distinct information containers are defined by subtle value shifts and thin borders rather than aggressive shadows. The aesthetic is clean and organized, echoing the structured nature of an elite academic institution. High contrast and generous whitespace ensure long-term readability and reduced cognitive load.

## Colors

The palette is rooted in **Midnight Navy**, providing a strong foundation of authority. This is balanced by **Warm Ivory**, which softens the interface to prevent eye strain during extended administrative tasks.

- **Primary (Midnight Navy):** Used for global navigation, primary actions, and major headings to establish hierarchy.
- **Secondary (Slate Blue):** Applied to secondary interactive elements and decorative headers within cards.
- **Accent (Muted Gold):** Reserved for active states, notifications, and high-importance highlights to guide the user's eye.
- **Surface (Soft White):** All content-bearing containers use this slightly brighter neutral to pop against the ivory background.
- **Borders (Mist Gray):** Low-contrast lines that define structure without creating visual noise.

## Typography

This system uses a dual-font strategy. **Manrope** is used for all headlines and numerical data, providing a modern, geometric clarity that feels contemporary yet academic. **Inter** is utilized for all body copy and UI labels, ensuring maximum legibility and a neutral, functional tone.

Numerical data should always use Manrope to capitalize on its high-readability glyphs, especially in tables and dashboards. For mobile devices, headline sizes are scaled down while maintaining consistent line heights to preserve the vertical rhythm of the grid.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. The sidebar remains at a fixed width of 280px, while the main content area utilizes a fluid 12-column grid. On desktop, the container has a maximum width of 1440px to ensure line lengths for text remain readable.

A strict 8px spacing scale is enforced for all structural elements. Internal card padding is set to `24px` (lg), while layout gutters are consistently `24px`. On mobile, margins reduce to `16px` and the sidebar transitions to a hidden drawer. Content blocks should use the `2xl` (48px) spacing unit for vertical separation to maintain an airy, professional feel.

## Elevation & Depth

Visual hierarchy is primarily achieved through **Tonal Layering** and **Low-Contrast Outlines**.

1.  **Level 0 (Base):** The main background uses Warm Ivory (#F7F5F0).
2.  **Level 1 (Card/Container):** Elevated surfaces use Soft White (#FCFCFB) with a 1px border of Mist Gray (#E1E5EA).
3.  **Level 2 (Hover/Active):** Interactive elements use a very soft ambient shadow: `0px 4px 12px rgba(20, 33, 61, 0.05)`.

This approach creates a "flat-plus" look where depth is felt through subtle shifts in brightness and thin strokes rather than heavy drop shadows. Modals and dropdowns are the only elements to use a more pronounced shadow to ensure they sit clearly above the rest of the UI.

## Shapes

The design system uses a **Rounded** aesthetic to balance the "serious" nature of the navy color palette with a modern, approachable feel. 

- **Standard Elements (Buttons, Inputs):** 0.5rem (8px) radius.
- **Large Elements (Cards, Modals):** 1rem (16px) radius.
- **Small Elements (Chips, Tags):** 0.25rem (4px) radius.

Avoid fully pill-shaped buttons to maintain the professional, structured look. The consistency of these radii reinforces the institutional quality of the design.

## Components

### Buttons
- **Primary:** Midnight Navy background, Soft White text. No border.
- **Secondary:** Transparent background, 1px Slate Blue border, Slate Blue text. 
- **Ghost:** No border or background, Midnight Navy text. Use for low-priority actions.

### Input Fields
- **Default:** Soft White background, 1px Mist Gray border. Text in Charcoal Navy.
- **Focus:** 1px Muted Gold border with a 2px outer glow of `rgba(198, 161, 91, 0.2)`.

### Chips & Tags
- **Status:** Lightly tinted backgrounds (e.g., a very pale version of Muted Gold) with high-contrast text. Small `rounded-sm` corners.

### Lists & Tables
- **Table Header:** Slate Blue background with Soft White text (Manrope SemiBold).
- **Table Row:** Soft White background. 1px bottom border of Mist Gray. Alternate rows can use a faint Ivory tint for readability in dense data.

### Cards
- Always use Soft White (#FCFCFB) background.
- 1px Mist Gray border.
- Title should be Manrope SemiBold in Midnight Navy.