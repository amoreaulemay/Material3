import { DynamicColor } from "../../Color";
import { md } from "../../md";

export namespace CATheme {

    export namespace CAThemePrimitives {
        abstract class properties {
            constructor(
                public dp: number,
            ) { }

            public get px(): number { return md.ref.dp_to_px(this.dp); }
            public get rem(): number { return this.dp * 0.0625; }
        }

        /**
         * The corner radius for the container.
         */
        export class container_shape extends properties {
            constructor(
                dp: number = 0,
            ) { super(dp); }
        }

        /**
         * The height for the container.
         */
        export class container_height extends properties {
            constructor(
                dp: number = 64,
            ) { super(dp); }
        }

        /**
         * The size for the leading and the trailing icons.
         */
        export class leading_trailing_icon_size extends properties {
            constructor(
                dp: number = 24,
            ) { super(dp); }
        }

        /**
         * The corner radius for the avatar.
         */
        export class avatar_shape extends properties {
            constructor(
                dp: number = 15,
            ) { super(dp); }
        }

        /**
         * The size of the avatar.
         */
        export class avatar_size extends properties {
            constructor(
                dp: number = 30,
            ) { super(dp); }
        }

        /**
         * The size of the left and right padding.
         */
        export class left_right_padding extends properties {
            constructor(
                dp: number = 16,
            ) { super(dp); }
        }

        /**
         * The size of the padding between elements.
         */
        export class padding_between_elements extends properties {
            constructor(
                dp: number = 24,
            ) { super(dp); }
        }

        /**
         * The target size for touch screen events.
         */
        export class target_size {
            constructor(
                public dp: number[] = [48, 48],
            ) { }

            public get px(): number[] { return this.dp.map(e => md.ref.dp_to_px(e)); }
            public get rem(): number[] { return this.dp.map(e => e * 0.0625); }
        }
    }

    export namespace properties {
        export let container_shape = new CAThemePrimitives.container_shape();
        export let container_height = new CAThemePrimitives.container_height();
        export let leading_trailing_icon_size = new CAThemePrimitives.leading_trailing_icon_size();
        export let avatar_shape = new CAThemePrimitives.avatar_shape();
        export let avatar_size = new CAThemePrimitives.avatar_size();
        export let left_right_padding = new CAThemePrimitives.left_right_padding();
        export let padding_between_elements = new CAThemePrimitives.padding_between_elements();
        export let target_size = new CAThemePrimitives.target_size();
    }
}

export interface CenterAlignedThemeProps {
    container_theme?: CAContainerTheme;
    headline_theme?: CAHeadlineTheme;
    leading_navigation_icon_theme?: CALeadingNavigationIconTheme;
    trailing_icon_theme?: CATrailingIconTheme;
}

export class CenterAlignedTheme {
    constructor(
        public container_theme: CAContainerTheme = new CAContainerTheme(),
        public headline_theme: CAHeadlineTheme = new CAHeadlineTheme(),
        public leading_navigation_icon_theme: CALeadingNavigationIconTheme = new CALeadingNavigationIconTheme(),
        public trailing_icon_theme: CATrailingIconTheme = new CATrailingIconTheme(),
    ) { }

    static copyWith(theme: CenterAlignedThemeProps): CenterAlignedTheme {
        return new CenterAlignedTheme(theme.container_theme, theme.headline_theme, theme.leading_navigation_icon_theme, theme.trailing_icon_theme);
    }
}

export interface CAContainerThemeProps {
    color?: DynamicColor;
    elevation?: md.sys.elevation;
    elevation_on_scroll?: md.sys.elevation;
    z_index?: number;
}

export class CAContainerTheme implements md.ref.css {
    private _z_index: number;

    constructor(
        public color: DynamicColor = md.sys.color.surface,
        public elevation: md.sys.elevation = md.sys.elevation.level4,
        public elevation_on_scroll: md.sys.elevation = md.sys.elevation.level4,
        z_index?: number
    ) {
        if (typeof z_index === 'number') {
            this._z_index = z_index;
        } else {
            this._z_index = md.sys.elevation.level4;
        }
    }

    public get z_index(): number { return this._z_index; }

    static withFlatRestingElevation(): CAContainerTheme {
        return new CAContainerTheme(md.sys.color.surface, md.sys.elevation.level0, md.sys.elevation.level4);
    }

    static withNoElevation(): CAContainerTheme {
        return new CAContainerTheme(md.sys.color.surface, md.sys.elevation.level0, md.sys.elevation.level0);
    }

