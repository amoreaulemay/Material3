import { DynamicColor, Palette } from "../../../lib/Color";
import { md } from "../../../lib/md";
import { staticImplements } from "../../../lib/StaticImplements";

export namespace NBTheme {
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
             * The height of the container.
             */
            export const height = new NBTheme.property(80);

            /**
             * The corner radius of the container.
             */
            export const shape = new NBTheme.property(0);

            /**
             * The padding values for the container.
             */
            export namespace padding {
                /**
                 * The top padding for the container.
                 */
                export const top = new NBTheme.property(12);

                /**
                 * The bottom padding for the container.
                 */
                export const bottom = new NBTheme.property(16);
            }
        }

        export namespace icon {
            /**
             * The size of icons in the `NavigationBar`.
             */
            export const size = new NBTheme.property(24);
        }

        export namespace active_indicator {
            /**
             * The height of the active indicator pill.
             */
            export const height = new NBTheme.property(32);

            /**
             * The width of the active indicator pill.
             */
            export const width = new NBTheme.property(64);

            /**
             * The corner radius of the active indicator pill.
             */
            export const shape = new NBTheme.property(16);
        }

        export namespace large_badge {
            /**
             * The diameter of the badge's circle.
             */
            export const size = new NBTheme.property(16);

            /**
             * The corner radius of the badge.
             */
            export const shape = new NBTheme.property(8);
        }

        export namespace small_badge {
            /**
             * The diameter of the badge's circle.
             */
            export const size = new NBTheme.property(6);

            /**
             * The corner radius of the badge.
             */
            export const shape = new NBTheme.property(3);
        }

        export namespace destinations {
            /**
             * The minimum width/height for a target size for touch screens.
             */
            export const target_size = new NBTheme.property(48);

            /**
             * The minimum margin between elements.
             */
            export const margin_between = new NBTheme.property(8);

            /**
             * The padding between the active indicator and the text label.
             */
            export const padding_between_active_indicator_and_text = new NBTheme.property(4);
        }
    }
}

export interface NBProps {
    container_theme?: NBContainerTheme;
    destination_theme?: NBDestinationTheme;
    palette?: Palette;
}

@staticImplements<md.ref.copy<NBProps, NavigationBarTheme>>()
export class NavigationBarTheme {
    public container_theme: NBContainerTheme;
    public destination_theme: NBDestinationTheme;

    constructor(
        container_theme?: NBContainerTheme,
        destination_theme?: NBDestinationTheme,
        palette?: Palette,
    ) {
        this.container_theme = NBContainerTheme.copyWith({
            color: container_theme?.color ?? new md.sys.color_primitives.surface(palette?.primary.color60, palette?.primary.color30),
            elevation: container_theme?.elevation,
            z_index: container_theme?.z_index,
        });

        this.destination_theme = NBDestinationTheme.copyWith({
            icon_theme: destination_theme?.icon_theme,
            label_theme: destination_theme?.label_theme,
            active_indicator_theme: destination_theme?.active_indicator_theme,
        });
    }

    static copyWith(theme: NBProps): NavigationBarTheme {
        return new NavigationBarTheme(theme.container_theme, theme.destination_theme, theme.palette);
    }
}

export interface NBDestinationProps {
    icon_theme?: NBIconTheme;
    label_theme?: NBLabelTextTheme;
    active_indicator_theme?: NBActiveIndicatorTheme;
}

@staticImplements<md.ref.copy<NBDestinationProps, NBDestinationTheme>>()
export class NBDestinationTheme {
    public icon_theme: NBIconTheme;
    public label_theme: NBLabelTextTheme;
    public active_indicator_theme: NBActiveIndicatorTheme;

    constructor(
        icon_theme?: NBIconTheme,
        label_theme?: NBLabelTextTheme,
        active_indicator_theme?: NBActiveIndicatorTheme,
    ) {
        this.icon_theme = NBIconTheme.copyWith({
            color_active: icon_theme?.color_active,
            color_inactive: icon_theme?.color_inactive,
        });

        this.label_theme = NBLabelTextTheme.copyWith({
            color_active: label_theme?.color_active,
            color_inactive: label_theme?.color_inactive,
            text_style: label_theme?.text_style,
        });

        this.active_indicator_theme = NBActiveIndicatorTheme.copyWith({
            color: active_indicator_theme?.color,
        });
    }

    static copyWith(theme: NBDestinationProps): NBDestinationTheme {
        return new NBDestinationTheme(theme.icon_theme, theme.label_theme, theme.active_indicator_theme);
    }
}

export interface NBContainerProps {
    color?: DynamicColor;
    elevation?: md.sys.elevation;
    z_index?: number
}

@staticImplements<md.ref.copy<NBContainerProps, NBContainerTheme>>()
export class NBContainerTheme implements md.ref.css {
    constructor(
        public color: DynamicColor = md.sys.color.surface,
        public elevation: md.sys.elevation = md.sys.elevation.level2,
        public z_index: number = md.sys.elevation.level2,
    ) { }

    static copyWith(theme: NBContainerProps): NBContainerTheme {
        return new NBContainerTheme(theme.color, theme.elevation, theme.z_index);
    }

