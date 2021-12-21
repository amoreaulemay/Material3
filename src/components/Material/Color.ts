export class Color {
    static isHex(h: string): boolean {
        let a = parseInt(h.toLowerCase(), 16);

        let b = a.toString(16);

        while (b.length < 6) {
            b += '0';
        }

        return (b === h.toLowerCase());
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

    public get color(): string {
        let b = this._color.toString(16);

        while (b.length < 6) {
            b += '0';
        }

        return b;
    }
}

export class DynamicColor {
    constructor(
        public light: Color,
        public dark: Color,
    ) { }

    public get foreground_css_class(): string {
        return ` text-[#${this.light.color}] dark:text-[#${this.dark.color}] `;
    }

    public get background_css_class(): string {
        return ` bg-[#${this.light.color}] dark:text-[#${this.dark.color}] `;
    }
}