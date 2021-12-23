import { Color, Palette } from "../../lib/Color";
import { md } from "../../lib/md";
import { CenterAlignedTheme } from "./AppBarsTop/CenterAligned/CenterAlignedTheme"

type AppBarTheme = CenterAlignedTheme;

export interface MaterialThemeProps {
    app_bar_theme?: AppBarTheme;
    palette?: Palette;
}

export class MaterialTheme {
    constructor(
        public app_bar_theme: AppBarTheme = new CenterAlignedTheme(),
        public palette?: Palette,
    ) { }

    public createMeta() {
        // Check if the meta tags already exist.
        let query = document.querySelectorAll('meta[name="theme-content"]');
        query.forEach(e => {
            e.remove();
        });

        let meta_light = document.createElement('meta');
        let meta_dark = document.createElement('meta');

        meta_light.setAttribute('name', 'theme-color');
        meta_dark.setAttribute('name', 'theme-color');

        meta_light.setAttribute('media', '(prefers-color-scheme: light)');
        meta_dark.setAttribute('media', '(prefers-color-scheme: dark)');

        meta_light.setAttribute('content', this.palette?.primary.color60.hex ?? md.sys.color.primary.light.hex);
        meta_dark.setAttribute('content', this.palette?.primary.color30.hex ?? md.sys.color.primary.dark.hex);

        document.querySelector('head')?.append(meta_light, meta_dark);
    }

    static copyWith(props: MaterialThemeProps): MaterialTheme {
        return new MaterialTheme(
            props.app_bar_theme,
            props.palette,
        );
    }
}