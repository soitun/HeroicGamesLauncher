// eslint-disable-next-line no-restricted-imports
import { ipcMain, type IpcMainEvent } from 'electron'

import type { AsyncIPCFunctions, SyncIPCFunctions } from './types'

function addListener<ChannelName extends keyof SyncIPCFunctions>(
  channel: ChannelName,
  listener: (
    e: IpcMainEvent,
    ...args: Parameters<SyncIPCFunctions[ChannelName]>
  ) => void
) {
  ipcMain.on(channel, listener as never)
}

function addHandler<ChannelName extends keyof AsyncIPCFunctions>(
  channel: ChannelName,
  handler: (
    e: IpcMainEvent,
    ...args: Parameters<AsyncIPCFunctions[ChannelName]>
  ) => ReturnType<AsyncIPCFunctions[ChannelName]>
) {
  ipcMain.handle(channel, handler as never)
}

export { addListener, addHandler }
