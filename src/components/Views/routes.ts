import { Icon, IconProperty } from "../../lib/Icon";
import { NBDestinationItem } from "../Material/NavigationBar/NBDestinationItem";
import Home from './Home.vue';
import Preview from './Preview.vue';
import Settings from './Settings.vue';

export enum Views {
    home,
    preview,
    settings,
}

export const destinations: NBDestinationItem[] = [
    NBDestinationItem.copyWith({
        linked_view: Views.home,
        icon: new Icon({
            name: 'home',
            property: IconProperty.filled,
        }),
        label: 'Home',
        active: true,
    }),
    NBDestinationItem.copyWith({
        linked_view: Views.preview,
        icon: new Icon({
            name: 'preview',
            property: IconProperty.outlined,
        }),
        label: 'Preview',
        active: false,
    }),
    NBDestinationItem.copyWith({
        linked_view: Views.settings,
        icon: new Icon({
            name: 'settings',
            property: IconProperty.outlined,
        }),
        label: 'Settings',
        active: false,
    }),
];

export {
    Home,
    Preview,
    Settings,
}