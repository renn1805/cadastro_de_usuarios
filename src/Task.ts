import { TaskDifficulty } from "./enum/TaskDifficulty";
import { TaskStatus } from "./enum/TaskStatus";
export default class Task {

    #id: number
    #title: string;
    #description: string;
    #status: TaskStatus = TaskStatus.Pending
    #difficulty: TaskDifficulty = TaskDifficulty.Undefined
    
    constructor(
        id: number,
        name: string,
        description: string,
        status: TaskStatus,
        difficulty: TaskDifficulty
    ) {
        this.#id = id
        this.#title = name
        this.#description = description
        this.#difficulty = difficulty
        this.#status = status
    }
    
    get title() {return this.#title}
    get description() {return this.#description}

    get difficulty() {return this.#difficulty}
    set difficulty(newDifficulty: TaskDifficulty) {this.#difficulty = newDifficulty}

    get status() {return this.#status}
    set status(newstatus: TaskStatus) {this.#status = newstatus}
    
    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            description: this.#description,
            status: this.#status,
            difficulty: this.#difficulty
        }
    }
    
}