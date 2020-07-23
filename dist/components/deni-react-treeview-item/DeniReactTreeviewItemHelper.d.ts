/// <reference types="react" />
declare const getClassItem: (treeview: any, item: any, level: any, selectRow: any) => string;
declare const getClassIcon: (treeview: any, item: any) => string;
declare const getClassExpandButton: (treeview: any, treeviewItem: any, item: any) => string;
declare const getClassCheckbox: (treeview: any, item: any) => string;
declare const getClassIconAndText: (treeview: any, item: any, selectRow: any) => string;
declare const getInnerText: (treeview: any, item: any) => JSX.Element;
declare const treeviewItemContainerDoubleClick: (treeviewItemExpandButtonMouseDown: any, treeview: any, selectRow: any, event: any) => void;
declare const treeviewItemContainerMouseDown: (treeview: any, item: any, selectRow: any, event: any) => void;
declare const treeviewItemExpandButtonMouseDown: (treeview: any, item: any) => void;
declare const treeviewItemCheckboxMouseDown: (treeviewItem: any, item: any) => void;
export { getClassItem, getClassIcon, getClassExpandButton, getClassCheckbox, getClassIconAndText, getInnerText, treeviewItemContainerDoubleClick, treeviewItemContainerMouseDown, treeviewItemExpandButtonMouseDown, treeviewItemCheckboxMouseDown };
