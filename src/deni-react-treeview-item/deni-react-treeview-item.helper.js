import {CHECKBOX_STATE} from './deni-react-treeview-item.constant'
import ActionButtons from './action-buttons'
import React from 'react'

module.exports = {

    getClassItem (treeview, item, level, selectRow) {
        let classNames = ['deni-react-treeview-item-container'];

        classNames.push('unselectable');

        if ((item.root === true) && (treeview.props.showRoot === false)) {
            classNames.push('hidden');
        } else {
            classNames.push(treeview.state.theme);
            classNames.push('level-' + level);

            if (selectRow) {
                classNames.push('select-row');
                if (this.isSelected(treeview, item)) {
                    classNames.push('selected');
                }
            }
        }

        return classNames.join(' ');
    },

    getClassIcon (treeview, item) {
        let classNames = ['icon'];

        if (treeview.props.showIcon) {
            if ((item.isLeaf) && (!(item.children && item.children.length > 0))) { //when it has children, so is no longer has to be leaf
                classNames.push('isleaf');
            }

            if (item.expanded) {
                classNames.push('expanded');
            }
        } else {
            classNames.push('hidden');
        }

        return classNames.join(' ');
    },

    getClassExpandButton (treeview, treeviewItem, item) {
        let classNames = ['expand-button'];

        if (((item.children && item.children.length > 0)  || (!item.isLeaf && treeview.props.lazyLoad))) {
            classNames.push('hasChild');

            if (item.expanded) {
                classNames.push('expanded');
            } else {
                classNames.push('colapsed');
            }
        }

        if (treeviewItem.state && treeviewItem.state.loading) {
            classNames.push('loading');
        }

        if (this.isSelected(treeview, item)) {
            classNames.push('selected');
        }

        return classNames.join(' ');
    },

    getClassCheckbox (treeview, item) {
        let classNames = ['checkbox'];

        if (treeview.props.showCheckbox) {
            if (item.state === CHECKBOX_STATE.CHECKED) {
                classNames.push('checked');
            } else if (item.state === CHECKBOX_STATE.UNDETERMINED) {
                classNames.push('undetermined');
            }

            if (this.isSelected(treeview, item)) {
                classNames.push('selected');
            }
        } else {
            classNames.push('hidden');
        }

        return classNames.join(' ');
    },

    getClassIconAndText (treeview, item, selectRow) {
        let classNames = ['icon-and-text'];

        if (selectRow) {
            classNames.push('select-row');
        }

        if ((!selectRow) && (this.isSelected(treeview, item))) {
            classNames.push('selected');
        }

        return classNames.join(' ');
    },

    getInnerText (treeview, item) {
        if (treeview.props.actionButtons) {
            return (
                <ActionButtons item={item} buttons={treeview.props.actionButtons} onActionButtonClick={treeview.props.onActionButtonClick.bind(this)} />
            )
        } else {
            if (treeview.props.onRenderItem) {
                return treeview.props.onRenderItem(item, treeview);
            } else {
                return item.text;
            }
        }
    },

    isUndetermined(item) {
        return item.state === CHECKBOX_STATE.UNDETERMINED;
    },

    isSelected (treeview, item) {
        return treeview.state.selectedItem === item;
    },

    treeviewItemContainerDoubleClick (helper, treeview, selectRow, event) {
        let canContinue = selectRow;

        if (!canContinue) {
            let target = event.target;
            canContinue = ((target.classList.contains('icon-and-text')) || (target.classList.contains('icon')) || (target.classList.contains('text-inner')) || (target.classList.contains('text')));
        }

        if (canContinue) {
            let item = this.props.item;
            if (item.isLeaf) {
                //TODO: Create a event here
            } else {
                helper.treeviewItemExpandButtonMouseDown.apply(this, [treeview, item]);
            }
        }
    },

    treeviewItemContainerMouseDown (treeview, selectRow, event) {
        let self = this;

        if (treeview.state.selectedItem !== self.props.item) {
            let target = event.target;
            let finishRoutine = function() {
                treeview.setState({
                    selectedItem: self.props.item
                });
            };

            if (selectRow) {
                finishRoutine();
            } else {
                if ((target.classList.contains('icon-and-text')) || (target.classList.contains('icon')) || (target.classList.contains('text-inner')) || (target.classList.contains('text') || (target.classList.contains('action-buttons-container-text')))) {
                    finishRoutine();
                }
            }

            if (treeview.props.onSelectItem) {
                treeview.props.onSelectItem(self.props.item);
            }
        }
    },

    treeviewItemExpandButtonMouseDown (treeview, item) {
        let self = this;
        const conclusion = () => {
            item.expanded = !item.expanded;
            treeview.setState({
                selectedItem: item
            });
            self.setState({
                loading: false
            });
        };
        const resolveEventOnColapsed = () => {
            if (treeview.props.onColapsed) {
                treeview.props.onColapsed(item)
            }
        };
        const resolveEventOnExpanded = () => {
            if (treeview.props.onExpanded) {
                treeview.props.onExpanded(item)
            }
        };

        if (item.expanded) {
            conclusion();
            resolveEventOnColapsed();
        } else {
            if (treeview.props.lazyLoad) {
                self.setState({loading: true});

                if (treeview.props.lazyLoad && treeview.props.onLazyLoad) {
                    treeview.props.onLazyLoad(item, (children) => {
                        treeview.api.loadData(children, item);
                        conclusion();
                    });
                } else {
                    treeview.api.load(item).then(function() {
                        conclusion();
                    })
                }

            } else {
                conclusion();
            }

            resolveEventOnExpanded();
        }
    },

    treeviewItemCheckboxMouseDown  (helper, treeview, item) {
        let treeviewItem = this;

        const resolveEventOnChecked = () => {
            if (treeview.props.onCheckItem) {
                treeview.props.onCheckItem(item)
            }
        };

        if (_isChecked(item)) {
            helper.uncheckNode(treeviewItem, item);
        } else {
            helper.checkNode(treeviewItem, item);
        }

        treeview.setState({
            selectedItem: item,
        });

        resolveEventOnChecked();
    },

    //
    checkNode (treeviewItem, item) {
        item.state = CHECKBOX_STATE.CHECKED;
        _refreshCheckboxStateChildren(item);
        _refreshCheckboxStateParents(treeviewItem);
    },

    //
    uncheckNode (treeviewItem, item) {
        item.state = CHECKBOX_STATE.UNCHECKED;
        _refreshCheckboxStateChildren(item);
        _refreshCheckboxStateParents(treeviewItem);
    },

}