    public get css_vars(): md.ref.css_var {
        return {
            '--nb-container-color-light': this.color.light.hex,
            '--nb-container-color-dark': this.color.dark.hex,
            '--nb-container-elevation-light': md.ref.elevation.css(this.elevation).light,
            '--nb-container-elevation-dark': md.ref.elevation.css(this.elevation).dark,
            '--nb-container-z-index': this.z_index.toString(),

            // Properties
            '--nb-container-height': NBTheme.properties.container.height.toString(),
            '--nb-container-shape': NBTheme.properties.container.shape.toString(),
            '--nb-container-padding-top': NBTheme.properties.container.padding.top.toString(),
            '--nb-container-padding-bottom': NBTheme.properties.container.padding.bottom.toString(),
            '--nb-container-space-between-destinations': NBTheme.properties.destinations.padding_between_active_indicator_and_text.toString(),
            '--nb-container-target-size': NBTheme.properties.destinations.target_size.toString(),
        }
    }

    public get inline_css(): string {
        return md.ref.generate_style(this.css_vars);
    }
}

export interface NBIconProps {
    color_active?: DynamicColor;
    color_inactive?: DynamicColor;
}

@staticImplements<md.ref.copy<NBIconProps, NBIconTheme>>()
export class NBIconTheme implements md.ref.css {
    constructor(
        public color_active: DynamicColor = md.sys.color.on_secondary_container,
        public color_inactive: DynamicColor = md.sys.color.on_surface_variant,
    ) { }

    static copyWith(props: NBIconProps): NBIconTheme {
        return new NBIconTheme(props.color_active, props.color_inactive);
    }

    public get css_vars(): md.ref.css_var {
        return {
            '--nb-icon-color-active-light': this.color_active.light.hex,
            '--nb-icon-color-active-dark': this.color_active.dark.hex,
            '--nb-icon-color-inactive-light': this.color_inactive.light.hex,
            '--nb-icon-color-inactive-dark': this.color_inactive.dark.hex,

            // Properties
            '--nb-icon-size': NBTheme.properties.icon.size.toString(),
        }
    }

    public get inline_css(): string {
        return md.ref.generate_style(this.css_vars);
    }
}

export interface NBLabelTextProps {
    color_active?: DynamicColor;
    color_inactive?: DynamicColor;
    text_style?: md.sys.typescale;
}

@staticImplements<md.ref.copy<NBLabelTextProps, NBLabelTextTheme>>()
export class NBLabelTextTheme implements md.ref.css {
    constructor(
        public color_active: DynamicColor = md.sys.color.on_surface,
        public color_inactive: DynamicColor = md.sys.color.on_surface_variant,
        public font: string = md.sys.typescale.label_medium.font,
        public line_height: number = md.sys.typescale.label_medium.line_height,
        public size: number = md.sys.typescale.label_medium.size,
        public tracking: number = md.sys.typescale.label_medium.tracking,
        public weight: number = md.sys.typescale.label_medium.weight,
    ) { }

    static copyWith(theme: NBLabelTextProps): NBLabelTextTheme {
        return new NBLabelTextTheme(
            theme.color_active,
            theme.color_inactive,
            theme.text_style?.font,
            theme.text_style?.line_height,
            theme.text_style?.size,
            theme.text_style?.tracking,
            theme.text_style?.weight,
        );
    }

    public get text_style(): md.sys.typescale {
        return new md.sys.typescale_primitives.custom_text_style(this.font, this.line_height, this.size, this.tracking, this.weight);
    }

    public get css_vars(): md.ref.css_var {
        return {
            '--nb-label-text-color-active-light': this.color_active.light.hex,
            '--nb-label-text-color-active-dark': this.color_active.dark.hex,
            '--nb-label-text-color-inactive-light': this.color_inactive.light.hex,
            '--nb-label-text-color-inactive-dark': this.color_inactive.dark.hex,
            '--nb-label-text-font': this.font,
            '--nb-label-text-line-height': md.ref.dp_to_rem_string(this.line_height),
            '--nb-label-text-size': md.ref.dp_to_rem_string(this.size),
            '--nb-label-text-tracking': md.ref.dp_to_rem_string(this.tracking),
            '--nb-label-text-weight': this.weight.toString(),
        }
    }

    public get inline_css(): string {
        return md.ref.generate_style(this.css_vars);
    }
}

export interface NBActiveIndicatorProps {
    color?: DynamicColor;
}

@staticImplements<md.ref.copy<NBActiveIndicatorProps, NBActiveIndicatorTheme>>()
export class NBActiveIndicatorTheme implements md.ref.css {
    constructor(
        public color: DynamicColor = md.sys.color.secondary_container,
    ) { }

    static copyWith(theme: NBActiveIndicatorProps): NBActiveIndicatorTheme {
        return new NBActiveIndicatorTheme(theme.color);
    }

    public get css_vars(): md.ref.css_var {
        return {
            '--nb-active-indicator-color-light': this.color.light.hex,
            '--nb-active-indicator-color-dark': this.color.dark.hex,
        }
    }

    public get inline_css(): string {
        return md.ref.generate_style(this.css_vars);
    }
}