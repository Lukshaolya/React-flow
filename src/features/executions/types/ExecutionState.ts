enum ExecutionState {
    Pending = 1,
    Running = 2,
    Finished = 4,
    Failed = 8,
    Canceled = 16
}

export default ExecutionState;