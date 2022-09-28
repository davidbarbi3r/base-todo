import {Dayjs} from "dayjs"

export default interface ITodo {
    userId: string
    text: string | undefined
    important: boolean
    urgent: boolean
    done: boolean
    creationDate: number
    echeanceDate?: Date | null
    id: string
}
