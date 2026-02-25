
export const formatDate = (timestamp) => {
  if (!timestamp) return "Guardando..."

  // Timestamp de Firebase
  if (timestamp?.seconds) {
    return new Date(timestamp.seconds * 1000).toLocaleDateString()
  }

  // Date normal
  if (timestamp instanceof Date) {
    return timestamp.toLocaleDateString()
  }

  // string o number
  const date = new Date(timestamp)
  return isNaN(date) ? "" : date.toLocaleDateString()
}