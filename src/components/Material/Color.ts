export interface DynamicColorProps {
    light: Color,
    dark: Color,
}

export class Color {
    static isHex(h: string): boolean {
        return typeof h === 'string'
            && h.length === 6
            && !isNaN(Number('0x' + h))
    }

    private _color: number;

    private constructor(color: number) {
        this._color = color;
    }

    static fromHex(color: string): Color {
        if (Color.isHex(color)) {
            return new Color(parseInt(color, 16));
        } else {
            throw new Error('The input is not a valid hexadecimal color.');
        }
    }

    static dynamic(props: DynamicColorProps): DynamicColor {
        return new DynamicColor(props.light, props.dark);
    }

    static shadeColor(color: string | Color, percent: number): Color {
        let _color = typeof color === 'string' ? color : color.color;

        let R = parseInt(_color.substring(0, 2), 16);
        let G = parseInt(_color.substring(2, 4), 16);
        let B = parseInt(_color.substring(4, 6), 16);

        R = Math.abs(Math.round(R * (100 + percent) / 100));
        G = Math.abs(Math.round(G * (100 + percent) / 100));
        B = Math.abs(Math.round(B * (100 + percent) / 100));

        R = (R < 255) ? R : 255;
        G = (G < 255) ? G : 255;
        B = (B < 255) ? B : 255;

        let RR = R.toString(16).padStart(2, "0");
        let GG = G.toString(16).padStart(2, "0");
        let BB = B.toString(16).padStart(2, "0");

        return Color.fromHex(RR + GG + BB);
    }

    public get color(): string {
        let b = this._color.toString(16);

        while (b.length < 6) {
            b += '0';
        }

        return b;
    }

    public get hex(): string {
        return '#' + this.color;
    }
}

export class DynamicColor {
    constructor(
        public light: Color,
        public dark: Color,
    ) { }
}