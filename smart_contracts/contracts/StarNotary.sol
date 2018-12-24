pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract StarNotary is ERC721 {

    // struct Coordinates {
    //     string ra;
    //     string dec;
    //     string mag;
    // } 
    // Tupple error

    struct Star {
        string name;
        string starStory;
        string ra;
        string dec;
        string mag;
        // Coordinates coordinates;
    }

    mapping(uint256 => Star) public tokenIdToStarInfo; 
    mapping(uint256 => uint256) public starsForSale;
    mapping(bytes32 => uint256) public starHashToStarId;

    function createStar(string _name, string _starStory, string _ra, string _dec, string _mag, uint256 _tokenId) public {
        require(checkIfStarExist(_ra, _dec, _mag) == false, "Star already registered");

        Star memory newStar = Star(_name, _starStory, _ra, _dec, _mag);

        tokenIdToStarInfo[_tokenId] = newStar;
        saveStarHash(_tokenId, _ra, _dec, _mag);

        _mint(msg.sender, _tokenId);
    }

    function saveStarHash(uint256 _id, string _ra, string _dec, string _mag) private {
        bytes32 starHash = keccak256(abi.encodePacked(_ra, _dec, _mag));
        starHashToStarId[starHash] = _id;
    }

    function checkIfStarExist(string _ra, string _dec, string _mag) public view returns (bool) {
        bytes32 starHash = keccak256(abi.encodePacked(_ra, _dec, _mag));
        return starHashToStarId[starHash] > 0;
    }

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public { 
        require(this.ownerOf(_tokenId) == msg.sender, "Must be the owner of the star");

        starsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable { 
        require(starsForSale[_tokenId] > 0, "Star not available for sale");
        
        uint256 starCost = starsForSale[_tokenId];
        address starOwner = this.ownerOf(_tokenId);
        require(msg.value >= starCost, "Value does not match the cost of the star");

        _removeTokenFrom(starOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);
        
        starOwner.transfer(starCost);

        if(msg.value > starCost) { 
            msg.sender.transfer(msg.value - starCost);
        }
    }
}