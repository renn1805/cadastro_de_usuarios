import { TaskStatus } from "./enum/TaskStatus";
import { TaskDifficulty } from "./enum/TaskDifficulty";
export default class Task {

    #taskId: number

    #taskName: string;
    get taskName() {
        return this.#taskName
    }

    #taskDescription: string;
    get taskDescription() {
        return this.#taskDescription
    }

    #taskState: TaskStatus = TaskStatus.Pending
    get taskState() {
        return this.#taskState
    }
    set changeTaskState(newState: TaskStatus) {
        this.#taskState = newState
    }

    #taskDifficulty: TaskDifficulty = TaskDifficulty.Undefined
    get taskDifficulty() {
        return this.#taskDifficulty
    }
    set changeTaskDifficulty(newDifficulty: TaskDifficulty) {
        this.#taskDifficulty = newDifficulty
    }



    constructor(
        id: number,
        name: string,
        description: string,
        status: TaskStatus,
        difficulty: TaskDifficulty
    ) {
        this.#taskId = id
        this.#taskName = name
        this.#taskDescription = description
        this.#taskDifficulty = difficulty
        this.#taskState = status
    }


    toJSON() {

        return {
            taskId: this.#taskId,
            taskName: this.#taskName,
            taskDescription: this.#taskDescription,
            taskState: this.#taskState,
            taskDifficulty: this.#taskDifficulty
        }
    }

}