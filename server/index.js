const Web3 = require('web3');
const express = require('express');
const app = express();
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/f508b21f6e64484e8fbc7ee51b2b4d49'
  )
);

const starNotary = new web3.eth.Contract(
  [
    {
      constant: true,
      inputs: [
        {
          name: 'interfaceId',
          type: 'bytes4'
        }
      ],
      name: 'supportsInterface',
      outputs: [
        {
          name: '',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      name: 'starsForSale',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: 'tokenId',
          type: 'uint256'
        }
      ],
      name: 'getApproved',
      outputs: [
        {
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: 'to',
          type: 'address'
        },
        {
          name: 'tokenId',
          type: 'uint256'
        }
      ],
      name: 'approve',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      name: 'tokenIdToStarInfo',
      outputs: [
        {
          name: 'name',
          type: 'string'
        },
        {
          name: 'starStory',
          type: 'string'
        },
        {
          name: 'ra',
          type: 'string'
        },
        {
          name: 'dec',
          type: 'string'
        },
        {
          name: 'mag',
          type: 'string'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: 'from',
          type: 'address'
        },
        {
          name: 'to',
          type: 'address'
        },
        {
          name: 'tokenId',
          type: 'uint256'
        }
      ],
      name: 'transferFrom',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: '',
          type: 'bytes32'
        }
      ],
      name: 'checkIfStarExist',
      outputs: [
        {
          name: '',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: 'from',
          type: 'address'
        },
        {
          name: 'to',
          type: 'address'
        },
        {
          name: 'tokenId',
          type: 'uint256'
        }
      ],
      name: 'safeTransferFrom',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: 'tokenId',
          type: 'uint256'
        }
      ],
      name: 'ownerOf',
      outputs: [
        {
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: 'owner',
          type: 'address'
        }
      ],
      name: 'balanceOf',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: 'to',
          type: 'address'
        },
        {
          name: 'approved',
          type: 'bool'
        }
      ],
      name: 'setApprovalForAll',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: 'from',
          type: 'address'
        },
        {
          name: 'to',
          type: 'address'
        },
        {
          name: 'tokenId',
          type: 'uint256'
        },
        {
          name: '_data',
          type: 'bytes'
        }
      ],
      name: 'safeTransferFrom',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: 'owner',
          type: 'address'
        },
        {
          name: 'operator',
          type: 'address'
        }
      ],
      name: 'isApprovedForAll',
      outputs: [
        {
          name: '',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'from',
          type: 'address'
        },
        {
          indexed: true,
          name: 'to',
          type: 'address'
        },
        {
          indexed: true,
          name: 'tokenId',
          type: 'uint256'
        }
      ],
      name: 'Transfer',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'owner',
          type: 'address'
        },
        {
          indexed: true,
          name: 'approved',
          type: 'address'
        },
        {
          indexed: true,
          name: 'tokenId',
          type: 'uint256'
        }
      ],
      name: 'Approval',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'owner',
          type: 'address'
        },
        {
          indexed: true,
          name: 'operator',
          type: 'address'
        },
        {
          indexed: false,
          name: 'approved',
          type: 'bool'
        }
      ],
      name: 'ApprovalForAll',
      type: 'event'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_name',
          type: 'string'
        },
        {
          name: '_starStory',
          type: 'string'
        },
        {
          name: '_ra',
          type: 'string'
        },
        {
          name: '_dec',
          type: 'string'
        },
        {
          name: '_mag',
          type: 'string'
        },
        {
          name: '_tokenId',
          type: 'uint256'
        }
      ],
      name: 'createStar',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_tokenId',
          type: 'uint256'
        },
        {
          name: '_price',
          type: 'uint256'
        }
      ],
      name: 'putStarUpForSale',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_tokenId',
          type: 'uint256'
        }
      ],
      name: 'buyStar',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    }
  ],
  '0x666637902600847d30f091e59e1cdc2c116a0df0'
);
// Grab the contract at specified deployed address with the interface defined by the ABI

app.get('/', (req, res) => {
  const help = `
  <pre>
  Welcome to the Star Notary API
  The following endpoints are available:
  GET /star/:starToken
    USAGE:
      Get a star by its token
 </pre>
  `;
  res.send(help);
});

app.get('/star/:starToken', async (req, res) => {
  try {
    const { starToken } = req.params;
    const star = await starNotary.methods.tokenIdToStarInfo(starToken).call();
    res.send([star.name, star.starStory, star.ra, star.dec, star.mag]);
  } catch (error) {
    console.log(error);
    res.send('Error getting the star info');
  }
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