//
function _getActionButtonByName(buttonName) {
    switch (buttonName) {
        case 'trash':
            return ''
        default:

    }
    if (buttonName === 'trash') {

    } else

    // (<FaTrashO size="15" color='#ff6666' />),
    // (<FaEdit size="15" color='#006699' />)

        here
}

//
function _isChecked(item) {
    return item.state === CHECKBOX_STATE.CHECKED;
}

//
function _isUnchecked(item) {
    return item.state === CHECKBOX_STATE.UNCHECKED;
}

///
function _refreshCheckboxStateChildren(item) {
    if (item.children) {
        item.children.forEach(function(child) {
            child.state = item.state;
            _refreshCheckboxStateChildren(child);
        });
    }
}

function _allItemsAreChecked(items) {
    for (let index = 0 ; index < items.length ; index++) {
        let item = items[index];

        if (!_isChecked(item)) {
            return false;
        }
    }
    return true;
}

function _allItemsAreUnchecked(items) {
    for (let index = 0 ; index < items.length ; index++) {
        let item = items[index];

        if (!_isUnchecked(item)) {
            return false;
        }
    }
    return true;
}

function _refreshCheckboxStateParents(treeviewItem) {
    let parentTreeviewItem = treeviewItem.props.parent;
    if (parentTreeviewItem) {
        let siblingItems = parentTreeviewItem.props.item.children;
        let allSiblingsAreChecked = _allItemsAreChecked(siblingItems);

        //
        if (allSiblingsAreChecked) {
            parentTreeviewItem.props.item.state = CHECKBOX_STATE.CHECKED;
        } else {
            let allSiblingsAreUnchecked = _allItemsAreUnchecked(siblingItems);
            if (allSiblingsAreUnchecked) {
                parentTreeviewItem.props.item.state = CHECKBOX_STATE.UNCHECKED;
            } else {
                parentTreeviewItem.props.item.state = CHECKBOX_STATE.UNDETERMINED;
            }
        }


        _refreshCheckboxStateParents(parentTreeviewItem);

    }
}
