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
}

export class Icon {
    public name: string;
    public property: IconProperty;

    constructor(
        props: IconProps
    ) {
        this.name = props.name;
        this.property = props.property ?? IconProperty.filled;
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
}