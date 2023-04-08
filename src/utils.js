export const stripURL = string => {
  if (string.startsWith(location.protocol)) string.slice(0, location.protocol.length - 1)
  if (string.startsWith(location.host)) string.slice(0, location.host.length - 1)
  return string
}

export const isBang = string => {
  const stripped = stripURL(string)
  if (stripped.includes('#!/')) return true
  return false
}

export const bang = string => `#!/${string}`

export const debang = string => string.split('#!/')[1]