import { Icon } from "../../../../lib/Icon";
import { CenterAlignedTheme } from "./CenterAlignedTheme";

interface CenterAlignedProps {
    theme?: CenterAlignedTheme;
    title?: string;
    leading_icon?: Icon;
    trailing_icon?: Icon;
    main_view_id?: string;
}

export class CenterAlignedBar {
    private _theme: CenterAlignedTheme;
    private _title?: string;
    private _leading_icon?: Icon;
    private _trailing_icon?: Icon;
    private _main_view_id?: string;

    constructor(props: CenterAlignedProps) {
        this._theme = props.theme ?? new CenterAlignedTheme();
        this._title = props.title;
        this._leading_icon = props.leading_icon;
        this._trailing_icon = props.trailing_icon;
        this._main_view_id = props.main_view_id;
    }

    public get theme(): CenterAlignedTheme { return this._theme; }
    public get title(): string { return this._title ?? ''; }
    public get leading_icon(): Icon | undefined { return this._leading_icon; }
    public get trailing_icon(): Icon | undefined { return this._trailing_icon; }
    public get main_view_id(): string | undefined { return this._main_view_id; }

    public set theme(new_theme: CenterAlignedTheme) { this._theme = new_theme; }
    public set title(new_title: string) { this._title = new_title }
    public set leading_icon(new_icon: Icon | undefined) { this._leading_icon = new_icon; }
    public set trailing_icon(new_icon: Icon | undefined) { this._trailing_icon = new_icon; }
    public set main_view_id(new_id: string | undefined) { this._main_view_id = new_id; }

    public get has_leading_icon(): boolean { return typeof this._leading_icon !== 'undefined'; }
    public get has_trailing_icon(): boolean { return typeof this._trailing_icon !== 'undefined'; }
}