    static copyWith(theme: CAContainerThemeProps): CAContainerTheme {
        return new CAContainerTheme(theme.color, theme.elevation, theme.elevation_on_scroll, theme.z_index);
    }

    public get css_vars(): md.ref.css_var {
        return {
            '--ca-container-color-light': this.color.light.hex,
            '--ca-container-color-dark': this.color.dark.hex,
            '--ca-container-elevation-light': md.ref.elevation.css(this.elevation).light,
            '--ca-container-elevation-dark': md.ref.elevation.css(this.elevation).dark,
            '--ca-container-elevation-on-scroll-light': md.ref.elevation.css(this.elevation_on_scroll).light,
            '--ca-container-elevation-on-scroll-dark': md.ref.elevation.css(this.elevation_on_scroll).dark,
            '--ca-container-z-index': this.z_index.toString(),

            // Properties
            '--ca-container-height': md.ref.dp_to_rem_string(CATheme.properties.container_height.dp),
            '--ca-container-shape': md.ref.dp_to_rem_string(CATheme.properties.container_shape.dp),
        }
    }

    public get inline_css(): string {
        return md.ref.generate_style(this.css_vars);
    }
}

export interface CAHeadlineThemeProps {
    color?: DynamicColor;
    text_style?: md.sys.typescale;
}

export class CAHeadlineTheme implements md.ref.css {
    constructor(
        public color: DynamicColor = md.sys.color.on_surface,
        public font: string = md.sys.typescale.title_large.font,
        public line_height: number = md.sys.typescale.title_large.line_height,
        public size: number = md.sys.typescale.title_large.size,
        public tracking: number = md.sys.typescale.title_large.tracking,
        public weight: number = md.sys.typescale.title_large.weight,
    ) { }

    public get css_style(): string {
        let font_family: string = `font-family: ${this.font};`;
        let line_height: string = `line-height: ${this.line_height * 0.0625}rem;`;
        let font_size: string = `font-size: ${this.size * 0.0625}rem;`;
        let letter_spacing: string = `letter-spacing: ${this.tracking * 0.0625}rem;`;
        let font_weight: string = `font-weight: ${this.weight};`;

        return font_family + line_height + font_size + letter_spacing + font_weight;
    }

    static copyWith(theme: CAHeadlineThemeProps): CAHeadlineTheme {
        return new CAHeadlineTheme(theme.color, theme.text_style?.font, theme.text_style?.line_height, theme.text_style?.size, theme.text_style?.tracking, theme.text_style?.weight);
    }

    public get css_vars(): md.ref.css_var {
        return {
            '--ca-headline-color-light': this.color.light.hex,
            '--ca-headline-color-dark': this.color.dark.hex,
            '--ca-headline-font': this.font,
            '--ca-headline-line-height': md.ref.dp_to_rem_string(this.line_height),
            '--ca-headline-size': md.ref.dp_to_rem_string(this.size),
            '--ca-headline-tracking': md.ref.dp_to_rem_string(this.tracking),
            '--ca-headline-weight': this.weight.toString(),
        }
    }

    public get inline_css(): string {
        return md.ref.generate_style(this.css_vars);
    }
}

export interface CAColor {
    color?: DynamicColor;
}

export class CALeadingNavigationIconTheme implements md.ref.css {
    constructor(
        public color: DynamicColor = md.sys.color.on_surface,
    ) { }

    static copyWith(theme: CAColor): CALeadingNavigationIconTheme {
        return new CALeadingNavigationIconTheme(theme.color);
    }

    public get css_vars(): md.ref.css_var {
        return {
            '--ca-leading-navigation-icon-color-light': this.color.light.hex,
            '--ca-leading-navigation-icon-color-dark': this.color.dark.hex,
        }
    }

    public get inline_css(): string {
        return md.ref.generate_style(this.css_vars);
    }
}

export class CATrailingIconTheme implements md.ref.css {
    constructor(
        public color: DynamicColor = md.sys.color.on_surface_variant,
    ) { }

    static copyWith(theme: CAColor): CATrailingIconTheme {
        return new CATrailingIconTheme(theme.color);
    }

    public get css_vars(): md.ref.css_var {
        return {
            '--ca-trailing-icon-color-dark': this.color.dark.hex,
            '--ca-trailing-icon-color-light': this.color.light.hex,
        }
    }

    public get inline_css(): string {
        return md.ref.generate_style(this.css_vars);
    }
}