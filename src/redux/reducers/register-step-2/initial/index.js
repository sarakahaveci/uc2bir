import AwesomeIcon from "../../../../statics/icon"

export const macro = [
    {
        type: "date",
        required: true,
        name: "birthday",
        forHtml: "birthday",
        text: "Doğum Tarihi"
    },
    {
        type: "select",
        required: true,
        name: "genre",
        forHtml: "genre",
        text: "Cinsiyet",
        icon: AwesomeIcon.Gender,
        items: [
            {
                id: 1,
                val: "e",
                text: "Erkek" 
            },
            {
                id: 2,
                val: "k",
                text: "Kadın" 
            }
        ]
    },
    {
        type: "text",
        required: false,
        name: "about",
        forHtml: "about",
        text: "Hakkında",
        icon: AwesomeIcon.AddressCard
    },
    {
        type: "select",
        required: true,
        name: "city",
        forHtml: "city",
        text: "İl Seçiniz",
    },
    {
        type: "select",
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
        text: "Adres",
        icon: AwesomeIcon.Map
    },
    {
        type: "text",
        required: false,
        name: "address_detail",
        forHtml: "address_detail",
        text: "Açık Adres",
        icon: AwesomeIcon.Map
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