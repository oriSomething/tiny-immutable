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


## Installing

```sh
  npm i --save tiny-immutable

```


## Using

You can import tiny immutable object, only, as a node module currently. For using it in browsers you need to bundle it with projects as [Browserify](http://browserify.org/). `UMD` might come in future.

Each `tiny-immutable` object contains two **non-enumerable** functions `new` and `delete`. The reason the functions aren't enumerable is to avoid using functions such as `toJSON`, and working straight with the object. The purpose of using `reserved words` for commands is for reducing the chance for naming collision.
The tiny immutable object is always freezed so you cannot assign new properties or reassign.


### `new():`

You can think about the `new` method as `Object.assign` only the different is that you get a cloned tiny immutable object.

```javascript
a = tiny.new({ x: 1 });    // { x: 1 }
b = a.new({ y: 2 });       // { x: 1, y: 2 }
c = b.new({ y: 0, z: 1 }); // { x: 1, y: 0, z: 1 }

```


### `delete():`

The `delete` method gets an `array` of `string` or `string` parameters.
The parameters are the name of the properties to omit from a cloned object.

```javascript
a = tiny.new({ x: 1, y: 2, z: 3 }); // { x: 1, y: 2, z: 3 }
b = a.delete('y', 'z');   // { x: 1 }
c = a.delete(['x', 'y']); // { z: 3 }

```


## Roadmap

In future version, you might be able to decide the `new` and `delete` method names.
Also, `Object.freeze` might be an optional.
