import { md, Palette, DynamicColor } from "../../lib/lib";
import { CenterAlignedTheme } from "./AppBarsTop/CenterAligned/CenterAlignedTheme"
import { NavigationBarTheme } from "./NavigationBar/NavigationBarTheme";
import { FABTheme } from './FloatingActionButton/FABTheme';
import safeAreaInsets from 'safe-area-insets';

type AppBarTheme = CenterAlignedTheme;

export interface MaterialThemeProps {
    app_bar_theme?: AppBarTheme;
    navigation_bar_theme?: NavigationBarTheme;
    fab_theme?: FABTheme;
    palette?: Palette;
}

export interface SafeAreaInsets {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

export class MaterialTheme {
    public safe_areas: SafeAreaInsets;

    constructor(
        public app_bar_theme: AppBarTheme = new CenterAlignedTheme(),
        public navigation_bar_theme: NavigationBarTheme = new NavigationBarTheme(),
        public fab_theme: FABTheme = new FABTheme(),
        public palette?: Palette,
    ) {
        this.bodyStyle();
        this.createMeta();

        this.safe_areas = {
            top: safeAreaInsets.support ? safeAreaInsets.top : 0,
            bottom: safeAreaInsets.support ? safeAreaInsets.bottom : 0,
            left: safeAreaInsets.support ? safeAreaInsets.left : 0,
            right: safeAreaInsets.support ? safeAreaInsets.right : 0,
        }

        window.__ENV_THEME__ = this;
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
        let dark = this.palette?.colors.surface.dark ?? md.sys.color.surface.dark;
        let light = this.palette?.colors.surface.light ?? md.sys.color.surface.light;

        window.__ENV_BODY__ = new DynamicColor(light.inverse, dark.inverse);

        document.body.style.setProperty('--bg-color-dark', dark.hex);
        document.body.style.setProperty('--bg-color-light', light.hex);
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