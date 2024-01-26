import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/common/components/confirm-dialog/confirm-dialog.component';
import { CategoryModel, CategoryResponse, ConfirmDialogConfig, SnackBarPanelClass } from 'src/app/common/models';
import { CategoryService } from 'src/app/common/services';
import { ManageCategoryDialogComponent } from '../manage-category-dialog/manage-category-dialog.component';

const SNACK_BAR_CONFIG = new MatSnackBarConfig();
SNACK_BAR_CONFIG.duration = 2000;
SNACK_BAR_CONFIG.verticalPosition = 'bottom';
SNACK_BAR_CONFIG.horizontalPosition = 'center';

@Component({
    selector: 'app-manage-category',
    templateUrl: './manage-category.component.html',
    styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
    public displayedColumns: string[] = ['images', 'name', 'action'];
    public dataSource = new MatTableDataSource<CategoryModel>;
    public categoriesList: CategoryModel[] = [];
    public currentPage = 1;
    public pageSize = 5;
    public keyWord = '';

    constructor(
        public dialog: MatDialog,
        private snackbar: MatSnackBar,
        private categoryService: CategoryService
    ) { }

    ngOnInit(): void {
        this.getCategories();
    }

    public getCategories(): void {
        this.categoryService.getCategoriesAndSearch(this.keyWord, this.currentPage, this.pageSize).subscribe(
            (res: CategoryResponse) => {
                if (res.status === 'SUCCESS') {
                    this.dataSource = new MatTableDataSource(res.data as CategoryModel[]);
                }
            }
        )
    }

    public searchCategory(q: string) {
        this.keyWord = q;
        this.currentPage = 1;
        this.getCategories();
    }

    public createCategory(form: FormData): void {
        this.categoryService.createCategory(form).subscribe(
            (res: CategoryResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Bạn không thể tạo danh mục này!';

                if (res.status === 'SUCCESS') {
                    message = 'Cảm ơn sự đóng góp của bạn';
                    snackBarPanel = SnackBarPanelClass.successClass;

                    this.getCategories();
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public updateCategory(form: FormData): void {
        this.categoryService.updateCategory(form).subscribe(
            (res: CategoryResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Cập nhật thông tin thất bại!';

                if (res.status === 'SUCCESS') {
                    message = 'Cảm ơn sự đóng góp của bạn';
                    snackBarPanel = SnackBarPanelClass.successClass;

                    this.getCategories();
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public deleteCategory(category: CategoryModel): void {
        this.categoryService.deleteCategory(category).subscribe(
            (res: CategoryResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Xóa dữ liệu không thành công';

                if (res.status === 'SUCCESS') {
                    snackBarPanel = SnackBarPanelClass.successClass;
                    message = 'Xóa dữ liệu thành công';
                    this.getCategories();
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public saveCategory(form: FormData): void {
        switch (form.get('isEdit')) {
            case 'create':
                this.createCategory(form);
                break;
            case 'update':
                this.updateCategory(form);
                break;
        }
    }

    public openManageCategoryDialog(category?: CategoryModel) {
        const dialogRef = this.dialog.open(ManageCategoryDialogComponent, {
            height: '70vh',
            width: '70vw',
            data: category
        })

        dialogRef.afterClosed().subscribe(data => {
            if (data) {
                this.saveCategory(data);
            }
        })
    }

    public confirmDeleteCategory(category: CategoryModel): void {
        const dialogData: ConfirmDialogConfig = {
            type: 'delete-dialog',
            header: 'Xác nhận xóa danh mục du lịch',
            message: `Bạn xác nhận xóa danh mục du lịch ${category.name} ?`,
            image: category.background
        }

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '30vw',
            data: dialogData
        })

        dialogRef.afterClosed().subscribe(confirm => {
            if (confirm) {
                this.deleteCategory(category);
            }
        })
    }

    public goPage(page: number): void {
        this.currentPage = page;
        this.getCategories();
    }
}
