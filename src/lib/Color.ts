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

    /**
     * Transform the color to dynamic by making the light and dark mode the original color.
     * 
     * @param color The color to transform.
     * @returns A `DynamicColor`.
     */
    static toDynamic(color: Color): DynamicColor {
        return Color.dynamic({ light: color, dark: color });
    }

    /**
     * @deprecated
     * This function produces inconsistent results. Use `Color.colorToLuminance` instead.
     * 
     * @param color The hex color.
     * @param percent The percentage to modify the color.
     * @returns `Color`
     */
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

    static getContrastingShade(color: Color): Color {
        let hsl = Color.rgb.toHSL(color);
        let color_max_delta = Math.max(Math.abs(hsl.l - 1), Math.abs(0 - hsl.l));

        let resulting_luminance = 0;

        if (color_max_delta == Math.abs(hsl.l - 1)) {
            resulting_luminance = 1;
        }

        if (hsl.s < 0.5) {
            return Color.fromHSL({ h: 0, s: 0, l: resulting_luminance });
        } else {
            let newHue = mod(hsl.h + 180, 360);
            return Color.fromHSL({ h: newHue, s: 1, l: Math.min(resulting_luminance + 0.05, 1) });
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

    public get inverse(): Color {
        let rgb = this.rgb;
        let new_rgb: RGB = {
            r: 255 - rgb.r,
            g: 255 - rgb.g,
            b: 255 - rgb.b,
        }

        return Color.fromRGB(new_rgb);
    }

    public shade(luminance: number): Color {
        if (!(0 <= luminance && luminance <= 1)) {
            throw new Error('Invalid luminance value.');
        }

        return Color.colorToLuminance(this, luminance);
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

export interface DynamicColorLuminances {
    light_luminance: number;
    dark_luminance: number;
}

export class DynamicColor {
    constructor(
        public light: Color,
        public dark: Color,
    ) { }

    public shade(luminance: number | DynamicColorLuminances): DynamicColor {
        if (typeof luminance === 'number') {
            return new DynamicColor(this.light.shade(luminance), this.dark.shade(luminance));
        } else {
            return new DynamicColor(this.light.shade(luminance.light_luminance), this.dark.shade(luminance.dark_luminance));
        }
    }
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

    // Color palettes
    export const pink = Color.getPalette(Color.fromHex('E91E63'));
    export const pinkAccent = Color.getPalette(Color.fromHex('FF4081'));
    export const red = Color.getPalette(Color.fromHex('F44336'));
    export const redAccent = Color.getPalette(Color.fromHex('FF1744'));
    export const deepOrange = Color.getPalette(Color.fromHex('FF5722'));
    export const deepOrangeAccent = Color.getPalette(Color.fromHex('FF3D00'));
    export const orange = Color.getPalette(Color.fromHex('FF9800'));
    export const orangeAccent = Color.getPalette(Color.fromHex('FF9100'));
    export const amber = Color.getPalette(Color.fromHex('FFC107'));
    export const amberAccent = Color.getPalette(Color.fromHex('FFD740'));
    export const yellow = Color.getPalette(Color.fromHex('FFEB3B'));
    export const yellowAccent = Color.getPalette(Color.fromHex('FFFF00'));
    export const lime = Color.getPalette(Color.fromHex('CDDC39'));
    export const limeAccent = Color.getPalette(Color.fromHex('EEFF41'));
    export const lightGreen = Color.getPalette(Color.fromHex('8BC34A'));
    export const lightGreenAccent = Color.getPalette(Color.fromHex('B2FF59'));
    export const green = Color.getPalette(Color.fromHex('4CAF50'));
    export const greenAccent = Color.getPalette(Color.fromHex('69F0AE'));
    export const teal = Color.getPalette(Color.fromHex('009688'));
    export const tealAccent = Color.getPalette(Color.fromHex('64FFDA'));
    export const cyan = Color.getPalette(Color.fromHex('00BCD4'));
    export const cyanAccent = Color.getPalette(Color.fromHex('18FFFF'));
    export const lightBlue = Color.getPalette(Color.fromHex('03A9F4'));
    export const lightBlueAccent = Color.getPalette(Color.fromHex('40C4FF'));
    export const blue = Color.getPalette(Color.fromHex('2196F3'));
    export const blueAccent = Color.getPalette(Color.fromHex('448AFF'));
    export const indigo = Color.getPalette(Color.fromHex('3F51B5'));
    export const indigoAccent = Color.getPalette(Color.fromHex('536DFE'));
    export const purple = Color.getPalette(Color.fromHex('9C27B0'));
    export const purpleAccent = Color.getPalette(Color.fromHex('E040FB'));
    export const deepPurple = Color.getPalette(Color.fromHex('673AB7'));
    export const deepPurpleAccent = Color.getPalette(Color.fromHex('654FFF'));
    export const blueGrey = Color.getPalette(Color.fromHex('607D8B'));
    export const brown = Color.getPalette(Color.fromHex('795548'));
    export const grey = Color.getPalette(Color.fromHex('9E9E9E'));

    export namespace dynamic {
        // Pure colors - Not really dynamic...
        export const pure_black = new DynamicColor(Colors.black, Colors.black);
        export const pure_white = new DynamicColor(Colors.white, Colors.white);

        // True dynamic colors
        export const black_and_white = new DynamicColor(Colors.black, Colors.white);
    }
}

export namespace Palette {
    export const grays = Color.getPalette(Colors.middle_gray);
}