import { createSlice } from '@reduxjs/toolkit'

const localAuth = localStorage.getItem('@SLab_ac_token')

const authReducer = createSlice({
  name: 'auth',
  initialState: localAuth === 'false' || !localAuth ? false : true,
  reducers: {
    authorize: state => true,
    logout: state => false
  }
})

export default authReducer