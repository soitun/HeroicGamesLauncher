import { addTestOnlyListener } from 'backend/ipc'
import { RunnerCommandStub } from 'common/types'

/*
 * Multiple parts of a command can be set for the stub to be able to stub
 * similar commands
 *
 * The first stub for which all commandParts are included in the executed
 * command will be selected. The stubs should be declared from more
 * precise to less precise to avoid unreachable stubs.
 *
 * We can stub a Promise<ExecResult> as a response, or stub stdout/stderr
 * values as an alternative to make the stubbing easier
 */
const defaultStubs: RunnerCommandStub[] = [
  {
    commandParts: ['--version'],
    stdout: '1.0.0 Jonathan Joestar'
  }
]

let currentStubs = [...defaultStubs]

export const runNileCommandStub = async (command: string[]) => {
  const stub = currentStubs.find((stub) =>
    stub.commandParts.every((part) => command.includes(part))
  )

  if (stub?.response) return stub.response

  return Promise.resolve({
    stdout: stub?.stdout || '',
    stderr: stub?.stderr || ''
  })
}

// Add listeners to be called from e2e tests to stub the nile command calls
addTestOnlyListener(
  'setNileCommandStub',
  (stubs) => (currentStubs = [...stubs])
)
addTestOnlyListener(
  'resetNileCommandStub',
  () => (currentStubs = [...defaultStubs])
)
