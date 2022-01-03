import { Ref } from "vue";
import { Icon } from "../../../lib/Icon";

export interface FABIcon {
    icon?: Icon;
    text: string;
    callback: () => void;
    collapsed: Ref<boolean>;
    collapsed_cb: (containerID?: string) => void;
}

export function collapse(containerID: string = '', obj: Ref<boolean>) {
    obj.value = document.getElementById(containerID)?.scrollTop ?? 0 > 50 ? true : false;
}