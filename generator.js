// Generate random password
export default function generatePassword(charLength, includeUpper, includeLower, includeNumbers, includeSymbols) {
    // Build a matrix of character types and whether they are included
    const charTypes = [
        [includeUpper, "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
        [includeLower, "abcdefghijklmnopqrstuvwxyz"],
        [includeNumbers, "0123456789"],
        [includeSymbols, "~`!@#$%^&*()-_+={[}]|:;'<,>.?/"]
    ]

    // Filter to only included character types
    const includedCharTypes = charTypes.filter(c => c[0]);

    // Begin creation of random password
    let passwordChars = [];

    // Guarantee at least one character from each type first
    for (const charType of includedCharTypes) {
        const chars = charType[1];
        const randomChar = chars[randomInt(0, chars.length - 1)];
        passwordChars.push(randomChar);
    }

    // Add the remaining characters
    const includedChars = includedCharTypes.map(c => c[1]).join('');

    while (passwordChars.length < charLength) {
        const randomChar = includedChars[randomInt(0, includedChars.length - 1)];
        passwordChars.push(randomChar);
    }

    // Shuffle included characters and join them to get password
    shuffle(passwordChars);
    const password = passwordChars.join('');
    return [password, includedChars.length];
}


// Helper function: Shuffle array
function shuffle(array) {
    // Start from last position, go backwards
    for (let i = array.length - 1; i > 0; i--) {
        // Pick random element to go in that position
        const j = randomInt(0, i);

        // Switch the element already there with the randomly chosen one
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function randomInt(min, max) {
  const range = max - min + 1;
  const maxValid = Math.floor(0x100000000 / range) * range;

  const buf = new Uint32Array(1);
  let x;

  do {
    crypto.getRandomValues(buf);
    x = buf[0];
  } while (x >= maxValid);

  return min + (x % range);
}
