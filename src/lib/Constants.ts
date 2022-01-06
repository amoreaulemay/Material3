/**
 * This is a convenience class that contains the library's constants.
 */
export default class K {
    /**
     * This sub-class contains all the constants linked to a Floating Action Button.
     */
    static fab = class {
        /**
         * This represent the amount (in pixels) the main container can be scrolled before
         * the Floating Action Button collapses.
         */
        static scroll_collapse_amount = 50;
    }

    /**
     * This sub-class contains all the constants linked to a `AppBarsTop.CenterAligned`.
     */
    static cab = class {
        /**
         * This is the width occupied by fixed size elements in the `CenterAligned`.
         * 
         * *The 176 comes from 2 elements of 48px width (96px), two side paddings of 16px (32px) and a minimum spacing of 24px between elements * 2 (48px) = 176px.*
         */
        static fixed_width_content = 176;
    }
}