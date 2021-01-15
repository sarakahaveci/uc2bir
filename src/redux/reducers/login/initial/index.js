export const macro = [
    {
        type: "email",
        required: true,
        name: "email",
        forHtml: "email",
        text: "E mail veya Telefon"
    },
    {
        type: "password",
        required: true,
        name: "password",
        forHtml: "password",
        text: "Şifre"
    },
    {
        type: "checkbox",
        required: false,
        name: "remember_me",
        forHtml: "remember_me",
        text: "Beni Hatırla"
    }
]

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