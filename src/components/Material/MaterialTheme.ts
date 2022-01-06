import { md, Palette, DynamicColor } from "../../lib/lib";
import { CenterAlignedTheme } from "./AppBarsTop/CenterAligned/CenterAlignedTheme"
import { NavigationBarTheme } from "./NavigationBar/NavigationBarTheme";
import { FABTheme } from './FloatingActionButton/FABTheme';

type AppBarTheme = CenterAlignedTheme;

export interface MaterialThemeProps {
    app_bar_theme?: AppBarTheme;
    navigation_bar_theme?: NavigationBarTheme;
    fab_theme?: FABTheme;
    palette?: Palette;
}

export class MaterialTheme {
    private _body_contrasting_color: DynamicColor;
    private _body_bg_color: DynamicColor;

    constructor(
        public app_bar_theme: AppBarTheme = new CenterAlignedTheme(),
        public navigation_bar_theme: NavigationBarTheme = new NavigationBarTheme(),
        public fab_theme: FABTheme = new FABTheme(),
        public palette?: Palette,
    ) {
        let dark = this.palette?.colors.surface.dark ?? md.sys.color.surface.dark;
        let light = this.palette?.colors.surface.light ?? md.sys.color.surface.light;

        this._body_contrasting_color = new DynamicColor(light.inverse, dark.inverse);
        this._body_bg_color = new DynamicColor(light, dark);

        window.__ENV_THEME__ = this;
        this.bodyStyle();
        this.createMeta();
    }

    public get body_contrasting_color(): DynamicColor { return this._body_contrasting_color; }

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
        document.body.style.setProperty('--bg-color-dark', this._body_bg_color.dark.hex);
        document.body.style.setProperty('--bg-color-light', this._body_bg_color.light.hex);
    }

    static copyWith(props: MaterialThemeProps): MaterialTheme {
        return new MaterialTheme(
            props.app_bar_theme,
            props.navigation_bar_theme,
            props.fab_theme,
            props.palette,
        );
    }
}

export * from './FloatingActionButton/FABTheme';
export * from './AppBarsTop/CenterAligned/CenterAlignedTheme';
export * from './NavigationBar/NavigationBarTheme';