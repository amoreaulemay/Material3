import { Colors, DynamicColor } from "./Color";
import { md } from "./md";
import { staticImplements } from "./StaticImplements";

export enum TextAlign {
    center,
    left,
    right,
    justify,
    initial,
    inherit,
}

export interface TextStyleProps {
    color?: DynamicColor;
    align?: TextAlign;
    typescale?: TypescaleProps | md.sys.typescale;
}

export interface TypescaleProps {
    font?: string;
    line_height?: number;
    size?: number;
    tracking?: number;
    weight?: number;
}

@staticImplements<md.ref.copy<TextStyleProps, TextStyle>>()
export class TextStyle implements md.ref.css {
    constructor(
        public color: DynamicColor = md.sys.color.primary,
        public align: TextAlign = TextAlign.center,
        public typescale: md.sys.typescale = md.sys.typescale.body_medium,
    ) { }

    public get css_vars(): md.ref.css_var {
        return {
            // Color
            '--text-style-color-light': this.color.light.hex,
            '--text-style-color-dark': this.color.dark.hex,

            // Align
            '--text-style-align': TextAlign[this.align],

            // Typescale
            '--text-style-font': this.typescale.font,
            '--text-style-line-height': md.ref.dp_to_rem_string(this.typescale.line_height),
            '--text-style-size': md.ref.dp_to_rem_string(this.typescale.size),
            '--text-style-tracking': md.ref.dp_to_rem_string(this.typescale.tracking),
            '--text-style-weight': this.typescale.weight.toString(),
        }
    }

    public get inline_css(): string {
        return md.ref.generate_style(this.css_vars);
    }

    static copyWith(props: TextStyleProps): TextStyle {
        return new TextStyle(
            props.color,
            props.align,
            new md.sys.typescale_primitives.custom_text_style(
                props.typescale?.font ?? md.sys.typescale.body_medium.font,
                props.typescale?.line_height ?? md.sys.typescale.body_medium.line_height,
                props.typescale?.size ?? md.sys.typescale.body_medium.size,
                props.typescale?.tracking ?? md.sys.typescale.body_medium.tracking,
                props.typescale?.weight ?? md.sys.typescale.body_medium.weight
            ),
        );
    }

    static dynamic = class {
        static monochrome(props?: TextStyleProps): TextStyle {
            return TextStyle.copyWith({
                color: Colors.dynamic.black_and_white,
                align: props?.align,
                typescale: props?.typescale,
            });
        }
    }
}