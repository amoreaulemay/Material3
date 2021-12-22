export interface DynamicColorProps {
    light: Color,
    dark: Color,
}

export interface RGB {
    r: number,
    g: number,
    b: number,
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

    public get color(): string {
        let [RR, GG, BB] = Color.rgb.toString([this._r, this._g, this._b]);
        return RR + GG + BB;
    }

    public get hex(): string {
        return '#' + this.color;
    }

    public get rgb(): RGB {
        return {
            r: this._r,
            g: this._g,
            b: this._b,
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
    }
}

export class DynamicColor {
    constructor(
        public light: Color,
        public dark: Color,
    ) { }
}