import { mod } from "./Math";
import { md } from "./md";

export interface DynamicColorProps {
    light: Color,
    dark: Color,
}

export interface RGB {
    r: number,
    g: number,
    b: number,
}

export interface HSL {
    h: number,
    s: number,
    l: number,
}

export interface ColorPalette {
    color0: Color;
    color10: Color;
    color20: Color;
    color30: Color;
    color40: Color;
    color50: Color;
    color60: Color;
    color70: Color;
    color80: Color;
    color90: Color;
    color95: Color;
    color99: Color;
    color100: Color;
}

export class Color {
    static isHex(h: string): boolean {
        return typeof h === 'string'
            && h.length === 6
            && !isNaN(Number('0x' + h))
    }

    private _r: number;
    private _g: number;
    private _b: number;

    private constructor(color: string) {
        [this._r, this._g, this._b] = Color.rgb.separate_components(color);
    }

    static fromHex(color: string): Color {
        if (Color.isHex(color)) {
            return new Color(color);
        } else {
            throw new Error('The input is not a valid hexadecimal color.');
        }
    }

    static fromRGB(color: RGB): Color {
        let hex = Color.rgb.toString([color.r, color.g, color.b]) as [string, string, string];
        return new Color(hex.join(''));
    }

    static fromHSL(color: HSL): Color {
        let rgb = Color.hsl.toRGB(color);
        return Color.fromRGB(rgb);
    }

    static dynamic(props: DynamicColorProps): DynamicColor {
        return new DynamicColor(props.light, props.dark);
    }

    static shadeColor(color: string | Color, percent: number): Color {
        let _color = typeof color === 'string' ? color : color.color;

        let [R, G, B] = Color.rgb.separate_components(_color)

        R = Math.round(R * (100 + percent) / 100);
        G = Math.round(G * (100 + percent) / 100);
        B = Math.round(B * (100 + percent) / 100);

        let [RR, GG, BB] = Color.rgb.toString([R, G, B]);

        return Color.fromHex(RR + GG + BB);
    }

    static colorToLuminance(color: Color, new_luminance: number): Color {
        let hsl = Color.rgb.toHSL(color);

        hsl.l = new_luminance;

        return Color.fromHSL(hsl);
    }

    static getPalette(base_color: Color): ColorPalette {
        return {
            color0: Color.fromRGB({ r: 0, g: 0, b: 0 }),
            color10: Color.colorToLuminance(base_color, 0.1),
            color20: Color.colorToLuminance(base_color, 0.2),
            color30: Color.colorToLuminance(base_color, 0.3),
            color40: Color.colorToLuminance(base_color, 0.4),
            color50: Color.colorToLuminance(base_color, 0.5),
            color60: Color.colorToLuminance(base_color, 0.6),
            color70: Color.colorToLuminance(base_color, 0.7),
            color80: Color.colorToLuminance(base_color, 0.8),
            color90: Color.colorToLuminance(base_color, 0.9),
            color95: Color.colorToLuminance(base_color, 0.95),
            color99: Color.colorToLuminance(base_color, 0.99),
            color100: Color.fromRGB({ r: 255, g: 255, b: 255 }),
        }
    }

    public get color(): string {
        let [RR, GG, BB] = Color.rgb.toString([this._r, this._g, this._b]);
        return RR + GG + BB;
    }

    public get hex(): string {
        return '#' + this.color;
    }

    public get luminance(): number {
        let Cmax = Math.max(this._r, this._g, this._b);
        let Cmin = Math.min(this._r, this._g, this._b);

        return (Cmax + Cmin) / 510;
    }

    public get rgb(): RGB {
        return {
            r: this._r,
            g: this._g,
            b: this._b,
        }
    }

    static hsl = class {
        static toRGB(color: HSL): RGB {
            if (0 <= color.h && color.h < 360 && 0 <= color.l && color.l <= 1) {
                const c = (1 - Math.abs(2 * color.l - 1)) * color.s;
                const x = c * (1 - Math.abs(mod(color.h / 60, 2) - 1));
                const m = color.l - c / 2;

                let [r_prime, g_prime, b_prime] = [0, 0, 0];

                if (0 <= color.h && color.h < 60) {
                    [r_prime, g_prime, b_prime] = [c, x, 0];
                } else if (60 <= color.h && color.h < 120) {
                    [r_prime, g_prime, b_prime] = [x, c, 0];
                } else if (120 <= color.h && color.h < 180) {
                    [r_prime, g_prime, b_prime] = [0, c, x];
                } else if (180 <= color.h && color.h < 240) {
                    [r_prime, g_prime, b_prime] = [0, x, c];
                } else if (240 <= color.h && color.h < 300) {
                    [r_prime, g_prime, b_prime] = [x, 0, c];
                } else if (300 <= color.h && color.h < 360) {
                    [r_prime, g_prime, b_prime] = [c, 0, x];
                }

                let [r, g, b] = [Math.round((r_prime + m) * 255), Math.round((g_prime + m) * 255), Math.round((b_prime + m) * 255)];

                return {
                    r: r,
                    g: g,
                    b: b,
                }
            } else {
                throw new Error(`Invalid HSL values. h: ${color.h}, s: ${color.s}, l: ${color.l}`);
            }
        }
    }

