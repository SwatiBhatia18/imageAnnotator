export const formatDate = (date) => {
  if (!date) return ""

  try {
    const d = typeof date === "string" ? new Date(date) : date

    if (isNaN(d.getTime())) {
      return "Invalid date"
    }

    return d.toLocaleString("en-US", {
      month: "short", // e.g. "Apr"
      day: "numeric", // e.g. 30
      year: "numeric", // e.g. 2025
      hour: "2-digit", // e.g. 04
      minute: "2-digit", // e.g. 36
      hour12: true, // shows AM/PM
    })
  } catch (error) {
    return ""
  }
}

export const debounce = (func, wait) => {
  let timeout = null

  return function (...args) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result) // base64 string
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })
