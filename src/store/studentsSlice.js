import { createSlice } from "@reduxjs/toolkit";

const StudentsList = [
  
];

const studentsSlice = createSlice({
  name: "students",
  initialState: { items: StudentsList },
  reducers: {
    setStudents:(state,action)=>{
      state.items = action.payload;
    },
    addStudent: (state, action) => {
      const student = {
        id: Date.now().toString(),
        fullName: action.payload.fullName,
        email: action.payload.email,
        phone: action.payload.phone,
        address: action.payload.address,
        profilePicture: action.payload.profilePicture || "",
      };
      state.items.unshift(student);
    },
    updateStudent: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    deleteStudent: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addStudent, updateStudent,setStudents, deleteStudent } = studentsSlice.actions;

export default studentsSlice.reducer;
