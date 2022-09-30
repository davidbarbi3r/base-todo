import {Dayjs} from "dayjs"

export default interface ITodo {
    userId: string
    text: string | undefined
    important: boolean
    urgent: boolean
    done: boolean
    creationDate: string
    echeanceDate?: string | null
    id: string
    type: FormDataEntryValue | null
}
