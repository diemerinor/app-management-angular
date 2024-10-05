import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import {UserService} from "../../../service/user.service";
import {User} from "../../../api/user";

@Component({
    templateUrl: './employees.component.html',
    providers: [MessageService]
})
export class EmployeesComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];
    userList = [];
    userToEdit: User= {};
    userToEdits: User[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];
    loading: boolean = true;

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private userService: UserService) { }

    ngOnInit() {
        console.log("entré")
        this.productService.getProducts().then(data => this.products = data);
        this.userService.getAllUsersWithRoles().subscribe(res=>{
            console.log("los usuarios son:")
            console.log(res)
            this.userList = res;
            this.loading = false;
        })

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(user) {
        //this.product = { ...product };
        this.productDialog = true;
        this.userToEdit = user;
        console.log(user)
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.userToEdit.first_name?.trim()) {
            if (this.userToEdit.id) {
                // @ts-ignore
                //this.userToEdit.inventoryStatus = this.userToEdit.inventoryStatus.value ? this.userToEdit.inventoryStatus.value : this.userToEdit.inventoryStatus;
                this.userService.putUser(this.userToEdit.id,this.userToEdit).subscribe(res=>{
                    console.log("buenas")
                    console.log(res)
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                })
            } else {
                // this.userToEdit.id = this.createId();
                // this.userToEdit.code = this.createId();
                // this.userToEdit.image_url = 'userToEdit-placeholder.svg';
                // @ts-ignore
                //this.userToEdit.inventoryStatus = this.userToEdit.inventoryStatus ? this.userToEdit.inventoryStatus.value : 'INSTOCK';
                this.userToEdits.push(this.userToEdit);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario creado', life: 3000 });
            }

            this.productDialog = false;
            this.userToEdit = {};
        }
        console.log(this.userToEdit);
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
