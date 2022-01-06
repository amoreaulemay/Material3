import { Ref } from "vue";
import K from "../../../lib/Constants";
import { Icon } from "../../../lib/Icon";

/**
 * A simple interface to declare a `FABModel` using named arguments.
 * 
 * @param text The text that will be displayed on the button.
 * @param icon *(Optional)* The icon to display on the FAB.
 * @param callback *(Optional)* The action to be performed when the button is pressed.
 */
export interface FABModelProps {
    text: string;
    icon?: Icon;
    callback?: () => void;
}

export class FABModel {
    /**
     * A model for a Floating Action Button.
     * 
     * @param text The text that will be displayed on the button.
     * @param icon *(Optional)* The icon to display on the FAB.
     * @param callback *(Optional)* The action to be performed when the button is pressed.
     */
    constructor(
        public text: string,
        public icon?: Icon,
        public callback: () => void = () => { },
    ) { }

    /**
     * Convenience function to use named arguments.
     * 
     * @param props See {@link FABModelProps `FABModelProps`}
     * @returns A new `FABModel`.
     */
    static new(props: FABModelProps): FABModel {
        return new FABModel(props.text, props.icon, props.callback);
    }
}

export function collapse(containerID: string = '', obj: Ref<boolean>) {
    const scrollTop = document.getElementById(containerID)?.scrollTop ?? 0;
    obj.value = scrollTop > K.fab.scroll_collapse_amount ? true : false;
}