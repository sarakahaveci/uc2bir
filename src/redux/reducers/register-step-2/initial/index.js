export const macro = [
    {
        type: "date",
        required: true,
        name: "birthday",
        forHtml: "birthday",
        text: "Doğum Tarihi"
    },
    {
        type: "text",
        required: true,
        name: "genre",
        forHtml: "genre",
        text: "Cinsiyet"
    },
    {
        type: "text",
        required: false,
        name: "about",
        forHtml: "about",
        text: "Hakkında"
    },
    {
        type: "text",
        required: true,
        name: "city",
        forHtml: "city",
        text: "İl Seçiniz"
    },
    {
        type: "text",
        required: true,
        name: "town",
        forHtml: "town",
        text: "İlçe Seçiniz"
    },
    {
        type: "text",
        required: true,
        name: "district",
        forHtml: "district",
        text: "Adres"
    },
    {
        type: "text",
        required: false,
        name: "address_detail",
        forHtml: "address_detail",
        text: "Açık Adres"
    },
]

export const inputs = {
    birthday: "",
    genre: "",
    about: "",
    city: "",
    town: "",
    district: "",
    address_detail: "",
}

export const model = {
    message: {
        ...inputs
    },
    info: false,
    warning: false,
    error: false,
    code: 0,
}

export const initialState = {
    loading: false,
    entity: model,
    entities: [],
    update: model,
    delete: model,
    isSuccess: false,
    deleteSuccess: false,
    updateSuccess: false,
    error: undefined,
}