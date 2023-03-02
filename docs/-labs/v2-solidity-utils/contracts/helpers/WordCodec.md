# WordCodec







*Library for encoding and decoding values stored inside a 256 bit word. Typically used to pack multiple values in a single storage slot, saving gas by performing less storage accesses. Each value is defined by its size and the least significant bit in the word, also known as offset. For example, two 128 bit values may be encoded in a word by assigning one an offset of 0, and the other an offset of 128. We could use Solidity structs to pack values together in a single storage slot instead of relying on a custom and error-prone library, but unfortunately Solidity only allows for structs to live in either storage, calldata or memory. Because a memory struct uses not just memory but also a slot in the stack (to store its memory location), using memory for word-sized values (i.e. of 256 bits or less) is strictly less gas performant, and doesn&#39;t even prevent stack-too-deep issues. This is compounded by the fact that Balancer contracts typically are memory-intensive, and the cost of accesing memory increases quadratically with the number of allocated words. Manual packing and unpacking is therefore the preferred approach.*



