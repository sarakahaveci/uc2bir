export const macro = [
    
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

export const create = {
    email: "",
    phone: "",
    user_token: null,
}

export const model = {
    ...create,
    data: [],
    type: "success",
    code: 200,
    message: ""
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
    result: false,
    response: false,
    error: undefined,
}