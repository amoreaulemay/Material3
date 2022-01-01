import { DynamicColor, md, staticImplements } from "../../../lib/lib";

export namespace FABSpecs {
    export class property {
        constructor(
            public dp: number,
        ) { }

        public get rem(): number { return this.dp * 0.0625; }
        public get px(): number { return this.rem * 16; }

        public toString(units: md.ref.units = md.ref.units.rem): string {
            switch (units) {
                case md.ref.units.dp:
                    return this.dp + 'dp';
                case md.ref.units.px:
                    return this.px + 'px';
                case md.ref.units.rem:
                    return this.rem + 'rem';
            }
        }
    }

    export namespace properties {
        export namespace container {
            /**
             * The height of the floating action button.
             */
            export const height = new FABSpecs.property(56);

            /**
             * The floating action button's width is flexible, but this is the minimum width requirement.
             */
            export const min_width = new FABSpecs.property(80);

            /**
             * The corner radius for the button.
             */
            export const shape = new FABSpecs.property(16);

            /**
             * The margin around the button.
             */
            export const margin = new FABSpecs.property(16);
        }

        export namespace icon {
            /**
             * The font size for the icon in the button.
             */
            export const size = new FABSpecs.property(24);
        }
    }
}

export interface FABThemeProps {
    container_theme?: FABContainerTheme;
    label_text_theme?: FABLabelTextTheme;
    icon_theme?: FABIconTheme;
}

@staticImplements<md.ref.copy<FABThemeProps, FABTheme>>()
export class FABTheme {
    constructor(
        public container_theme: FABContainerTheme = new FABContainerTheme(),
        public label_text_theme: FABLabelTextTheme = new FABLabelTextTheme(),
        public icon_theme: FABIconTheme = new FABIconTheme(),
    ) { }

    static copyWith(theme: FABThemeProps): FABTheme {
        return new FABTheme(theme.container_theme, theme.label_text_theme, theme.icon_theme);
    }
}

export interface FABContainerProps {
    color?: DynamicColor;
    shadow_color?: DynamicColor;
    elevation_default?: md.sys.elevation;
    elevation_lowered?: md.sys.elevation;
}

@staticImplements<md.ref.copy<FABContainerProps, FABContainerTheme>>()
export class FABContainerTheme implements md.ref.css {
    constructor(
        public color: DynamicColor = md.sys.color.primary_container,
        public shadow_color: DynamicColor = md.sys.color.shadow,
        public elevation_default: md.sys.elevation = md.sys.elevation.level3,
        public elevation_lowered: md.sys.elevation = md.sys.elevation.level1,
    ) { }

    static copyWith(theme: FABContainerProps): FABContainerTheme {
        return new FABContainerTheme(theme.color, theme.shadow_color, theme.elevation_default, theme.elevation_lowered);
    }

    public get css_vars(): md.ref.css_var {
        return {
            '--fab-container-color-light': this.color.light.hex,
            '--fab-container-color-dark': this.color.dark.hex,
            '--fab-container-elevation-default-light': md.ref.elevation.css(this.elevation_default, this.shadow_color, 0.5).light,
            '--fab-container-elevation-default-dark': md.ref.elevation.css(this.elevation_default, this.shadow_color, 0.5).dark,
            '--fab-container-elevation-lowered-light': md.ref.elevation.css(this.elevation_lowered, this.shadow_color, 0.5).light,
            '--fab-container-elevation-lowered-dark': md.ref.elevation.css(this.elevation_lowered, this.shadow_color, 0.5).dark,
            '--fab-container-z-index': this.elevation_default.toString(),

            // Properties
            '--fab-container-height': FABSpecs.properties.container.height.toString(),
            '--fab-container-min-width': FABSpecs.properties.container.min_width.toString(),
            '--fab-container-margins': FABSpecs.properties.container.margin.toString(),
            '--fab-container-shape': FABSpecs.properties.container.shape.toString(),
        }
    }

    public get inline_css(): string {
        return md.ref.generate_style(this.css_vars);
    }
}

export interface FABLabelTextProps {
    color?: DynamicColor;
    typescale?: md.sys.typescale;
}

@staticImplements<md.ref.copy<FABLabelTextProps, FABLabelTextTheme>>()
export class FABLabelTextTheme implements md.ref.css {
    constructor(
        public color: DynamicColor = md.sys.color.on_primary_container,
        public font: string = md.sys.typescale.button.font,
        public line_height: number = md.sys.typescale.button.line_height,
        public size: number = md.sys.typescale.button.size,
        public tracking: number = md.sys.typescale.button.tracking,
        public weight: number = md.sys.typescale.button.weight,
    ) { }

    static copyWith(theme: FABLabelTextProps): FABLabelTextTheme {
        return new FABLabelTextTheme(theme.color, theme.typescale?.font, theme.typescale?.line_height, theme.typescale?.size, theme.typescale?.tracking, theme.typescale?.weight);
    }

    public get typescale(): md.sys.typescale {
        return new md.sys.typescale_primitives.custom_text_style(this.font, this.line_height, this.size, this.tracking, this.weight);
    }

    public get css_vars(): md.ref.css_var {
        return {
            '--fab-label-text-color-light': this.color.light.hex,
            '--fab-label-text-color-dark': this.color.dark.hex,
            '--fab-label-text-font': this.font,
            '--fab-label-text-line-height': md.ref.dp_to_rem_string(this.line_height),
            '--fab-label-text-size': md.ref.dp_to_rem_string(this.size),
            '--fab-label-text-tracking': md.ref.dp_to_rem_string(this.tracking),
            '--fab-label-text-weight': this.weight.toString(),
        }
    }

    public get inline_css(): string {
        return md.ref.generate_style(this.css_vars);
    }
}

export interface FABIconProps {
    color?: DynamicColor;
}

@staticImplements<md.ref.copy<FABIconProps, FABIconTheme>>()
export class FABIconTheme implements md.ref.css {
    constructor(
        public color: DynamicColor = md.sys.color.on_primary_container,
    ) { }

    static copyWith(theme: FABIconProps): FABIconTheme {
        return new FABIconTheme(theme.color);
    }

    public get size(): number {
        return FABSpecs.properties.icon.size.dp;
    }

    public get css_vars(): md.ref.css_var {
        return {
            '--fab-icon-color-light': this.color.light.hex,
            '--fab-icon-color-dark': this.color.dark.hex,

            // Properties
            '--fab-icon-size': FABSpecs.properties.icon.size.toString(),
        }
    }

    public get inline_css(): string {
        return md.ref.generate_style(this.css_vars);
    }
}