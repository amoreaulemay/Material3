import { md } from "./md";

interface SymmetricProps {
    horizontal?: number;
    vertical?: number;
}

interface OnlyProps {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
}

export enum Edge {
    bottom, left, right, top,
}

export class EdgeInsets implements md.ref.css {
    constructor(
        public bottom: number = 0,
        public left: number = 0,
        public right: number = 0,
        public top: number = 0,
    ) { }

    public get css_vars(): md.ref.css_var {
        return {
            '--padding-bottom': this.getEdgeToString(Edge.bottom),
            '--padding-left': this.getEdgeToString(Edge.left),
            '--padding-right': this.getEdgeToString(Edge.right),
            '--padding-top': this.getEdgeToString(Edge.top),
        }
    }

    public get inline_css(): string {
        return md.ref.generate_style(this.css_vars);
    }

    public getEdgeToString(edge: Edge, unit: md.ref.units = md.ref.units.rem): string {
        let edge_measure: number = 0;
        switch (edge) {
            case Edge.bottom:
                edge_measure = this.bottom;
                break;
            case Edge.left:
                edge_measure = this.left;
                break;
            case Edge.right:
                edge_measure = this.right;
                break;
            case Edge.top:
                edge_measure = this.top;
                break;
        }

        switch (unit) {
            case md.ref.units.dp:
                return `${edge_measure}dp`;
            case md.ref.units.px:
                return `${edge_measure}px`;
            case md.ref.units.rem:
                return `${edge_measure * 0.0625}rem`;
        }
    }

    static all(value: number): EdgeInsets {
        return new EdgeInsets(value, value, value, value);
    }

    static only(values: OnlyProps): EdgeInsets {
        return new EdgeInsets(values.bottom, values.left, values.right, values.top);
    }

    static symmetric(values: SymmetricProps): EdgeInsets {
        return new EdgeInsets(values.vertical, values.horizontal, values.horizontal, values.vertical);
    }
}