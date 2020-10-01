export class Product {
    constructor(
        public title: string,
        public url: string,
        public text: string,
        public date_upload: Date,
        public time_upload: string,
    ) { }
}