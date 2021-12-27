import { Palette } from "../../lib/Color";
import { md } from "../../lib/md";
import { CenterAlignedTheme } from "./AppBarsTop/CenterAligned/CenterAlignedTheme"
import { NavigationBarTheme } from "./NavigationBar/NavigationBarTheme";

type AppBarTheme = CenterAlignedTheme;

export interface MaterialThemeProps {
    app_bar_theme?: AppBarTheme;
    navigation_bar_theme?: NavigationBarTheme;
    palette?: Palette;
}

export class MaterialTheme {
    constructor(
        public app_bar_theme: AppBarTheme = new CenterAlignedTheme(),
        public navigation_bar_theme: NavigationBarTheme = new NavigationBarTheme(),
        public palette?: Palette,
    ) {
        this.bodyStyle();
        this.createMeta();
    }

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

        meta_light.setAttribute('content', this.app_bar_theme.container_theme.color.light.hex);
        meta_dark.setAttribute('content', this.app_bar_theme.container_theme.color.dark.hex);

        document.querySelector('head')?.append(meta_light, meta_dark);
    }

    public bodyStyle() {
        document.body.style.setProperty('--bg-color-dark', this.palette?.colors.surface.dark.hex ?? md.sys.color.surface.dark.hex);
        document.body.style.setProperty('--bg-color-light', this.palette?.colors.surface.light.hex ?? md.sys.color.surface.light.hex);
    }

    static copyWith(props: MaterialThemeProps): MaterialTheme {
        return new MaterialTheme(
            props.app_bar_theme,
            props.navigation_bar_theme,
            props.palette,
        );
    }
}