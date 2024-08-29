import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import {UserService} from "../../../service/user.service";
import {User} from "../../../api/user";
import {EventsService} from "../../../service/events.service";
import {EventDTO} from "../../../api/event";
import {DatePipe} from "@angular/common";

@Component({
    templateUrl: './events.component.html',
    providers: [MessageService,DatePipe]
})
export class EventsComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];
    eventList = [];
    eventToEdit: EventDTO = {};

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
        private userService: UserService,
        private eventService: EventsService,
        private datePipe: DatePipe) { }

    ngOnInit() {
        console.log("entré")
        this.productService.getProducts().then(data => this.products = data);
        this.getAllEvents();

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

    editProduct(event) {
        this.productDialog = true;
        this.eventToEdit = event;
        this.eventToEdit = {
            ...event,
            init_date: new Date(event.init_date),
            end_date: new Date(event.end_date)
        };
        console.log(event)
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

    getAllEvents(){
        this.loading = true;
        this.eventService.getAllEvents().subscribe(res=>{
            console.log("los eventos son:")
            console.log(res)
            this.eventList = res;
            this.loading = false;
        })
    }

    saveProduct() {
        this.submitted = true;

        if (this.eventToEdit.title?.trim()) {
            if (this.eventToEdit.id) {
                // @ts-ignore
                //this.eventToEdit.inventoryStatus = this.eventToEdit.inventoryStatus.value ? this.eventToEdit.inventoryStatus.value : this.eventToEdit.inventoryStatus;
                this.eventService.updateEvent(this.eventToEdit.id,this.eventToEdit).subscribe(res=>{
                    console.log("buenas")
                    console.log(res)
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Evento actualizado', life: 3000 });
                    this.getAllEvents();
                })
            } else {
                console.log(this.eventToEdit);
                this.eventService.createEvent(this.eventToEdit).subscribe(res=>{
                    console.log(res)
                })
                // this.eventToEdit.id = this.createId();
                // this.eventToEdit.code = this.createId();
                // this.eventToEdit.image_url = 'eventToEdit-placeholder.svg';
                // @ts-ignore
                //this.eventToEdit.inventoryStatus = this.eventToEdit.inventoryStatus ? this.eventToEdit.inventoryStatus.value : 'INSTOCK';
                //this.eventToEdits.push(this.eventToEdit);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Evento creado', life: 3000 });
                this.getAllEvents();
            }

            this.productDialog = false;
            // this.eventToEdit = {};
        }
        console.log(this.eventToEdit);
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

    formatDate(date: string): string {
        return date ? this.datePipe.transform(date, 'dd-MM-yyyy HH:mm') : '';
    }
}
