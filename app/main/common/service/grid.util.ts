import {Injectable} from "@angular/core";
import {GridOptions} from "ag-grid";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class GridUtil {

    constructor(private translate: TranslateService) {
    }

    getDefaults(columnDefs: any[]) {
        let options = <GridOptions>{
            onGridReady: () => { this.gridReady(options, columnDefs) },
            suppressMovableColumns: true,
            suppressCellSelection: true,
            rowSelection: 'single',
            onGridSizeChanged: () => {
                options.api.sizeColumnsToFit();
            }
        };

        return options;
    }

    gridReady(options: GridOptions, columnDefs: any[]) {
        setTimeout(() => {
            options.api.sizeColumnsToFit();
        }, 1);
        columnDefs.forEach((columnDef: any) => {
            if (columnDef.translate) {
                const prefix = columnDef.translate !== true ? columnDef.translate : '';
                columnDef.cellRenderer = (cell: any) => {
                    return this.translate.instant(prefix + cell.value);
                }
            }
            columnDef.headerName = this.translate.instant(columnDef.headerNameKey);
        });
        options.api.setColumnDefs(columnDefs);
    }
}
