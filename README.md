# Tiny immutable

Experimental immutable object. Made for making using immutable object easily.
This project is not a production ready!

```javascript
import tiny from 'tiny-immutable';


const a = tiny.new({ x: 1 }); // { x: 1 }
const b = a.new({ y: 2 });    // { x: 1, y: 2 }
a === b;                      // false

const c = b.delete('x'); // { y: 2 }
b === c;                 // false

```
