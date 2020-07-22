declare class DeniReactTreeviewApiImpl {
    static addItem: (scope: any, text: any, isLeaf: any, parentNode: any) => {
        text: any;
        children: never[];
        isLeaf: any;
    };
    static findFolder: (scope: any, folderToFind: any) => any;
    static findItem: (scope: any, itemToFind: any) => any;
    static findNode: (scope: any, nodeToFind: any) => any;
    static expandAll: (scope: any) => void;
    static getItems: (scope: any) => any;
    static getParentNode: (scope: any, item: any) => any;
    static getRootItem: (scope: any) => any;
    static getSelectedItem: (scope: any) => any;
    static removeItem: (scope: any, id: any) => void;
    static selectItem: (scope: any, itemToFind: any) => void;
}
export default DeniReactTreeviewApiImpl;
