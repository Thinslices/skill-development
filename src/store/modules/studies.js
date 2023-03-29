import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import {getBaseUrl} from "../../utils/api"

const initialState = {
  data: []
}

export const studiesSlice = createSlice({
  name: 'studies',
  initialState,
  reducers: {
    SET_STATE (state, {payload: {key, value}}) {
      state[key] = value;
    },
  }
})

export const {
  SET_STATE
} = studiesSlice.actions;

export const get_studies = () => async function (dispatch, getState) {
  try {
    const url = '/api/trpc/study.getAll?batch=1&input=%7B%220%22%3A%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D%7D'
    const { data } = await axios.get(url)
    dispatch(SET_STATE({key: 'data', value: data[0].result.data.json}))
  }
  catch (err) {
    console.log(err)
  }
}

export default studiesSlice.reducer;
