export const hey = (query) => {

    const yelling = () => query.match(/[A-Z]/) && query==query.toUpperCase()
    const question = () => query.trimEnd().endsWith("?")
    const silence = () => query.trim().length == 0
    const shoutedQuestion = () => yelling() && question()

    switch(true) {
      case silence():
        return 'Fine. Be that way!'
      case shoutedQuestion():
        return 'Calm down, I know what I\'m doing!'
      case yelling():
        return 'Whoa, chill out!'
      case question():
        return 'Sure.'
      default:
        return "Whatever."
    }
  }