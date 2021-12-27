// @ts-ignore: Unreachable code error
import { v4 as uuidv4 } from 'uuid';
import { Icon, IconProperty } from '../../../lib/Icon';

export interface NBDestinationItemProps {
    id?: string;
    icon?: Icon;
    label?: string;
    active?: boolean;
}

export class NBDestinationItem {
    constructor(
        public id: string = uuidv4(),
        public icon?: Icon,
        public label: string = 'Sample',
        public active: boolean = false,
    ) { }

    static copyWith(props: NBDestinationItemProps): NBDestinationItem {
        return new NBDestinationItem(props.id, props.icon, props.label, props.active);
    }
}

export function generateDestinations(num: number): NBDestinationItem[] {
    if (!(3 <= num && num <= 5)) {
        throw new Error('num must be between 3 and 5');
    }

    let destinations: NBDestinationItem[] = [];

    let icons = [
        new Icon({
            name: 'home',
            property: IconProperty.filled,
        }),
        new Icon({
            name: 'add_box',
            property: IconProperty.outlined,
            display_name: 'Add'
        }),
        new Icon({
            name: 'settings',
            property: IconProperty.outlined,
        }),
    ]

    for (let i = 0; i < num; i++) {
        destinations.push(NBDestinationItem.copyWith({
            active: i == 0 ? true : false,
            icon: icons[i],
            label: icons[i].displayName,
        }));
    }

    return destinations;
}