# node-ubereats

A _work in progress_ API for Uber Eats

## Installation

```shell
npm install --save node-ubereats
```

## Usage

```javascript
const UberEats = require('node-ubereats');
const uber = new UberEats({
  latitude: 48.8563148,
  longitude: 2.3227369,
  formattedAddress: '16 Rue de Rochechouart, 75009 Paris'
});
```

## Methods

### Get restaurants

```javascript
uber.getRestaurants();
```

### Search for restaurants

```javascript
uber.searchRestaurants((searchQuery = 'Indian'));
```

### Get store details

```javascript
uber.getStoreDetails(storeUuid);
```
