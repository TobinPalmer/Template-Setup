import prompts from 'prompts'
import { exec } from 'child_process'

const gitUrl = 'https://github.com/BrandonKirbyson/Templates'

;(async () => {
  let templateUrl = ''

  const projectName: string =
    (
      await prompts({
        type: 'text',
        name: 'name',
        message: 'Project Name',
      })
    ).name || 'project'

  const templateResponse = await prompts({
    type: 'select',
    name: 'projectType',
    message: 'What kind of project are you making?',
    choices: [
      { title: 'Node', value: 'node' },
      { title: 'Web', value: 'web' },
    ],
  })

  switch (templateResponse.projectType) {
    case 'node': {
      templateUrl += 'node-'
      const nodeResponse = await prompts({
        type: 'select',
        name: 'nodeProjectType',
        message: 'What kind of Node project are you making?',
        choices: [
          { title: 'Typescript', value: 'typescript' },
          { title: 'Javascript', value: 'javascript' },
          { title: 'Express Typescript', value: 'express-typescript' },
          { title: 'Express Javascript', value: 'express-javascript' },
        ],
      })
      templateUrl += nodeResponse.nodeProjectType
      break
    }
    case 'web': {
      templateUrl += 'web-'
      const languageResponse = await prompts({
        type: 'select',
        name: 'webLangType',
        message: 'What language do you want to use',
        choices: [
          { title: 'Typescript', value: 'typescript' },
          { title: 'Javascript', value: 'javascript' },
        ],
      })
      const styleResponse = await prompts({
        type: 'select',
        name: 'webStyleType',
        message: 'What stylesheet do you want to use',
        choices: [
          { title: 'SCSS', value: 'scss' },
          { title: 'CSS', value: 'css' },
        ],
      })
      templateUrl += `${languageResponse.webLangType}-${styleResponse.webStyleType}`
      break
    }
    default:
      break
  }

  const command = `
  git clone -n --depth=1 --filter=tree:0 \
  ${gitUrl} ${projectName}
  cd ${projectName}
  git sparse-checkout set --no-cone ${templateUrl}
  git checkout
  mv ${templateUrl}/* ./
  rm -rf .git
  rm -rf ${templateUrl}
  `

  exec(command, (err, stdout, stderr) => {
    if (err) throw new Error(`Couldn't clone the repo${err}`)
    if (stderr) console.log(stderr)
    else console.log('\n')
    console.log(
      `\x1b[32mSuccessfully \x1b[37mcreated \x1b[36m${projectName} \x1b[37mfrom template \x1b[36m${templateUrl}\x1b[37m!`,
    )
  })
})()
