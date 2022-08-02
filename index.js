#!/usr/bin/env node

// @ts-check
import { execSync } from 'node:child_process'
import { exit } from 'node:process'
import prompts from 'prompts'
import { magenta, red, reset, yellow } from 'kolorist'

function getOptions() {
  let commitStart
  let stagedStart
  let trackedStart
  let unCommited = []
  let unStaged = []
  let unTracked = []

  const matchUnCommited = '  (use "git restore --staged <file>..." to unstage)'
  const matchUnStaged = '  (use "git restore <file>..." to discard changes in working directory)'
  const matchUntracked = '  (use "git add <file>..." to include in what will be committed)'
  const noChanges = 'no changes added to commit (use "git add" and/or "git commit -a")'
  const nothingAdded = 'nothing added to commit but untracked files present (use "git add" to track)'
  const statusCommand = 'git status'
  const status = execSync(statusCommand).toString()
  const words = status.split('\n')

  words.forEach((word, idx) => {
    if (word === matchUnStaged)
      stagedStart = idx

    if (word === matchUntracked)
      trackedStart = idx

    if (word === matchUnCommited)
      commitStart = idx
  })

  if (commitStart) {
    if (stagedStart) { unCommited = words.slice(commitStart + 1, stagedStart - 3) }
    else {
      if (trackedStart) {
        unCommited = words.slice(commitStart + 1, trackedStart - 2)
      }
      else {
        unCommited = words.slice(commitStart + 1).filter((word) => {
          return word.trim() !== '' && word !== noChanges && word !== nothingAdded
        })
      }
    }
  }

  if (stagedStart) {
    if (trackedStart) { unStaged = words.slice(stagedStart + 1, trackedStart - 2) }
    else {
      unStaged = words.slice(stagedStart + 1).filter((word) => {
        return word.trim() !== '' && word !== noChanges && word !== nothingAdded
      })
    }
  }

  if (trackedStart) {
    unTracked = words.slice(trackedStart + 1).filter((word) => {
      return word.trim() !== '' && word !== noChanges && word !== nothingAdded
    })
  }

  const parsedUnCommit = unCommited.map((item) => {
    return item.slice(13)
  })

  const parsedUnStaged = unStaged.map((item) => {
    return item.slice(13)
  })

  const parsedUnTracked = unTracked.map((item) => {
    return item.slice(1)
  })

  return {
    options: parsedUnStaged.concat(parsedUnTracked),
    parsedUnCommit,
  }
}

async function init() {
  // 1. 生成所有的更改的文件
  const { options, parsedUnCommit } = getOptions()

  let result = {}

  if (options && options.length) {
    const choices = options.map((option) => {
      return {
        title: magenta(option),
        value: option,
      }
    })

    try {
      result = await prompts([
        {
          type: 'multiselect',
          name: 'files',
          message: reset('Pick files'),
          choices,
        },
      ], {
        onCancel: () => {
          throw new Error(`${red('✖')} Operation cancelled`)
        },
      })
    }

    catch (cancelled) {
      // eslint-disable-next-line no-console
      console.log(cancelled.message)
      exit(1)
    }
  }
  else {
    if (parsedUnCommit && parsedUnCommit.length) {
      // eslint-disable-next-line no-console
      console.log(yellow('tips🚨: \nyou have no changed files, but staged area is not empty. \nso you can commit.\n'))
      exit(0)
    }

    // eslint-disable-next-line no-console
    console.log(yellow('🚨 you have no changed files.'))
    exit(1)
  }

  const { files } = result

  let gitAdd = 'git add'

  files.forEach((file) => {
    gitAdd += ` ${file}`
  })

  await execSync(gitAdd)
}

init().catch((e) => {
  console.error(e)
})
