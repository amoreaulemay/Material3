import { Icon } from "../../../lib/Icon";

export interface FABIcon {
    icon?: Icon;
    text: string;
    callback: () => void;
}