    static rgb = class {
        static fixRGB(v: number | [number, number, number]): number | [number, number, number] {
            if (typeof v === 'number') {
                let a = (v > 0) ? v : 0; a = (v < 255) ? v : 255;
                return a;
            } else if (v instanceof Array) {
                return [Color.rgb.fixRGB(v[0]) as number, Color.rgb.fixRGB(v[1]) as number, Color.rgb.fixRGB(v[2]) as number];
            } else {
                throw new Error('Invalid input.');
            }
        }

        static toString(v: number | [number, number, number]): string | [string, string, string] {
            if (typeof v === 'number') {
                let fixed = Color.rgb.fixRGB(v) as number;
                return fixed.toString(16).padStart(2, '0');
            } else {
                let [R, G, B] = v;
                let [RR, GG, BB] = [Color.rgb.toString(R) as string, Color.rgb.toString(G) as string, Color.rgb.toString(B) as string];

                return [RR, GG, BB];
            }
        }

        static separate_components(hex: string): [number, number, number] {
            if (Color.isHex(hex)) {
                return [parseInt(hex.substring(0, 2), 16), parseInt(hex.substring(2, 4), 16), parseInt(hex.substring(4, 6), 16)]
            } else {
                throw new Error('Color is not hex');
            }
        }

        static toHSL(color: Color): HSL {
            const r_prime = color.rgb.r / 255;
            const g_prime = color.rgb.g / 255;
            const b_prime = color.rgb.b / 255;

            const c_max = Math.max(r_prime, g_prime, b_prime);
            const c_min = Math.min(r_prime, g_prime, b_prime);

            const delta = c_max - c_min;

            let hue: number = 0;
            let saturation: number = 0;
            let lightness: number = (c_max + c_min) / 2;

            // hue calculation
            if (delta == 0) {
                hue = 0;
            } else if (c_max == r_prime) {
                hue = 60 * (mod((g_prime - b_prime) / delta, 6));
            } else if (c_max == g_prime) {
                hue = 60 * ((b_prime - r_prime) / delta + 2);
            } else if (c_max == b_prime) {
                hue = 60 * ((r_prime - g_prime) / delta + 4);
            }

            // saturation calculation
            if (delta == 0) {
                saturation = 0;
            } else if (delta != 0) {
                saturation = delta / (1 - Math.abs(2 * lightness - 1))
            }

            return {
                h: hue,
                s: saturation,
                l: lightness,
            }
        }
    }
}

export class DynamicColor {
    constructor(
        public light: Color,
        public dark: Color,
    ) { }
}

export interface PaletteProps {
    primary?: Color;
    secondary?: Color;
    tertiary?: Color;
    error?: Color;
    neutral?: Color;
    neutral_variant?: Color;
}

export interface PaletteColors {
    readonly primary: DynamicColor;
    readonly primary_container: DynamicColor;
    readonly secondary: DynamicColor;
    readonly secondary_container: DynamicColor;
    readonly tertiary: DynamicColor;
    readonly tertiary_container: DynamicColor;
    readonly surface: DynamicColor;
    readonly surface_variant: DynamicColor;
    readonly background: DynamicColor;
    readonly error: DynamicColor;
    readonly error_container: DynamicColor;
    readonly on_primary: DynamicColor;
    readonly on_primary_container: DynamicColor;
    readonly on_secondary: DynamicColor;
    readonly on_secondary_container: DynamicColor;
    readonly on_tertiary: DynamicColor;
    readonly on_tertiary_container: DynamicColor;
    readonly on_surface: DynamicColor;
    readonly on_surface_variant: DynamicColor;
    readonly on_error: DynamicColor;
    readonly on_error_container: DynamicColor;
    readonly on_background: DynamicColor;
    readonly outline: DynamicColor;
    readonly shadow: DynamicColor;
    readonly inverse_surface: DynamicColor;
    readonly inverse_on_surface: DynamicColor;
    readonly inverse_primary: DynamicColor;
}

export class Palette {
    constructor(
        public primary: ColorPalette = Color.getPalette(md.ref.palette.primary40),
        public secondary: ColorPalette = Color.getPalette(md.ref.palette.secondary40),
        public tertiary: ColorPalette = Color.getPalette(md.ref.palette.tertiary40),
        public error: ColorPalette = Color.getPalette(md.ref.palette.error40),
        public neutral: ColorPalette = Color.getPalette(md.ref.palette.neutral20),
        public neutral_variant: ColorPalette = Color.getPalette(md.ref.palette.neutral_variant50),
    ) { }

