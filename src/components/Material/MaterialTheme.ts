import { CenterAlignedTheme } from "./AppBarsTop/CenterAligned/CenterAlignedTheme"

type AppBarTheme = CenterAlignedTheme;

export interface MaterialThemeProps {
    app_bar_theme?: AppBarTheme;
}

export class MaterialTheme {
    constructor(
        public app_bar_theme: AppBarTheme = new CenterAlignedTheme(),
    ) { }

    static copyWith(props: MaterialThemeProps): MaterialTheme {
        return new MaterialTheme(
            props.app_bar_theme,
        );
    }
}