import React from 'react'

import { ContextType } from 'frontend/types'

const initialContext: ContextType = {
  epic: {
    library: [],
    login: async () => Promise.resolve(''),
    logout: async () => Promise.resolve()
  },
  gog: {
    library: [],
    login: async () => Promise.resolve(''),
    logout: async () => Promise.resolve()
  },
  amazon: {
    library: [],
    getLoginData: async () =>
      Promise.resolve({
        client_id: '',
        code_verifier: '',
        serial: '',
        url: ''
      }),
    login: async () => Promise.resolve(''),
    logout: async () => Promise.resolve()
  },
  sideloadedLibrary: [],
  refresh: async () => Promise.resolve(),
  refreshLibrary: async () => Promise.resolve(),
  refreshWineVersionInfo: async () => Promise.resolve(),
  refreshing: false,
  refreshingInTheBackground: true,
  currentCustomCategories: [],
  setCurrentCustomCategories: () => null,
  customCategories: {
    list: {},
    listCategories: () => [],
    addToGame: () => null,
    removeFromGame: () => null,
    addCategory: () => null,
    removeCategory: () => null,
    renameCategory: () => null
  },
  zoomPercent: 100,
  setZoomPercent: () => null,
  allTilesInColor: false,
  setAllTilesInColor: () => null,
  titlesAlwaysVisible: false,
  setTitlesAlwaysVisible: () => null,
  hideChangelogsOnStartup: false,
  setHideChangelogsOnStartup: () => null,
  lastChangelogShown: null,
  setLastChangelogShown: () => null
}

export default React.createContext(initialContext)
