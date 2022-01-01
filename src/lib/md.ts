// import { Color, DynamicColor } from "./Color"
import { MainAxisAlignment, Color, DynamicColor, CrossAxisAlignment } from "./lib";

export namespace md {
    export namespace ref {
        export namespace alignment {
            export function generate_main_style(alignment: MainAxisAlignment): string {
                return md.ref.generate_style({
                    '--main-axis-alignment': alignment,
                });
            }

            export function generate_cross_style(alignment: CrossAxisAlignment): string {
                return md.ref.generate_style({
                    '--cross-axis-alignment': alignment,
                });
            }
        }

        export interface copy<T, U> {
            copyWith(theme: T): U;
        }

        export interface css_var {
            [Key: string]: string;
        }

        export interface css {
            readonly css_vars: css_var;
            readonly inline_css: string;
        }

        export function dp_to_px(input: number): number {
            return Math.round(input * window.devicePixelRatio);
        }

        export function dp_to_rem_string(value: number): string {
            return value * 0.0625 + 'rem';
        }

        export namespace elevation {
            export interface css_style {
                light: string;
                dark: string;
            }

            export function css(elevation: md.sys.elevation, color?: DynamicColor, opacity?: number): css_style {
                let rem_value = elevation * 0.0625;

                if (typeof opacity === 'undefined' || !(0 <= opacity && opacity <= 1)) {
                    return {
                        light: `0rem 0rem ${rem_value}rem ${color?.light.hex ?? md.sys.color.shadow.light.hex}`,
                        dark: `0rem 0rem ${rem_value}rem ${color?.dark.hex ?? md.sys.color.shadow.dark.hex}`,
                    }
                } else {
                    let rgb_l = color?.light.rgb ?? md.sys.color.shadow.light.rgb;
                    let rgb_d = color?.dark.rgb ?? md.sys.color.shadow.dark.rgb;

                    let rgba_light = `rgba(${rgb_l.r}, ${rgb_l.g}, ${rgb_l.b}, ${opacity})`;
                    let rgba_dark = `rgba(${rgb_d.r}, ${rgb_d.g}, ${rgb_d.b}, ${opacity})`;

                    return {
                        light: `0rem 0rem ${rem_value}rem ${rgba_light}`,
                        dark: `0rem 0rem ${rem_value}rem ${rgba_dark}`,
                    }
                }


            }
        }

        export function generate_style(...css_vars: css_var[]): string {
            let render: string = '';

            css_vars.forEach((css_var) => {
                for (let key in css_var) {
                    render += key + ':' + css_var[key] + ';';
                }
            });

            return render;
        }

        export namespace palette {
            export let error10 = Color.fromHex('370B1E');
            export let error20 = Color.fromHex('601410');
            export let error30 = Color.fromHex('8C1D18');
            export let error40 = Color.fromHex('B3261E');
            export let error80 = Color.fromHex('F2B8B5');
            export let error90 = Color.fromHex('F9DEDC');
            export let error100 = Color.fromHex('FFFFFF');

            export let neutral0 = Color.fromHex('000000');
            export let neutral10 = Color.fromHex('1C1B1F');
            export let neutral20 = Color.fromHex('313033');
            export let neutral90 = Color.fromHex('E6E1E5');
            export let neutral95 = Color.fromHex('F4EFF4');
            export let neutral99 = Color.fromHex('FFFBFE');

            export let neutral_variant30 = Color.fromHex('49454F');
            export let neutral_variant50 = Color.fromHex('79747E');
            export let neutral_variant60 = Color.fromHex('938F99');
            export let neutral_variant80 = Color.fromHex('CAC4D0');
            export let neutral_variant90 = Color.fromHex('E7E0EC');

            export let primary10 = Color.fromHex('21005E');
            export let primary20 = Color.fromHex('371E73');
            export let primary30 = Color.fromHex('4F378B');
            export let primary40 = Color.fromHex('6750A4');
            export let primary80 = Color.fromHex('D0BCFF');
            export let primary90 = Color.fromHex('EADDFF');
            export let primary100 = Color.fromHex('FFFFFF');

            export let secondary10 = Color.fromHex('1E192B');
            export let secondary20 = Color.fromHex('332D41');
            export let secondary30 = Color.fromHex('4A4458');
            export let secondary40 = Color.fromHex('625B71');
            export let secondary80 = Color.fromHex('CCC2DC');
            export let secondary90 = Color.fromHex('E8DEF8');
            export let secondary100 = Color.fromHex('FFFFFF');

            export let tertiary10 = Color.fromHex('370B1E');
            export let tertiary20 = Color.fromHex('492532');
            export let tertiary30 = Color.fromHex('633B48');
            export let tertiary40 = Color.fromHex('7D5260');
            export let tertiary80 = Color.fromHex('EFB8C8');
            export let tertiary90 = Color.fromHex('FFD8E4');
            export let tertiary100 = Color.fromHex('FFFFFF');
        }

