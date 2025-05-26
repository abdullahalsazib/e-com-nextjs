export type NestedItem = {
    title: string;
    link: string;
};


export type SubItem = {
    title: string;
    link: string;
    nested?: NestedItem[];
};

export type Item = {
    title: string;
    link: string;
    dropDown?: boolean;
    content?: SubItem[];
};
