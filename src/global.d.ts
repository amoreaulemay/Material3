import { DynamicColor } from "./lib/lib";
import { MaterialTheme } from './components/Material/MaterialTheme';

declare global {
    interface Window {
        __ENV_BODY__: DynamicColor;
        __ENV_THEME__: MaterialTheme;
    }
}