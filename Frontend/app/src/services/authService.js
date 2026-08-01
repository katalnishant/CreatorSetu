export function getStoredUsers() {
  return JSON.parse(localStorage.getItem('creatorSetuUsers') || '[]')
}

export function saveUsers(users) {
  localStorage.setItem('creatorSetuUsers', JSON.stringify(users))
}
