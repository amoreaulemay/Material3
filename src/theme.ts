import { CAContainerTheme, CAHeadlineTheme, CALeadingNavigationIconTheme, CATrailingIconTheme, CenterAlignedTheme } from "./components/Material/AppBarsTop/CenterAligned/CenterAlignedTheme";
import { FABContainerTheme, FABIconTheme, FABLabelTextTheme, FABTheme } from "./components/Material/FloatingActionButton/FABTheme";
import { MaterialTheme } from "./components/Material/MaterialTheme";
import { NavigationBarTheme, NBActiveIndicatorTheme, NBContainerTheme, NBDestinationTheme, NBLabelTextTheme } from "./components/Material/NavigationBar/NavigationBarTheme";
import { Palette, Color, Colors } from "./lib/Color";

export const material_theme = MaterialTheme.copyWith({
    palette: Palette.copyWith({
        primary: Color.fromHex('000000'),
        secondary: Color.fromHex('000000'),
        tertiary: Color.fromHex('000000'),
        neutral: Color.fromHex('000000'),
        neutral_variant: Color.fromHex('000000'),
    }),
    app_bar_theme: CenterAlignedTheme.copyWith({
        container_theme: CAContainerTheme.copyWith({
            color: Colors.dynamic.pure_black,
        }),
        headline_theme: CAHeadlineTheme.copyWith({
            color: Colors.dynamic.pure_white,
        }),
        trailing_icon_theme: CATrailingIconTheme.copyWith({
            color: Colors.dynamic.pure_white,
        }),
        leading_navigation_icon_theme: CALeadingNavigationIconTheme.copyWith({
            color: Colors.dynamic.pure_white,
        })
    }),
    navigation_bar_theme: NavigationBarTheme.copyWith({
        container_theme: NBContainerTheme.copyWith({
            color: Colors.dynamic.pure_black,
        }),
        destination_theme: NBDestinationTheme.copyWith({
            label_theme: NBLabelTextTheme.copyWith({
                color_active: Colors.dynamic.pure_white,
                color_inactive: Colors.dynamic.pure_white.shade(0.5),
            }),
            active_indicator_theme: NBActiveIndicatorTheme.copyWith({
                color: Colors.dynamic.pure_white,
            }),
        }),
    }),
    fab_theme: FABTheme.copyWith({
        icon_theme: FABIconTheme.copyWith({
            color: Colors.dynamic.pure_white,
        }),
        container_theme: FABContainerTheme.copyWith({
            color: Colors.dynamic.pure_black,
        }),
        label_text_theme: FABLabelTextTheme.copyWith({
            color: Colors.dynamic.pure_white,
        }),
    }),
});