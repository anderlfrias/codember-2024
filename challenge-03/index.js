import fs from 'fs';

// const textInput = '[[1, 2], [2, 3], [4, 5]]';
// const textInput = '[[1, 2], [2, 3], [3, 4]]';
// const textInput = '[[4, 6], [7, 9], [10, 12], [12, 16]]';
// console.log('InputArray: ', JSON.parse(textInput));
// const input = JSON.parse(textInput);

function lastNode(input, index) {
  return input[index][input[index].length - 1]
}

function fistNode(input, index) {
  if (index > input.length - 1) {
    return undefined
  }
  return input[index][0];
}

function interconexionIndex(node, networks) {
  return networks.findIndex(network => network.includes(node))
}

function getSafeNodes(input) {
  console.log('INPUT: ', input)
  let networks = [];

  for (let i = 0; i < input.length; i++) {
    const nodes = input[i];
    // let networksIndex = interconexionIndex(nodes[0], networks)
    let networksIndex = -1

    for (let j = 0; j < nodes.length; j++) {
      const node = nodes[j];
      networksIndex = interconexionIndex(node, networks)
      if (networksIndex >= 0) {
        break;
      }
    }

    if (networksIndex >= 0) {
      // console.log('networks',networks)
      // console.log('especific network', networks[networksIndex])
      // console.log('nodes', nodes)
      const newNetworks = nodes.filter(node => !networks[networksIndex].includes(node))
      networks[networksIndex].push(...newNetworks)
    } else {
      networks.push(nodes)
    }

    // if (networksIndex >= 0) {
    //   networks[networksIndex].push(nodes[1])
    // } else {
    //   networks.push(nodes)
    // }
  }

  // console.log('final networks', networks)
  const safeNetworks = networks.filter(network => network.length <= 2)
  let safeNodes = []
  for (let i = 0; i < safeNetworks.length; i++) {
    const safeNetwork = safeNetworks[i];
    for (let j = 0; j < safeNetwork.length; j++) {
      const node = safeNetwork[j];
      safeNodes.push(node)
    }
  }

  return safeNodes;
}



fs.readFile('challenge-03/network.txt', (err, data) => {
  if (err) {
    console.log('Ocurrio un error al intentar leer el archivo.')
  }

  // const textInput = '[[1, 2], [2, 3], [3, 4]]';
  // const textInput = '[[4, 6], [7, 9], [10, 12], [12, 16]]';
  // const input = JSON.parse(textInput);
  const input = JSON.parse(data)
  console.log('input', input)
  console.log(getSafeNodes(input))
  console.log('submit', getSafeNodes(input).join(","))
  console.log(getSafeNodes(input))
  console.log(getSafeNodes(input).length)
  console.log(getSafeNodes(input).join(','))
})
