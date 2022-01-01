export enum IconProperty {
    outlined,
    filled,
    rounded,
    sharp,
    two_tones
}

interface IconProps {
    name: string,
    property?: IconProperty,
    display_name?: string;
}

export class Icon {
    public name: string;
    public property: IconProperty;
    public _displayName: string;

    constructor(
        props: IconProps
    ) {
        this.name = props.name;
        this.property = props.property ?? IconProperty.filled;
        this._displayName = props.display_name ?? props.name;
    }

    public get css_class(): string {
        switch (this.property) {
            case IconProperty.outlined:
                return 'material-icons-outlined';
            case IconProperty.filled:
                return 'material-icons';
            case IconProperty.rounded:
                return 'material-icons-round';
            case IconProperty.sharp:
                return 'material-icons-sharp';
            case IconProperty.two_tones:
                return 'material-icons-two-tones';
        }
    }

    public get displayName(): string {
        if (/_/.test(this.name)) {
            let split_string = this._displayName.split('_');
            return split_string.map(e => capitalize(e)).join(' ');
        } else {
            return capitalize(this._displayName);
        }
    }
}

export function capitalize(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export let error_icon = new Icon({ name: 'error' });