// @ts-ignore: Unreachable code error
import { v4 as uuidv4 } from 'uuid';
import { Icon, IconProperty } from '../../../lib/Icon';
import { Views } from '../../Views/routes';

export interface NBDestinationItemProps {
    id?: string;
    icon?: Icon;
    label?: string;
    active?: boolean;
    linked_view: Views;
}

export class NBDestinationItem {
    constructor(
        public linked_view: Views,
        public id: string = uuidv4(),
        public icon?: Icon,
        public label: string = 'Sample',
        public active: boolean = false,
    ) { }

    public setActive() {
        this.active = true;
        if (typeof this.icon !== 'undefined') {
            this.icon.property = IconProperty.filled;
        }
    }

    public setInactive() {
        this.active = false;
        if (typeof this.icon !== 'undefined') {
            this.icon.property = IconProperty.outlined;
        }
    }

    static copyWith(props: NBDestinationItemProps): NBDestinationItem {
        return new NBDestinationItem(props.linked_view, props.id, props.icon, props.label, props.active);
    }
}