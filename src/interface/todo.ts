export default interface ITodo {
    userId: string
    text: string | undefined
    important: boolean
    urgent: boolean
    done: boolean
    creationDate: Date
    id: string
}

export const DEFAULT_TODO = {
    userId: "",
    text: "Sample Todo",
    important: false,
    urgent: false,
    done: false,
    creationDate: new Date(),
    id: "0"
}