import { ipcRenderer, TitleBarOverlay } from 'electron'
import {
  Runner,
  WineCommandArgs,
  ConnectivityStatus,
  GameSettings,
  RunWineCommandArgs
} from 'common/types'
import { GOGCloudSavesLocation } from 'common/types/gog'
import {
  makeListenerCaller as lc,
  makeHandlerInvoker as hi,
  frontendListenerSlot as fls
} from 'common/ipc/frontend'

export const notify = lc('notify')
export const openLoginPage = lc('openLoginPage')
export const openSidInfoPage = lc('openSidInfoPage')
export const openSupportPage = lc('openSupportPage')
export const quit = lc('quit')
export const showAboutWindow = lc('showAboutWindow')
export const openDiscordLink = lc('openDiscordLink')
export const openWinePrefixFAQ = lc('openWinePrefixFAQ')
export const openCustomThemesWiki = lc('openCustomThemesWiki')
export const createNewWindow = lc('createNewWindow')

export const readConfig = hi('readConfig')

export const isLoggedIn = hi('isLoggedIn')

export const writeConfig = hi('writeConfig')

export const kill = hi('kill')

export const abort = (id: string) => ipcRenderer.send('abort', id)

export const getUserInfo = async () => ipcRenderer.invoke('getUserInfo')

export const getAmazonUserInfo = async () =>
  ipcRenderer.invoke('getAmazonUserInfo')

export const syncSaves = async (args: {
  arg: string | undefined
  path: string
  appName: string
  runner: Runner
}) => ipcRenderer.invoke('syncSaves', args)

export const getDefaultSavePath = async (
  appName: string,
  runner: Runner,
  alreadyDefinedGogSaves: GOGCloudSavesLocation[] = []
) =>
  ipcRenderer.invoke(
    'getDefaultSavePath',
    appName,
    runner,
    alreadyDefinedGogSaves
  )
export const getGameInfo = async (appName: string, runner: Runner) =>
  ipcRenderer.invoke('getGameInfo', appName, runner)
export const getExtraInfo = async (appName: string, runner: Runner) =>
  ipcRenderer.invoke('getExtraInfo', appName, runner)

export const getLaunchOptions = async (appName: string, runner: Runner) =>
  ipcRenderer.invoke('getLaunchOptions', appName, runner)

export const getPrivateBranchPassword = async (appName: string) =>
  ipcRenderer.invoke('getPrivateBranchPassword', appName)
export const setPrivateBranchPassword = async (
  appName: string,
  password: string
) => ipcRenderer.invoke('setPrivateBranchPassword', appName, password)

// REDmod integration
export const getAvailableCyberpunkMods = async () =>
  ipcRenderer.invoke('getAvailableCyberpunkMods')
export const setCyberpunModConfig = async (props: {
  enabled: boolean
  modsToLoad: string[]
}) => ipcRenderer.invoke('setCyberpunkModConfig', props)

export const getGameSettings = async (
  appName: string,
  runner: Runner
): Promise<GameSettings | null> =>
  ipcRenderer.invoke('getGameSettings', appName, runner)

export const getInstallInfo = hi('getInstallInfo')

export const runWineCommand = async (args: WineCommandArgs) =>
  ipcRenderer.invoke('runWineCommand', args)

export const runWineCommandForGame = async (args: RunWineCommandArgs) =>
  ipcRenderer.invoke('runWineCommandForGame', args)

export const onConnectivityChanged = fls('connectivity-changed')

export const getConnectivityStatus = async () =>
  ipcRenderer.invoke('get-connectivity-status')

export const setConnectivityOnline = async () =>
  ipcRenderer.send('set-connectivity-online')

export const connectivityChanged = async (newStatus: ConnectivityStatus) =>
  ipcRenderer.send('connectivity-changed', newStatus)

export const isNative = async (args: { appName: string; runner: Runner }) =>
  ipcRenderer.invoke('isNative', args)

export const getThemeCSS = async (theme: string) =>
  ipcRenderer.invoke('getThemeCSS', theme)

export const getCustomThemes = async () => ipcRenderer.invoke('getCustomThemes')

export const setTitleBarOverlay = (options: TitleBarOverlay) =>
  ipcRenderer.send('setTitleBarOverlay', options)

export const isGameAvailable = async (args: {
  appName: string
  runner: Runner
}) => ipcRenderer.invoke('isGameAvailable', args)
