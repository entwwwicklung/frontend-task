import editor from './modules/editor';
import { createStore, createLogger } from 'vuex';

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    editor
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})