pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;


contract CrudApp {

    struct country {
        string name;
        string leader;
        uint256 population;
    }

    uint[] xs;

    country[] public countries;

    uint256 public totalCountries;

    constructor() public {
        totalCountries = 0;
    }

    event CountryEvent(string countryName, string leader, uint256 population);
    event LeaderUpdated(string countryName, string leader);
    event CountryDelete(string countryName);


    function doInsert(string countryName, string leader, uint256 population) public returns (uint256 total){
        country memory newCountry = country(countryName, leader, population);
        countries.push(newCountry);
        totalCountries++;

        emit CountryEvent(countryName, leader, population);
        return total;
    }

    function doUpdateLeader(string countryName, string newLeader) public returns (bool success){
        for (uint256 i = 0; i < totalCountries; i++) {
            if (compareStrings(countries[i].name, countryName)) {
                countries[i].leader = newLeader;
                emit LeaderUpdated(countryName, newLeader);
                return true;
            }
        }
        return false;
    }

    function doDeleteCountry(string countryName) public returns (bool success){
        require(totalCountries > 0);
        for (uint256 i = 0; i < totalCountries; i++) {
            if (compareStrings(countries[i].name, countryName)) {
                countries[i] = countries[totalCountries - 1];
                delete countries[totalCountries - 1];
                totalCountries--;
                countries.length--;
                emit CountryDelete(countryName);
                return true;
            }
        }
        return false;
    }


    function getOneByCountryName(string countryName) public view returns (string name, string leader, uint256 population){
        for (uint256 i = 0; i < totalCountries; i++) {
            if (compareStrings(countries[i].name, countryName)) {
                return (countries[i].name, countries[i].leader, countries[i].population);
            }
        }
        revert('country not found');
    }

    function getOneById(uint id) public view returns (string name, string leader, uint256 population){
        return (countries[id].name, countries[id].leader, countries[id].population);

    }


//    function compareStrings(string a, string b) internal pure returns (bool){
//        return keccak256(abi.encodePacked(a, b)) == keccak256(abi.encodePacked(a, b));
//    }

    function compareStrings (string a, string b)  internal pure returns (bool){
        return keccak256(a) == keccak256(b);
    }


    function getTotalCountries() public view returns (uint256 length){
        return countries.length;
    }


    function getList() public view returns (country[] memory) {
        return countries;
    }

    function getData() constant returns (bytes32, bytes32) {
        bytes32 a = "abcd";
        bytes32 b = "wxyzasdfsf";
        return (a, b);
    }

    function getDynamicData() constant returns (bytes, bytes) {
        bytes a;
        bytes b;
        a.push('a');
        a.push('a');
        a.push('c');

        b.push('x');
        b.push('y');
        b.push('z');
        
        return (a, b);
    }


    string [] public strings;

    function addString(string memory str) public {
        strings.push(str);
    }

    function getStrings() public view returns (string [] memory) {
        return strings;
    }

    function getMany() public view returns (uint[]) {
        for (uint256 i = 0; i < totalCountries; i++) {
            xs.push(i);
        }

        return xs;
    }
}
