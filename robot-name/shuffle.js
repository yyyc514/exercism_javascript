// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
export function shuffle(a, len = a.length) {
    for (let i = a.length - 1; i > a.length-len; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
