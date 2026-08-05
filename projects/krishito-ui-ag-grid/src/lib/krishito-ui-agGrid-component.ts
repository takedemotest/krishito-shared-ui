import { Component, computed, effect, input, output, signal } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { DataFetcherFn, gridConfig } from './krishito-ui-agGrid-model';

@Component({
  selector: 'agGrid-ui',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './krishito-ui-agGrid-component.html',
  styleUrl: './krishito-ui-agGrid-component.scss',
})
export class AgGridUi {
  config = input.required<gridConfig>();
  fetchService = input<DataFetcherFn>();
  staticData = input<any[]>();

  actionTriggered = output<{ actionName: string; rowData: any }>();

  constructor() {
    effect(() => {
      const data = this.staticData();
      if (data) {
        this.rowData.set(data);
      }
    });
  }

  ngOnInit(): void {
    if (!this.staticData()) {
      this.loadData();
    }
  }

  loadData(): void {
    const serviceFn = this.fetchService();
    if (!serviceFn) return;

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

  onQuickFilterChanged(event: any): void {
    this.gridApi?.setGridOption('quickFilterText', event.target.value);
  }

  exportCsv(): void {
    this.gridApi?.exportDataAsCsv({ fileName: `${this.config().gridId || 'export'}.csv` });
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
  }

  rowData = signal<any[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  private gridApi?: GridApi;

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 120,
    resizable: true,
    sortable: true,
    filter: true,
  };

  columnDefs = computed<ColDef[]>(() => {
    const cfg = this.config();
    if (!cfg?.columns) return [];

    return cfg.columns.map((col): ColDef => {
      const colDef: ColDef = {
        field: col.field,
        headerName: col.headerName,
        sortable: col.sortable ?? true,
        filter: col.filter ?? true,
        width: col.width,
        flex: col.flex ?? 1,
      };
      switch (col.type) {
        case 'currency':
          colDef.valueFormatter = (params) =>
            params.value != null
              ? `${col.currencySymbol || '₹'}${Number(params.value).toLocaleString()}`
              : '';
          break;

        case 'date':
          colDef.valueFormatter = (params) =>
            params.value != null ? new Date(params.value).toLocaleDateString() : '';
          break;

        case 'badge':
          colDef.cellRenderer = (params: any) => {
            const value = params.value;
            const badgeColorMap = col.badgeColorMap || {};
            const colorConfig = badgeColorMap[value] || { bg: '#e0e0e0', text: '#000' };
            return `<span style="background-color: ${colorConfig.bg}; color: ${colorConfig.text}; padding: 2px 6px; border-radius: 4px;">${value}</span>`;
          };
          break;

        case 'actions':
          colDef.cellRenderer = (params: any) => {
            if (!col.actions?.length) return '';
            return col.actions
              .map(
                (act) =>
                  `<button data-action="${act.name}" class="action-btn ${act.btnClass || ''}">${act.label}</button>`,
              )
              .join(' ');
          };

          colDef.onCellClicked = (params) => {
            const target = params.event?.target as HTMLElement;
            const actionName = target?.getAttribute('data-action');
            if (actionName) {
              this.actionTriggered.emit({ actionName, rowData: params.data });
            }
          };
          break;
      }
      return colDef;
    });
  });
}
