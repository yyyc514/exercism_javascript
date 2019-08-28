// how will bob respond when a given analyzer matches
// analyzers are checked in the order they appear here
const Bob = {
    responses: {
      silence: 'Fine. Be that way!',
      shoutedQuestion: 'Calm down, I know what I\'m doing!',
      yelling: 'Whoa, chill out!',
      question: 'Sure.',
      default: "Whatever."
  }
}

const emptyString = (s) => s.trim().length == 0

// analyze a query and return true or false
// based on whether the analysis matches the query or not
const analyzers = {
  silence : (query) => emptyString(query),
  yelling : (query) => query.match(/[A-Z]/) && query==query.toUpperCase(),
  question : (query) => query.trimEnd().endsWith("?"),
  shoutedQuestion : (query) => analyzers.yelling(query) && analyzers.question(query)
}

const responder = (responders) => {
  // create a closure with responders
  return (query) => {
    for (let [queryType, response] of Object.entries(responders)) {
      if (queryType=="default") continue;

      if (analyzers[queryType](query))
        return response
    }
    return responders.default
  }
}

const bob = responder(Bob.responses)
export { bob as hey }