        export class typescale {
            static brand_regular: string = '\'Roboto\', sans-serif';
            static plain_medium: string = '\'Roboto\', sans-serif';

            static weight_regular: number = 400;
            static weight_medium: number = 500;
        }

        export enum units { dp, px, rem }
    }

    export namespace sys {
        export namespace color_primitives {
            export class primary extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.primary40,
                    public dark: Color = md.ref.palette.primary80,
                ) { super(light, dark); }
            }

            export class primary_container extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.primary90,
                    public dark: Color = md.ref.palette.primary30,
                ) { super(light, dark); }
            }

            export class secondary extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.secondary40,
                    public dark: Color = md.ref.palette.secondary80,
                ) { super(light, dark); }
            }

            export class secondary_container extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.secondary90,
                    public dark: Color = md.ref.palette.secondary30,
                ) { super(light, dark); }
            }

            export class tertiary extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.tertiary40,
                    public dark: Color = md.ref.palette.tertiary80,
                ) { super(light, dark); }
            }

            export class tertiary_container extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.tertiary90,
                    public dark: Color = md.ref.palette.tertiary30,
                ) { super(light, dark); }
            }

            export class surface extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.neutral99,
                    public dark: Color = md.ref.palette.neutral10,
                ) { super(light, dark); }
            }

            export class surface_variant extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.neutral_variant90,
                    public dark: Color = md.ref.palette.neutral_variant30,
                ) { super(light, dark); }
            }

            export class background extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.neutral99,
                    public dark: Color = md.ref.palette.neutral10,
                ) { super(light, dark); }
            }

            export class error extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.error40,
                    public dark: Color = md.ref.palette.error80,
                ) { super(light, dark); }
            }

            export class error_container extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.error90,
                    public dark: Color = md.ref.palette.error30,
                ) { super(light, dark); }
            }

            export class on_primary extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.primary100,
                    public dark: Color = md.ref.palette.primary20,
                ) { super(light, dark); }
            }

            export class on_primary_container extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.primary10,
                    public dark: Color = md.ref.palette.primary90,
                ) { super(light, dark); }
            }

            export class on_secondary extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.secondary100,
                    public dark: Color = md.ref.palette.secondary20,
                ) { super(light, dark); }
            }

            export class on_secondary_container extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.secondary10,
                    public dark: Color = md.ref.palette.secondary90,
                ) { super(light, dark); }
            }

            export class on_tertiary extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.tertiary100,
                    public dark: Color = md.ref.palette.tertiary20,
                ) { super(light, dark); }
            }

            export class on_tertiary_container extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.tertiary10,
                    public dark: Color = md.ref.palette.tertiary90,
                ) { super(light, dark); }
            }

            export class on_surface extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.neutral10,
                    public dark: Color = md.ref.palette.neutral90,
                ) { super(light, dark); }
            }

            export class on_surface_variant extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.neutral_variant30,
                    public dark: Color = md.ref.palette.neutral_variant80,
                ) { super(light, dark); }
            }

            export class on_error extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.error100,
                    public dark: Color = md.ref.palette.error20,
                ) { super(light, dark); }
            }

            export class on_error_container extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.error10,
                    public dark: Color = md.ref.palette.error80,
                ) { super(light, dark); }
            }

            export class on_background extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.neutral10,
                    public dark: Color = md.ref.palette.neutral90,
                ) { super(light, dark); }
            }

            export class outline extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.neutral_variant50,
                    public dark: Color = md.ref.palette.neutral_variant60,
                ) { super(light, dark); }
            }

            export class shadow extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.neutral0,
                    public dark: Color = md.ref.palette.neutral0,
                ) { super(light, dark); }
            }

            export class inverse_surface extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.neutral20,
                    public dark: Color = md.ref.palette.neutral90,
                ) { super(light, dark); }
            }

            export class inverse_on_surface extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.neutral95,
                    public dark: Color = md.ref.palette.neutral20,
                ) { super(light, dark); }
            }

            export class inverse_primary extends DynamicColor {
                constructor(
                    public light: Color = md.ref.palette.primary80,
                    public dark: Color = md.ref.palette.primary40,
                ) { super(light, dark); }
            }
        }

        export namespace color {
            export let primary = new md.sys.color_primitives.primary();
            export let primary_container = new md.sys.color_primitives.primary_container();
            export let secondary = new md.sys.color_primitives.secondary();
            export let secondary_container = new md.sys.color_primitives.secondary_container();
            export let tertiary = new md.sys.color_primitives.tertiary();
            export let tertiary_container = new md.sys.color_primitives.tertiary_container();
            export let surface = new md.sys.color_primitives.surface();
            export let surface_variant = new md.sys.color_primitives.surface_variant();
            export let background = new md.sys.color_primitives.background();
            export let error = new md.sys.color_primitives.error();
            export let error_container = new md.sys.color_primitives.error_container();
            export let on_primary = new md.sys.color_primitives.on_primary();
            export let on_primary_container = new md.sys.color_primitives.on_primary_container();
            export let on_secondary = new md.sys.color_primitives.on_secondary();
            export let on_secondary_container = new md.sys.color_primitives.on_secondary_container();
            export let on_tertiary = new md.sys.color_primitives.on_tertiary();
            export let on_tertiary_container = new md.sys.color_primitives.on_tertiary_container();
            export let on_surface = new md.sys.color_primitives.on_surface();
            export let on_surface_variant = new md.sys.color_primitives.on_surface_variant();
            export let on_error = new md.sys.color_primitives.on_error();
            export let on_error_container = new md.sys.color_primitives.on_error_container();
            export let on_background = new md.sys.color_primitives.on_background();
            export let outline = new md.sys.color_primitives.outline();
            export let shadow = new md.sys.color_primitives.shadow();
            export let inverse_surface = new md.sys.color_primitives.inverse_surface();
            export let inverse_on_surface = new md.sys.color_primitives.inverse_on_surface();
            export let inverse_primary = new md.sys.color_primitives.inverse_primary();
        }

        export enum elevation {
            level0 = 0,
            level1,
            level2,
            level3,
            level4,
            level5,
            level6,
            level7,
            level8,
            level9,
            level10,
            level11,
            level12,
            level13,
            level14,
            level15,
            level16,
            level17,
            level18,
            level19,
            level20,
            level21,
            level22,
            level23,
            level24,
        }

        export namespace typescale_primitives {
            export interface typescale_props {
                font?: string;
                line_height?: number;
                size?: number;
                tracking?: number;
                weight?: number;
            }

            abstract class typescale_glob_functions {
                constructor(
                    public font: string,
                    public line_height: number,
                    public size: number,
                    public tracking: number,
                    public weight: number,
                ) { }

                public copyWith(props: md.sys.typescale_primitives.typescale_props): md.sys.typescale {
                    this.font = props.font ?? this.font;
                    this.line_height = props.line_height ?? this.line_height;
                    this.size = props.size ?? this.size;
                    this.tracking = props.tracking ?? this.tracking;
                    this.weight = props.weight ?? this.weight;

                    return new md.sys.typescale_primitives.custom_text_style(this.font, this.line_height, this.size, this.tracking, this.weight);
                }
            }

            export class display_large extends typescale_glob_functions {
                constructor(
                    font: string = md.ref.typescale.brand_regular,
                    line_height: number = 64,
                    size: number = 57,
                    tracking: number = 0,
                    weight: number = md.ref.typescale.weight_regular,
                ) { super(font, line_height, size, tracking, weight); }
            }

            export class display_medium extends typescale_glob_functions {
                constructor(
                    font: string = md.ref.typescale.brand_regular,
                    line_height: number = 52,
                    size: number = 45,
                    tracking: number = 0,
                    weight: number = md.ref.typescale.weight_regular,
                ) { super(font, line_height, size, tracking, weight); }
            }

            export class display_small extends typescale_glob_functions {
                constructor(
                    font: string = md.ref.typescale.brand_regular,
                    line_height: number = 44,
                    size: number = 36,
                    tracking: number = 0,
                    weight: number = md.ref.typescale.weight_regular,
                ) { super(font, line_height, size, tracking, weight); }
            }

            export class headline_large extends typescale_glob_functions {
                constructor(
                    font: string = md.ref.typescale.brand_regular,
                    line_height: number = 40,
                    size: number = 32,
                    tracking: number = 0,
                    weight: number = md.ref.typescale.weight_regular,
                ) { super(font, line_height, size, tracking, weight); }
            }

            export class headline_medium extends typescale_glob_functions {
                constructor(
                    font: string = md.ref.typescale.brand_regular,
                    line_height: number = 36,
                    size: number = 28,
                    tracking: number = 0,
                    weight: number = md.ref.typescale.weight_regular,
                ) { super(font, line_height, size, tracking, weight); }
            }

            export class headline_small extends typescale_glob_functions {
                constructor(
                    font: string = md.ref.typescale.brand_regular,
                    line_height: number = 32,
                    size: number = 24,
                    tracking: number = 0,
                    weight: number = md.ref.typescale.weight_regular,
                ) { super(font, line_height, size, tracking, weight); }
            }

            export class title_large extends typescale_glob_functions {
                constructor(
                    font: string = md.ref.typescale.brand_regular,
                    line_height: number = 28,
                    size: number = 22,
                    tracking: number = 0,
                    weight: number = md.ref.typescale.weight_regular,
                ) { super(font, line_height, size, tracking, weight); }
            }

            export class title_medium extends typescale_glob_functions {
                constructor(
                    font: string = md.ref.typescale.plain_medium,
                    line_height: number = 24,
                    size: number = 16,
                    tracking: number = 0.15,
                    weight: number = md.ref.typescale.weight_medium,
                ) { super(font, line_height, size, tracking, weight); }
            }

            export class title_small extends typescale_glob_functions {
                constructor(
                    font: string = md.ref.typescale.plain_medium,
                    line_height: number = 20,
                    size: number = 14,
                    tracking: number = 0.1,
                    weight: number = md.ref.typescale.weight_medium,
                ) { super(font, line_height, size, tracking, weight); }
            }

            export class label_large extends typescale_glob_functions {
                constructor(
                    font: string = md.ref.typescale.plain_medium,
                    line_height: number = 20,
                    size: number = 14,
                    tracking: number = 0.1,
                    weight: number = md.ref.typescale.weight_medium,
                ) { super(font, line_height, size, tracking, weight); }
            }

            export class label_medium extends typescale_glob_functions {
                constructor(
                    font: string = md.ref.typescale.plain_medium,
                    line_height: number = 16,
                    size: number = 12,
                    tracking: number = 0.5,
                    weight: number = md.ref.typescale.weight_medium,
                ) { super(font, line_height, size, tracking, weight); }
            }

            export class label_small extends typescale_glob_functions {
                constructor(
                    font: string = md.ref.typescale.plain_medium,
                    line_height: number = 6,
                    size: number = 11,
                    tracking: number = 0.5,
                    weight: number = md.ref.typescale.weight_medium,
                ) { super(font, line_height, size, tracking, weight); }
            }

            export class body_large extends typescale_glob_functions {
                constructor(
                    font: string = md.ref.typescale.plain_medium,
                    line_height: number = 24,
                    size: number = 16,
                    tracking: number = 0.15,
                    weight: number = md.ref.typescale.weight_medium,
                ) { super(font, line_height, size, tracking, weight); }
            }

            export class body_medium extends typescale_glob_functions {
                constructor(
                    font: string = md.ref.typescale.plain_medium,
                    line_height: number = 20,
                    size: number = 14,
                    tracking: number = 0.25,
                    weight: number = md.ref.typescale.weight_medium,
                ) { super(font, line_height, size, tracking, weight); }
            }

            export class body_small extends typescale_glob_functions {
                constructor(
                    font: string = md.ref.typescale.plain_medium,
                    line_height: number = 16,
                    size: number = 12,
                    tracking: number = 0.4,
                    weight: number = md.ref.typescale.weight_regular,
                ) { super(font, line_height, size, tracking, weight); }
            }

            export class button extends typescale_glob_functions {
                constructor(
                    font: string = md.ref.typescale.plain_medium,
                    line_height: number = 36,
                    size: number = 14,
                    tracking: number = 0.1,
                    weight: number = md.ref.typescale.weight_medium,
                ) { super(font, line_height, size, tracking, weight); }
            }

            export class custom_text_style extends typescale_glob_functions { }
        }

        export namespace typescale {
            export let display_large = new md.sys.typescale_primitives.display_large();
            export let display_medium = new md.sys.typescale_primitives.display_medium();
            export let display_small = new md.sys.typescale_primitives.display_small();
            export let headline_large = new md.sys.typescale_primitives.headline_large();
            export let headline_medium = new md.sys.typescale_primitives.headline_medium();
            export let headline_small = new md.sys.typescale_primitives.headline_small();
            export let title_large = new md.sys.typescale_primitives.title_large();
            export let title_medium = new md.sys.typescale_primitives.title_medium();
            export let title_small = new md.sys.typescale_primitives.title_small();
            export let label_large = new md.sys.typescale_primitives.label_large();
            export let label_medium = new md.sys.typescale_primitives.label_medium();
            export let label_small = new md.sys.typescale_primitives.label_small();
            export let body_large = new md.sys.typescale_primitives.body_large();
            export let body_medium = new md.sys.typescale_primitives.body_medium();
            export let body_small = new md.sys.typescale_primitives.body_small();
            export let button = new md.sys.typescale_primitives.button();
        }

        export type typescale =
            typescale_primitives.display_large |
            typescale_primitives.display_medium |
            typescale_primitives.display_small |
            typescale_primitives.headline_large |
            typescale_primitives.headline_medium |
            typescale_primitives.headline_small |
            typescale_primitives.title_large |
            typescale_primitives.title_medium |
            typescale_primitives.title_small |
            typescale_primitives.label_large |
            typescale_primitives.label_medium |
            typescale_primitives.label_small |
            typescale_primitives.body_large |
            typescale_primitives.body_medium |
            typescale_primitives.body_small |
            typescale_primitives.button |
            typescale_primitives.custom_text_style;
    }
}