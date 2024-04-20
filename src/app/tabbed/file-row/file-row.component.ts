import {
    BindCSSClassToBoolean,
    BindValue,
    Click,
    EzComponent,
} from "@gsilber/webez";
import html from "./file-row.component.html";
import css from "./file-row.component.css";
import hljs from "highlight.js";

const getExtension = (filename: string): string => {
    return filename.split(".").pop() || "";
};

export class FileRowComponent extends EzComponent {
    @BindValue("filename")
    private filename: string;
    @BindValue("contents")
    private contents: string;

    @BindCSSClassToBoolean("collapsible-area", "show")
    private expanded: boolean = false;

    constructor(filename: string, contents: string) {
        super(html, css);

        this.filename = filename;
        const extension = getExtension(filename);
        this.contents = hljs.highlight(contents, {
            language: extension,
        }).value;
    }

    @Click("accordion-header")
    toggleExpanded() {
        this.expanded = !this.expanded;
    }
}
