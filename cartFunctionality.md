on the first render get the cart form local and db and merge them prefer the quantity of local carts.

Manage all the carts with redux and localstorage.

Only use two db methods getCart and addManyToCart.

When perform any action with the cart like add to cart or increase quantity so get the whole items from redux and upload with addManyToCArt to databse after 2 sec so that no repeat call again and again.