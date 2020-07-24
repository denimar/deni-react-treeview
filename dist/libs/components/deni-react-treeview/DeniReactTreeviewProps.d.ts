import { CSSProperties } from "react";
export interface DeniReactTreeviewProps {
    className?: string;
    style?: CSSProperties;
    autoLoad?: boolean;
    json?: string;
    items?: any[];
    lazyLoad?: boolean;
    expandAll?: boolean;
    marginItems?: string | number;
    onAfterLoad?: void;
    onBeforeLoad?: void;
    onRenderItem?: void;
    onSelectItem?: void;
    onCheckItem?: void;
    selectRow?: boolean;
    showCheckbox?: boolean;
    showIcon?: boolean;
    showRoot?: boolean;
    theme?: string;
    url?: string;
}
