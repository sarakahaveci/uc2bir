import AwesomeIcon from "../../../../statics/icon"

export const macro = [
    {
        type: "text",
        required: true,
        name: "name",
        forHtml: "name",
        text: "Ad Soyad",
        icon: AwesomeIcon.User,
    },
    {
        type: "email",
        required: true,
        name: "email",
        forHtml: "email",
        text: "E-mail",
        icon: AwesomeIcon.Envolope,
    },
    {
        type: "text",
        required: true,
        name: "phone",
        forHtml: "phone",
        text: "Telefon (05XXXXXXXXX)",
        icon: AwesomeIcon.Phone,
    },
    {
        type: "password",
        required: true,
        name: "password",
        forHtml: "password",
        text: "Şifre",
        icon: AwesomeIcon.Lock,
    },
    {
        type: "checkbox",
        required: true,
        name: "agreement",
        forHtml: "agreement",
        text: "Üyelik Sözleşmesini ve Ekleri’ni kabul ediyorum."
    },
    {
        type: "checkbox",
        required: true,
        name: "health_status",
        forHtml: "health_status",
        text: "Sağlık muvafakatnamesi okudum, onaylıyorum."
    },
    {
        type: "checkbox",
        required: true,
        name: "kvkk",
        forHtml: "kvkk",
        text: "KVKK okudum, onaylıyorum."
    },
]

export const inputs = {
    name: "",
    email: "",
    phone: "",
    password: "",
    type_id: 1,
    kvkk: 0,
    agreement: 0,
    health_status: 0,
}

export const model = {
    token: false,
    refresh_token: false,
    user: {},
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