    public get colors(): PaletteColors {
        return {
            primary: Color.dynamic({
                light: this.primary.color40,
                dark: this.primary.color80,
            }),
            primary_container: Color.dynamic({
                light: this.primary.color90,
                dark: this.primary.color30,
            }),
            secondary: Color.dynamic({
                light: this.secondary.color40,
                dark: this.secondary.color80,
            }),
            secondary_container: Color.dynamic({
                light: this.secondary.color90,
                dark: this.secondary.color30,
            }),
            tertiary: Color.dynamic({
                light: this.tertiary.color40,
                dark: this.tertiary.color80,
            }),
            tertiary_container: Color.dynamic({
                light: this.tertiary.color90,
                dark: this.tertiary.color30,
            }),
            surface: Color.dynamic({
                light: this.neutral.color99,
                dark: this.neutral.color10,
            }),
            surface_variant: Color.dynamic({
                light: this.neutral_variant.color90,
                dark: this.neutral_variant.color30,
            }),
            background: Color.dynamic({
                light: this.neutral.color99,
                dark: this.neutral.color10,
            }),
            error: Color.dynamic({
                light: this.error.color40,
                dark: this.error.color80,
            }),
            error_container: Color.dynamic({
                light: this.error.color90,
                dark: this.error.color30,
            }),
            on_primary: Color.dynamic({
                light: this.primary.color100,
                dark: this.primary.color20,
            }),
            on_primary_container: Color.dynamic({
                light: this.primary.color10,
                dark: this.primary.color90,
            }),
            on_secondary: Color.dynamic({
                light: this.secondary.color100,
                dark: this.secondary.color20,
            }),
            on_secondary_container: Color.dynamic({
                light: this.secondary.color10,
                dark: this.secondary.color90,
            }),
            on_tertiary: Color.dynamic({
                light: this.tertiary.color100,
                dark: this.tertiary.color20,
            }),
            on_tertiary_container: Color.dynamic({
                light: this.tertiary.color10,
                dark: this.tertiary.color90,
            }),
            on_surface: Color.dynamic({
                light: this.neutral.color10,
                dark: this.neutral.color90,
            }),
            on_surface_variant: Color.dynamic({
                light: this.neutral_variant.color30,
                dark: this.neutral_variant.color80,
            }),
            on_error: Color.dynamic({
                light: this.error.color100,
                dark: this.error.color20,
            }),
            on_error_container: Color.dynamic({
                light: this.error.color10,
                dark: this.error.color80,
            }),
            on_background: Color.dynamic({
                light: this.neutral.color10,
                dark: this.neutral.color90,
            }),
            outline: Color.dynamic({
                light: this.neutral_variant.color50,
                dark: this.neutral_variant.color60,
            }),
            shadow: Color.dynamic({
                light: this.neutral.color0,
                dark: this.neutral.color0,
            }),
            inverse_surface: Color.dynamic({
                light: this.neutral.color20,
                dark: this.neutral.color90,
            }),
            inverse_on_surface: Color.dynamic({
                light: this.neutral.color95,
                dark: this.neutral.color20,
            }),
            inverse_primary: Color.dynamic({
                light: this.primary.color80,
                dark: this.primary.color40,
            }),
        }
    }

    static copyWith(colors: PaletteProps): Palette {
        return new Palette(
            typeof colors.primary !== 'undefined' ? Color.getPalette(colors.primary) : undefined,
            typeof colors.secondary !== 'undefined' ? Color.getPalette(colors.secondary) : undefined,
            typeof colors.tertiary !== 'undefined' ? Color.getPalette(colors.tertiary) : undefined,
            typeof colors.error !== 'undefined' ? Color.getPalette(colors.error) : undefined,
            typeof colors.neutral !== 'undefined' ? Color.getPalette(colors.neutral) : undefined,
            typeof colors.neutral_variant !== 'undefined' ? Color.getPalette(colors.neutral_variant) : undefined,
        );
    }
}

/**
 * Utility namespace for commonly used colors.
 */
export namespace Colors {
    export const black = Color.fromHex('000000');
    export const middle_gray = Color.fromHex('7F7F7F');
    export const white = Color.fromHex('FFFFFF');

    export namespace dynamic {
        // Pure colors - Not really dynamic...
        export const pure_black = new DynamicColor(Colors.black, Colors.black);
        export const pure_white = new DynamicColor(Colors.white, Colors.white);

        // True dynamic colors
        export const black_and_white = new DynamicColor(Colors.white, Colors.black);
    }
}

export namespace Palette {
    export const grays = Color.getPalette(Colors.middle_gray);
}