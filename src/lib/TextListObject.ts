import { TextStyle } from "./TextStyle";

export interface TextListObject {
    id: number | string;
    primaryText: string;
    secondaryText?: string;
    destination?: string;
    primaryTextStyle?: TextStyle;
    secondaryTextStyle?: TextStyle;
}