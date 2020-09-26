import { createSlice } from '@reduxjs/toolkit'
import { light, dark } from 'styles/themes'

const localTheme = localStorage.getItem('theme')

const themeReducer = createSlice({
  name: 'theme',
  initialState: localTheme === 'light' || !localTheme ? light : dark,
  reducers: {
    changeTheme: state => {
      localStorage.setItem('theme', state.name === 'light' ? 'dark' : 'light')
      return state.name === 'light' ? dark : light
    },
  },
})

export default themeReducer