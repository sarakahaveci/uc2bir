import AwesomeIcon from "../../../../statics/icon"

export const macro = [
    {
        type: "radio",
        required: true,
        name: "s1",
        forHtml: "s1",
        text: "1. Kalp rahatsızlığınız var mı?",
        items: [
            {
                id: 1,
                val: "1",
                label: "Evet"
            },
            {
                id: 2,
                val: "0",
                label: "Hayır"
            }
        ]
    },
    {
        type: "radio",
        required: true,
        name: "s2",
        forHtml: "s2",
        text: "2. Kalbiniz ya da göğsünüzde sık sık ağrı olur mu?",
        items: [
            {
                id: 1,
                val: "1",
                label: "Evet"
            },
            {
                id: 2,
                val: "0",
                label: "Hayır"
            }
        ]
    },
    {
        type: "radio",
        required: true,
        name: "s3",
        forHtml: "s3",
        text: "3. Sıkça kendinizi güçsüz hisseder misiniz ya da şiddetli baş dönmesi nöbetleriniz olur mu?",
        items: [
            {
                id: 1,
                val: "1",
                label: "Evet"
            },
            {
                id: 2,
                val: "0",
                label: "Hayır"
            }
        ]
    },
    {
        type: "radio",
        required: true,
        name: "s4",
        forHtml: "s4",
        text: "4. Doktorunuz size yüksek tansiyon tanısı koydu mu?",
        items: [
            {
                id: 1,
                val: "1",
                label: "Evet"
            },
            {
                id: 2,
                val: "0",
                label: "Hayır"
            }
        ]
    },
    {
        type: "radio",
        required: true,
        name: "s5",
        forHtml: "s5",
        text: "5. Doktorunuz size yüksek tansiyon tanısı koydu mu?",
        items: [
            {
                id: 1,
                val: "1",
                label: "Evet"
            },
            {
                id: 2,
                val: "0",
                label: "Hayır"
            }
        ]
    },
    {
        type: "radio",
        required: true,
        name: "s6",
        forHtml: "s6",
        text: "6. Doktorunuz size yüksek tansiyon tanısı koydu mu?",
        items: [
            {
                id: 1,
                val: "1",
                label: "Evet"
            },
            {
                id: 2,
                val: "0",
                label: "Hayır"
            }
        ]
    },
    {
        type: "radio",
        required: true,
        name: "s7",
        forHtml: "s7",
        text: "7. Doktorunuz size yüksek tansiyon tanısı koydu mu?",
        items: [
            {
                id: 1,
                val: "1",
                label: "Evet"
            },
            {
                id: 2,
                val: "0",
                label: "Hayır"
            }
        ]
    },
    {
        type: "radio",
        required: true,
        name: "s8",
        forHtml: "s8",
        text: "8. Doktorunuz size yüksek tansiyon tanısı koydu mu?",
        items: [
            {
                id: 1,
                val: "1",
                label: "Evet"
            },
            {
                id: 2,
                val: "0",
                label: "Hayır"
            }
        ]
    },
    {
        type: "radio",
        required: true,
        name: "s9",
        forHtml: "s9",
        text: "9. Doktorunuz size yüksek tansiyon tanısı koydu mu?",
        items: [
            {
                id: 1,
                val: "1",
                label: "Evet"
            },
            {
                id: 2,
                val: "0",
                label: "Hayır"
            }
        ]
    },
    {
        type: "radio",
        required: true,
        name: "s10",
        forHtml: "s10",
        text: "10. Doktorunuz size yüksek tansiyon tanısı koydu mu?",
        items: [
            {
                id: 1,
                val: "1",
                label: "Evet"
            },
            {
                id: 2,
                val: "0",
                label: "Hayır"
            }
        ]
    },
    {
        type: "radio",
        required: true,
        name: "s11",
        forHtml: "s11",
        text: "11. Doktorunuz size yüksek tansiyon tanısı koydu mu?",
        items: [
            {
                id: 1,
                val: "1",
                label: "Evet"
            },
            {
                id: 2,
                val: "0",
                label: "Hayır"
            }
        ]
    },
    {
        type: "radio",
        required: true,
        name: "s12",
        forHtml: "s12",
        text: "12. Doktorunuz size yüksek tansiyon tanısı koydu mu?",
        items: [
            {
                id: 1,
                val: "1",
                label: "Evet"
            },
            {
                id: 2,
                val: "0",
                label: "Hayır"
            }
        ]
    },
    {
        type: "radio",
        required: true,
        name: "s13",
        forHtml: "s13",
        text: "13. Doktorunuz size yüksek tansiyon tanısı koydu mu?",
        items: [
            {
                id: 1,
                val: "1",
                label: "Evet"
            },
            {
                id: 2,
                val: "0",
                label: "Hayır"
            }
        ]
    },
    {
        type: "radio",
        required: true,
        name: "s14",
        forHtml: "s14",
        text: "14. Doktorunuz size yüksek tansiyon tanısı koydu mu?",
        items: [
            {
                id: 1,
                val: "1",
                label: "Evet"
            },
            {
                id: 2,
                val: "0",
                label: "Hayır"
            }
        ]
    },
]

export const inputs = {
    s1: "",
    s2: "",
    s3: "",
    s4: "",
    s5: "",
    s6: "",
    s7: "",
    s8: "",
    s9: "",
    s10: "",
    s11: "",
    s12: "",
    s13: "",
    s14: "",
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