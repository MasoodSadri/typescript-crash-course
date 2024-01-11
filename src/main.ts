import { v4 as uuidv4 } from 'uuid'

import './index.css'

type Item = {
  id: string
  name: string
  email: string
}

const form = document.querySelector<HTMLFormElement>('#add-user-form')

const name = document.querySelector<HTMLInputElement>('#name')
const email = document.querySelector<HTMLInputElement>('#email')

const users = document.querySelector<HTMLDivElement>('#user-list')

const userList: Item[] = loadUsers()

userList.forEach(addUser)

form?.addEventListener('submit', (e) => {
  e.preventDefault()

  if (name?.value === undefined || email?.value === undefined) return

  const userItem: Item = {
    id: uuidv4(),
    name: name.value,
    email: email.value,
  }

  userList.push(userItem)

  addUser(userItem)

  saveUsers()

  name.value = ''
  email.value = ''
})

function addUser(item: Item) {
  const container = document.createElement('div')

  const nameElement = document.createElement('p')
  const emailElement = document.createElement('p')

  nameElement.append(item.name)
  emailElement.append(item.email)

  container.append(nameElement, emailElement)

  users?.append(container)

  container.classList.add(
    'p-6',
    'bg-slate-800',
    'rounded-md',
    'text-center',
    'text-slate-200'
  )
}

function saveUsers() {
  localStorage.setItem('items', JSON.stringify(userList))
}

function loadUsers(): Item[] {
  const data = localStorage.getItem('items')

  if (data == null) return []

  return JSON.parse(data)
}
