import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface NodeEditorState {
	id: number | undefined;
    type: 'pipeline' | 'pipeline-execution' | undefined;
}

const initialState: NodeEditorState = {
	id: undefined,
    type: undefined
};


const nodeEditorSlice = createSlice({
	name: 'nodeEditorSlice',
	initialState,
	reducers: {
		openNodeEditor(state, action: PayloadAction<{id: number, type: 'pipeline' | 'pipeline-execution'}>) {
			state.id = action.payload.id;
			state.type = action.payload.type;
		}
	}
});

export const { openNodeEditor } = nodeEditorSlice.actions;

export default nodeEditorSlice.reducer;