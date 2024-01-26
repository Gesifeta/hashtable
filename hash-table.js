const { sha256 } = require("js-sha256")
class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  constructor(numBuckets = 4) {
    // Your code here
    this.capacity = numBuckets;
    this.data = [];
    this.count = 0;
    this.data.length = numBuckets;
  }
  hash(key) {
    // Your code here
    //to assign  only the first 8 characters for the 64 digits
    let index = sha256(key).slice(0, 8)
    // convert the 8 hexas to base 10
    let base10 = 0;
    for (let i = 0; i < index.length; i++) {
      let value = index[i];
      //to check if value is alphabetic
      switch (value) {
        case 'a': {
          value = 10;
        }
          break;
        case 'b': {
          value = 11;
        }
          break;
        case 'c': {
          value = 12;
        }
          break;
        case 'd': {
          value = 13;
        }
          break;
        case 'e': {
          value = 14;
        }
          break;
        case 'f': {
          value = 15;
        }
          break;
      }
      //to convert base16(hexa) to base10 to natural number
      base10 += value * 16 ** (index.length - 1 - i);

    }
    return base10;
  }

  hashMod(key) {
    // Your code here

    return this.hash(key) % this.data.length;
  }

  insertNoCollisions(key, value) {
    // Your code here
    let keyPair = new KeyValuePair(key, value)
    //check if the key already has a value
    if (this.data[this.hashMod(key)]) {
      throw new Error('hash collision or same key/value pair already exists!');;
    }
    else {
      this.data[this.hashMod(key)] = keyPair;
      this.count++;
    }

    return this;
  }

  insertWithHashCollisions(key, value) {
    // Your code here
    let pairValue = new KeyValuePair(key, value)
    if (this.data[this.hashMod(key)]) {
      //point the new pair nextss to curr
      pairValue.next = this.data[this.hashMod(key)];
      //this.data[this.hashMod(key)].next = pairValue;
      this.data[this.hashMod(key)] = pairValue;
      this.count++
    }
    else {
      this.data[this.hashMod(key)] = pairValue;
      this.count++
    }


  }

  insert(key, value) {
    // Your code here
  }

}


module.exports = HashTable;