// eslint-disable-next-line no-restricted-imports
import { ipcRenderer, type IpcRendererEvent } from 'electron'

import type { AsyncIPCFunctions, SyncIPCFunctions } from './types'

// Creates a Promise<T> only if T isn't already a promise
type PromiseOnce<T> = T extends Promise<unknown> ? T : Promise<T>

// Returns a function calling an IPC listener created by the backend, accepting
// that listeners parameters
function makeListenerCaller<ChannelName extends keyof SyncIPCFunctions>(
  channel: ChannelName
) {
  return (...args: Parameters<SyncIPCFunctions[ChannelName]>) =>
    ipcRenderer.send(channel, ...args)
}

// Like `makeListenerCaller`, but for IPC handlers instead
function makeHandlerInvoker<ChannelName extends keyof AsyncIPCFunctions>(
  channel: ChannelName
) {
  return (...args: Parameters<AsyncIPCFunctions[ChannelName]>) =>
    ipcRenderer.invoke(channel, ...args) as PromiseOnce<
      ReturnType<AsyncIPCFunctions[ChannelName]>
    >
}

// Returns a function the Frontend can call to add a listener to this channel
// The listener has to accept the Parameters specified with the Params type
function frontendListenerSlot<Params extends unknown[]>(channel: string) {
  return (listener: (e: IpcRendererEvent, ...args: Params) => void) =>
    ipcRenderer.on(channel, listener as never)
}

export { makeListenerCaller, makeHandlerInvoker, frontendListenerSlot }
