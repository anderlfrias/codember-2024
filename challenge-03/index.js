import fs from 'fs';

const getUnsafeNodes = (networks) => {
  let unsafeNodes = []

  for (let i = 0; i < networks.length; i++) {
    const network = networks[i];
    if (network.length > 2) {
      unsafeNodes.push(...network)
    }
  }

  return unsafeNodes
}

const isNodeUnsafe = (node, unsafeNodes) => {
  return unsafeNodes.includes(node)
}
const getSafeNodes = (networks, input) => {
  let safeNodes = [];
  let unsafeNodes = getUnsafeNodes(networks)

  for (let index = 0; index < input.length; index++) {
    const node = input[index];
    if (!node.some((n) => isNodeUnsafe(n, unsafeNodes))) {
      safeNodes.push(...node)
    }
  }

  return safeNodes;
}

const getNetworks = (input) => {
  let networks = [];

  let networkToAdd = input[0];
  for (let i = 1; i < input.length; i++) {
    const node = [...input[i]];

    if (node.shift() === input[i-1][input[i-1].length - 1]) {
      networkToAdd = [...networkToAdd, ...node];

      if (i === input.length - 1) {
        networks = [...networks, networkToAdd];
      }
      continue;
    };

    networks = [...networks, networkToAdd];
    networkToAdd = input[i];
    if (i === input.length - 1) {
      networks = [...networks, networkToAdd];
    }
  }

  return networks;
}



fs.readFile('challenge-03/network.txt', (err, data) => {
  if (err) {
    console.log('Ocurrio un error al intentar leer el archivo.')
  }

  const input = JSON.parse(data)
  // const input = [[1, 2], [2, 3], [4, 5]] // Ejemplo 1
  // const input = [[1, 2], [2, 3], [3, 4]] // Ejemplo 2
  // const input = [[4, 6], [7, 9], [10, 12], [12, 16]] // Ejemplo 3
  const networks = getNetworks(input)
  console.log('Networks: ', networks)
  const safeNodes = getSafeNodes(networks, input)
  console.log('SafeNodes cout: ', safeNodes.length)
  console.log('SafeNodes: ', safeNodes.join(','))
})
