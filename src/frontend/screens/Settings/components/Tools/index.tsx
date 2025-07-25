import './index.scss'

import { useContext, useState } from 'react'

import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { getGameInfo } from 'frontend/helpers'

import SettingsContext from '../../SettingsContext'
import ContextProvider from 'frontend/state/ContextProvider'
import { Winetricks } from 'frontend/components/UI'

export default function Tools() {
  const { t } = useTranslation()
  const [winecfgRunning, setWinecfgRunning] = useState(false)
  const [winetricksRunning, setWinetricksRunning] = useState(false)
  const [runExeRunning, setRunExeRunning] = useState(false)
  const { appName, runner, isDefault } = useContext(SettingsContext)
  const { platform } = useContext(ContextProvider)
  const isWindows = platform === 'win32'

  if (isDefault || isWindows || !runner) {
    return <></>
  }

  const callTools = async (tool: 'winecfg' | 'runExe', exe?: string) => {
    const toolStates = {
      winecfg: setWinecfgRunning,
      runExe: setRunExeRunning
    }

    if (tool in toolStates) {
      toolStates[tool](true)
    }

    await window.api.callTool({
      tool,
      exe,
      appName,
      runner
    })

    if (tool in toolStates) {
      toolStates[tool](false)
    }
  }

  const handleRunExe = async () => {
    let exe = ''
    const gameinfo = await getGameInfo(appName, runner)
    if (!gameinfo) return
    const defaultPath =
      gameinfo.runner === 'sideload' ? undefined : gameinfo.install.install_path

    const path = await window.api.openDialog({
      buttonLabel: t('box.select.button', 'Select'),
      properties: ['openFile'],
      title: t('box.runexe.title', 'Select EXE to Run'),
      defaultPath
    })
    if (path) {
      exe = path
      callTools('runExe', exe)
    }
  }

  function openWinetricksDialog() {
    setWinetricksRunning(true)
  }

  function winetricksDialogClosed() {
    setWinetricksRunning(false)
  }

  return (
    <>
      <div data-testid="toolsSettings" className="settingsTools">
        {winetricksRunning && (
          <Winetricks onClose={winetricksDialogClosed} runner={runner} />
        )}
        <div className="toolsWrapper">
          <button
            data-testid="wineCFG"
            className={classNames('button outline', { active: winecfgRunning })}
            onClick={async () => callTools('winecfg')}
          >
            <span className="toolTitle">Winecfg</span>
          </button>
          <button
            data-testid="wineTricks"
            className="button outline"
            onClick={async () => openWinetricksDialog()}
          >
            <span className="toolTitle">Winetricks</span>
          </button>
          <a
            className={classNames('button outline', {
              active: runExeRunning
            })}
            onClick={handleRunExe}
          >
            {t('setting.runexe.title')}
          </a>
        </div>
      </div>
    </>
  )
}
