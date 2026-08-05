import * as i0 from '@angular/core';
import { input, output, effect, signal, computed, Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

class AgGridUi {
    config = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "config" }] : /* istanbul ignore next */ []));
    fetchService = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "fetchService" }] : /* istanbul ignore next */ []));
    staticData = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "staticData" }] : /* istanbul ignore next */ []));
    actionTriggered = output();
    constructor() {
        effect(() => {
            const data = this.staticData();
            if (data) {
                this.rowData.set(data);
            }
        });
    }
    ngOnInit() {
        if (!this.staticData()) {
            this.loadData();
        }
    }
    loadData() {
        const serviceFn = this.fetchService();
        if (!serviceFn)
            return;
        this.isLoading.set(true);
        this.errorMessage.set('');
        serviceFn().subscribe({
            next: (response) => {
                this.rowData.set(response.data || response);
                this.isLoading.set(false);
            },
            error: (err) => {
                this.errorMessage.set(err?.error?.message || 'Failed to load grid data.');
                this.isLoading.set(false);
            }
        });
    }
    onQuickFilterChanged(event) {
        this.gridApi?.setGridOption('quickFilterText', event.target.value);
    }
    exportCsv() {
        this.gridApi?.exportDataAsCsv({ fileName: `${this.config().gridId || 'export'}.csv` });
    }
    onGridReady(params) {
        this.gridApi = params.api;
    }
    rowData = signal([], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "rowData" }] : /* istanbul ignore next */ []));
    isLoading = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isLoading" }] : /* istanbul ignore next */ []));
    errorMessage = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "errorMessage" }] : /* istanbul ignore next */ []));
    gridApi;
    defaultColDef = {
        flex: 1,
        minWidth: 120,
        resizable: true,
        sortable: true,
        filter: true,
    };
    columnDefs = computed(() => {
        const cfg = this.config();
        if (!cfg?.columns)
            return [];
        return cfg.columns.map((col) => {
            const colDef = {
                field: col.field,
                headerName: col.headerName,
                sortable: col.sortable ?? true,
                filter: col.filter ?? true,
                width: col.width,
                flex: col.flex ?? 1,
            };
            switch (col.type) {
                case 'currency':
                    colDef.valueFormatter = (params) => params.value != null
                        ? `${col.currencySymbol || '₹'}${Number(params.value).toLocaleString()}`
                        : '';
                    break;
                case 'date':
                    colDef.valueFormatter = (params) => params.value != null ? new Date(params.value).toLocaleDateString() : '';
                    break;
                case 'badge':
                    colDef.cellRenderer = (params) => {
                        const value = params.value;
                        const badgeColorMap = col.badgeColorMap || {};
                        const colorConfig = badgeColorMap[value] || { bg: '#e0e0e0', text: '#000' };
                        return `<span style="background-color: ${colorConfig.bg}; color: ${colorConfig.text}; padding: 2px 6px; border-radius: 4px;">${value}</span>`;
                    };
                    break;
                case 'actions':
                    colDef.cellRenderer = (params) => {
                        if (!col.actions?.length)
                            return '';
                        return col.actions
                            .map((act) => `<button data-action="${act.name}" class="action-btn ${act.btnClass || ''}">${act.label}</button>`)
                            .join(' ');
                    };
                    colDef.onCellClicked = (params) => {
                        const target = params.event?.target;
                        const actionName = target?.getAttribute('data-action');
                        if (actionName) {
                            this.actionTriggered.emit({ actionName, rowData: params.data });
                        }
                    };
                    break;
            }
            return colDef;
        });
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "columnDefs" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.0", ngImport: i0, type: AgGridUi, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.0", type: AgGridUi, isStandalone: true, selector: "agGrid-ui", inputs: { config: { classPropertyName: "config", publicName: "config", isSignal: true, isRequired: true, transformFunction: null }, fetchService: { classPropertyName: "fetchService", publicName: "fetchService", isSignal: true, isRequired: false, transformFunction: null }, staticData: { classPropertyName: "staticData", publicName: "staticData", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { actionTriggered: "actionTriggered" }, ngImport: i0, template: "<div class=\"generic-grid-wrapper\">\n  \n  <!-- HEADER & TOOLBAR -->\n  <div class=\"grid-header\">\n    @if (config().title) {\n      <h3 class=\"grid-title\">{{ config().title }}</h3>\n    }\n    \n    <div class=\"grid-controls\">\n      @if (config().enableSearch ?? true) {\n        <input \n          type=\"text\" \n          placeholder=\"\uD83D\uDD0D Search all records...\" \n          (input)=\"onQuickFilterChanged($event)\"\n          class=\"search-input\" />\n      }\n\n      @if (config().enableExport ?? true) {\n        <button (click)=\"exportCsv()\" class=\"btn-export\">\uD83D\uDCE5 Export CSV</button>\n      }\n\n      <button (click)=\"loadData()\" class=\"btn-refresh\">\uD83D\uDD04 Refresh</button>\n    </div>\n  </div>\n\n  <!-- LOADING / ERROR STATES -->\n  @if (isLoading()) {\n    <div class=\"grid-status loading\">Loading data from service...</div>\n  } @else if (errorMessage()) {\n    <div class=\"grid-status error\">{{ errorMessage() }}</div>\n  }\n\n  <!-- AG GRID COMPONENT -->\n  <ag-grid-angular\n    style=\"width: 100%; height: 480px;\"\n    class=\"ag-theme-alpine\"\n    [rowData]=\"rowData()\"\n    [columnDefs]=\"columnDefs()\"\n    [defaultColDef]=\"defaultColDef\"\n    [pagination]=\"config().pagination ?? true\"\n    [paginationPageSize]=\"config().pageSize ?? 10\"\n    (gridReady)=\"onGridReady($event)\">\n  </ag-grid-angular>\n</div>", styles: [""], dependencies: [{ kind: "component", type: AgGridAngular, selector: "ag-grid-angular", inputs: ["gridOptions", "modules", "toolbar", "statusBar", "sideBar", "suppressContextMenu", "preventDefaultOnContextMenu", "allowContextMenuWithControlKey", "columnMenu", "suppressMenuHide", "enableBrowserTooltips", "tooltipTrigger", "tooltipShowDelay", "tooltipSwitchShowDelay", "tooltipHideDelay", "tooltipMouseTrack", "tooltipShowMode", "tooltipInteraction", "popupParent", "copyHeadersToClipboard", "copyGroupHeadersToClipboard", "clipboardDelimiter", "suppressCopyRowsToClipboard", "suppressCopySingleCellRanges", "suppressLastEmptyLineOnPaste", "suppressClipboardPaste", "suppressClipboardApi", "suppressCutToClipboard", "columnDefs", "defaultColDef", "defaultColGroupDef", "columnTypes", "dataTypeDefinitions", "calculatedColumns", "maintainColumnOrder", "enableStrictPivotColumnOrder", "suppressFieldDotNotation", "headerHeight", "groupHeaderHeight", "floatingFiltersHeight", "pivotHeaderHeight", "pivotGroupHeaderHeight", "hidePaddedHeaderRows", "allowDragFromColumnsToolPanel", "suppressMovableColumns", "suppressColumnMoveAnimation", "suppressMoveWhenColumnDragging", "suppressDragLeaveHidesColumns", "suppressGroupChangesColumnVisibility", "suppressMakeColumnVisibleAfterUnGroup", "suppressRowGroupHidesColumns", "colResizeDefault", "suppressAutoSize", "autoSizePadding", "skipHeaderOnAutoSize", "autoSizeStrategy", "animateColumnResizing", "components", "editType", "suppressStartEditOnTab", "getFullRowEditValidationErrors", "invalidEditValueMode", "singleClickEdit", "suppressClickEdit", "readOnlyEdit", "stopEditingWhenCellsLoseFocus", "enterNavigatesVertically", "enterNavigatesVerticallyAfterEdit", "enableCellEditingOnBackspace", "undoRedoCellEditing", "undoRedoCellEditingLimit", "defaultCsvExportParams", "suppressCsvExport", "defaultExcelExportParams", "suppressExcelExport", "excelStyles", "findSearchValue", "findOptions", "quickFilterText", "cacheQuickFilter", "includeHiddenColumnsInQuickFilter", "quickFilterParser", "quickFilterMatcher", "applyQuickFilterBeforePivotOrAgg", "excludeChildrenWhenTreeDataFiltering", "enableAdvancedFilter", "alwaysPassFilter", "includeHiddenColumnsInAdvancedFilter", "advancedFilterParent", "advancedFilterBuilderParams", "advancedFilterParams", "suppressAdvancedFilterEval", "suppressSetFilterByDefault", "enableFilterHandlers", "filterHandlers", "enableCharts", "chartThemes", "customChartThemes", "chartThemeOverrides", "chartToolPanelsDef", "chartMenuItems", "loadingCellRenderer", "loadingCellRendererParams", "loadingCellRendererSelector", "localeText", "masterDetail", "keepDetailRows", "keepDetailRowsCount", "detailCellRenderer", "detailCellRendererParams", "detailRowHeight", "detailRowAutoHeight", "context", "alignedGrids", "tabIndex", "rowBuffer", "valueCache", "valueCacheNeverExpires", "enableCellExpressions", "suppressTouch", "suppressFocusAfterRefresh", "suppressBrowserResizeObserver", "suppressPropertyNamesCheck", "suppressChangeDetection", "debug", "loading", "overlayLoadingTemplate", "loadingOverlayComponent", "loadingOverlayComponentParams", "suppressLoadingOverlay", "overlayNoRowsTemplate", "noRowsOverlayComponent", "noRowsOverlayComponentParams", "suppressNoRowsOverlay", "suppressOverlays", "overlayComponent", "overlayComponentParams", "overlayComponentSelector", "activeOverlay", "activeOverlayParams", "processFileInput", "pagination", "paginationPageSize", "paginationPageSizeSelector", "paginationAutoPageSize", "paginateChildRows", "suppressPaginationPanel", "paginationPanels", "pivotMode", "pivotPanelShow", "pivotMaxGeneratedColumns", "pivotDefaultExpanded", "pivotColumnGroupTotals", "pivotRowTotals", "pivotSuppressAutoColumn", "suppressExpandablePivotGroups", "functionsReadOnly", "aggFuncs", "formulaDataSource", "notesDataSource", "noteTrigger", "noteShowDelay", "noteHideDelay", "formulaFuncs", "suppressAggFuncInHeader", "alwaysAggregateAtRootLevel", "aggregateOnlyChangedColumns", "suppressAggFilteredOnly", "removePivotHeaderRowWhenSingleValueColumn", "animateRows", "cellFlashDuration", "cellFadeDuration", "allowShowChangeAfterFilter", "domLayout", "ensureDomOrder", "enableCellSpan", "enableRtl", "suppressColumnVirtualisation", "suppressMaxRenderedRowRestriction", "suppressRowVirtualisation", "rowDragManaged", "refreshAfterGroupEdit", "rowDragInsertDelay", "suppressRowDrag", "suppressMoveWhenRowDragging", "rowDragEntireRow", "rowDragMultiRow", "rowDragText", "dragAndDropImageComponent", "dragAndDropImageComponentParams", "fullWidthCellRenderer", "fullWidthCellRendererParams", "embedFullWidthRows", "groupDisplayType", "groupDefaultExpanded", "autoGroupColumnDef", "groupMaintainOrder", "groupSelectsChildren", "groupLockGroupColumns", "groupAggFiltering", "groupTotalRow", "grandTotalRow", "suppressStickyTotalRow", "groupSuppressBlankHeader", "groupSelectsFiltered", "showOpenedGroup", "groupHideParentOfSingleChild", "groupRemoveSingleChildren", "groupRemoveLowestSingleChildren", "groupHideOpenParents", "groupHideColumnsUntilExpanded", "groupAllowUnbalanced", "rowGroupPanelShow", "groupRowRenderer", "groupRowRendererParams", "treeData", "treeDataChildrenField", "treeDataParentIdField", "rowGroupPanelSuppressSort", "suppressGroupRowsSticky", "groupHierarchyConfig", "pinnedTopRowData", "pinnedBottomRowData", "enableRowPinning", "isRowPinnable", "isRowPinned", "rowModelType", "rowData", "asyncTransactionWaitMillis", "suppressModelUpdateAfterUpdateTransaction", "datasource", "cacheOverflowSize", "infiniteInitialRowCount", "serverSideInitialRowCount", "suppressServerSideFullWidthLoadingRow", "cacheBlockSize", "maxBlocksInCache", "maxConcurrentDatasourceRequests", "blockLoadDebounceMillis", "purgeClosedRowNodes", "serverSideDatasource", "serverSideSortAllLevels", "serverSideEnableClientSideSort", "serverSideOnlyRefreshFilteredGroups", "serverSidePivotResultFieldSeparator", "viewportDatasource", "viewportRowModelPageSize", "viewportRowModelBufferSize", "alwaysShowHorizontalScroll", "alwaysShowVerticalScroll", "debounceVerticalScrollbar", "suppressHorizontalScroll", "suppressScrollOnNewData", "suppressScrollWhenPopupsAreOpen", "suppressAnimationFrame", "suppressMiddleClickScrolls", "suppressPreventDefaultOnMouseWheel", "scrollbarWidth", "rowSelection", "cellSelection", "rowMultiSelectWithClick", "suppressRowDeselection", "suppressRowClickSelection", "suppressCellFocus", "suppressHeaderFocus", "selectionColumnDef", "rowNumbers", "suppressMultiRangeSelection", "enableCellTextSelection", "enableRangeSelection", "enableRangeHandle", "enableFillHandle", "fillHandleDirection", "suppressClearOnFillReduction", "sortingOrder", "accentedSort", "unSortIcon", "suppressMultiSort", "alwaysMultiSort", "multiSortKey", "suppressMaintainUnsortedOrder", "icons", "rowHeight", "rowStyle", "rowClass", "rowClassRules", "suppressRowHoverHighlight", "suppressRowTransform", "suppressContentVisibilityAuto", "columnHoverHighlight", "gridId", "deltaSort", "treeDataDisplayType", "enableGroupEdit", "initialState", "theme", "loadThemeGoogleFonts", "themeCssLayer", "styleNonce", "themeStyleContainer", "getContextMenuItems", "getMainMenuItems", "postProcessPopup", "processUnpinnedColumns", "processCellForClipboard", "processHeaderForClipboard", "processGroupHeaderForClipboard", "processCellFromClipboard", "sendToClipboard", "processDataFromClipboard", "isExternalFilterPresent", "doesExternalFilterPass", "getChartToolbarItems", "createChartContainer", "focusGridInnerElement", "navigateToNextHeader", "tabToNextHeader", "navigateToNextCell", "tabToNextCell", "tabToNextGridContainer", "getLocaleText", "getDocument", "paginationNumberFormatter", "getGroupRowAgg", "isGroupOpenByDefault", "ssrmExpandAllAffectsAllRows", "initialGroupOrderComparator", "processPivotResultColDef", "processPivotResultColGroupDef", "getDataPath", "getChildCount", "getServerSideGroupLevelParams", "isServerSideGroupOpenByDefault", "isApplyServerSideTransaction", "isServerSideGroup", "getServerSideGroupKey", "getBusinessKeyForNode", "getRowId", "resetRowDataOnUpdate", "autoGenerateColumnDefs", "processAutoGeneratedColumnDefs", "processRowPostCreate", "isRowSelectable", "isRowMaster", "fillOperation", "postSortRows", "getRowStyle", "getRowClass", "getRowHeight", "isFullWidthRow", "isRowValidDropPosition"], outputs: ["toolPanelVisibleChanged", "toolPanelSizeChanged", "columnMenuVisibleChanged", "contextMenuVisibleChanged", "cutStart", "cutEnd", "pasteStart", "pasteEnd", "calculatedColumnCreated", "calculatedColumnExpressionChanged", "calculatedColumnRemoved", "calculatedColumnValidationStateChanged", "columnVisible", "columnPinned", "columnResized", "columnMoved", "columnValueChanged", "columnPivotModeChanged", "columnPivotChanged", "columnGroupOpened", "newColumnsLoaded", "gridColumnsChanged", "displayedColumnsChanged", "virtualColumnsChanged", "columnEverythingChanged", "columnsReset", "columnHeaderMouseOver", "columnHeaderMouseLeave", "columnHeaderClicked", "columnHeaderContextMenu", "componentStateChanged", "cellValueChanged", "cellEditRequest", "rowValueChanged", "cellEditingStarted", "cellEditingStopped", "rowEditingStarted", "rowEditingStopped", "bulkEditingStarted", "bulkEditingStopped", "batchEditingStarted", "batchEditingStopped", "undoStarted", "undoEnded", "redoStarted", "redoEnded", "cellSelectionDeleteStart", "cellSelectionDeleteEnd", "rangeDeleteStart", "rangeDeleteEnd", "fillStart", "fillEnd", "filterOpened", "filterChanged", "filterModified", "filterUiChanged", "floatingFilterUiChanged", "advancedFilterBuilderVisibleChanged", "findChanged", "chartCreated", "chartRangeSelectionChanged", "chartOptionsChanged", "chartDestroyed", "cellKeyDown", "gridReady", "firstDataRendered", "gridSizeChanged", "modelUpdated", "virtualRowRemoved", "viewportChanged", "bodyScroll", "bodyScrollEnd", "dragStarted", "dragStopped", "dragCancelled", "stateUpdated", "paginationChanged", "rowDragEnter", "rowDragMove", "rowDragLeave", "rowDragEnd", "rowDragCancel", "rowResizeStarted", "rowResizeEnded", "columnRowGroupChanged", "rowGroupOpened", "expandOrCollapseAll", "pivotMaxColumnsExceeded", "pinnedRowDataChanged", "pinnedRowsChanged", "rowDataUpdated", "asyncTransactionsFlushed", "storeRefreshed", "headerFocused", "cellClicked", "cellDoubleClicked", "cellFocused", "cellMouseOver", "cellMouseOut", "cellMouseDown", "rowClicked", "rowDoubleClicked", "rowSelected", "selectionChanged", "cellContextMenu", "rangeSelectionChanged", "cellSelectionChanged", "tooltipShow", "tooltipHide", "sortChanged"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.0", ngImport: i0, type: AgGridUi, decorators: [{
            type: Component,
            args: [{ selector: 'agGrid-ui', standalone: true, imports: [AgGridAngular], template: "<div class=\"generic-grid-wrapper\">\n  \n  <!-- HEADER & TOOLBAR -->\n  <div class=\"grid-header\">\n    @if (config().title) {\n      <h3 class=\"grid-title\">{{ config().title }}</h3>\n    }\n    \n    <div class=\"grid-controls\">\n      @if (config().enableSearch ?? true) {\n        <input \n          type=\"text\" \n          placeholder=\"\uD83D\uDD0D Search all records...\" \n          (input)=\"onQuickFilterChanged($event)\"\n          class=\"search-input\" />\n      }\n\n      @if (config().enableExport ?? true) {\n        <button (click)=\"exportCsv()\" class=\"btn-export\">\uD83D\uDCE5 Export CSV</button>\n      }\n\n      <button (click)=\"loadData()\" class=\"btn-refresh\">\uD83D\uDD04 Refresh</button>\n    </div>\n  </div>\n\n  <!-- LOADING / ERROR STATES -->\n  @if (isLoading()) {\n    <div class=\"grid-status loading\">Loading data from service...</div>\n  } @else if (errorMessage()) {\n    <div class=\"grid-status error\">{{ errorMessage() }}</div>\n  }\n\n  <!-- AG GRID COMPONENT -->\n  <ag-grid-angular\n    style=\"width: 100%; height: 480px;\"\n    class=\"ag-theme-alpine\"\n    [rowData]=\"rowData()\"\n    [columnDefs]=\"columnDefs()\"\n    [defaultColDef]=\"defaultColDef\"\n    [pagination]=\"config().pagination ?? true\"\n    [paginationPageSize]=\"config().pageSize ?? 10\"\n    (gridReady)=\"onGridReady($event)\">\n  </ag-grid-angular>\n</div>" }]
        }], ctorParameters: () => [], propDecorators: { config: [{ type: i0.Input, args: [{ isSignal: true, alias: "config", required: true }] }], fetchService: [{ type: i0.Input, args: [{ isSignal: true, alias: "fetchService", required: false }] }], staticData: [{ type: i0.Input, args: [{ isSignal: true, alias: "staticData", required: false }] }], actionTriggered: [{ type: i0.Output, args: ["actionTriggered"] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { AgGridUi };
//# sourceMappingURL=takedemotest-krishito-ui-ag-grid.mjs.map
