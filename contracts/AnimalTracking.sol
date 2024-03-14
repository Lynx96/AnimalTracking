// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

contract AnimalTracking {
    // Evento para registrar cada captura de dados
    event DataCaptured(uint256 animalId, int256 latitude, int256 longitude, uint256 timestamp);
   
    address public owner; // Endereço do proprietário do contrato
    uint256 public lastCaptureTime; // Último horário de captura registrado

    // Estrutura para armazenar dados de rastreamento
    struct TrackingData {
        uint256 animalId;
        int256 latitude;
        int256 longitude;
        uint256 timestamp;
    }

    // Mapeamento de ID do animal para seus dados de rastreamento
    mapping(uint256 => TrackingData) public animalData;
    
    constructor() {
        owner = msg.sender;
        lastCaptureTime = block.timestamp;
    }

    // Função para registrar dados de rastreamento
    function storeCaptureData(uint256 _animalId, int256 _latitude, int256 _longitude) public {
        require(msg.sender == owner, "Apenas o proprietario pode registrar dados");
        require(block.timestamp >= lastCaptureTime + 3 hours, "Apenas uma captura a cada 3 horas permitida");

        TrackingData storage newData = animalData[_animalId];
        newData.animalId = _animalId;
        newData.latitude = _latitude;
        newData.longitude = _longitude;
        newData.timestamp = block.timestamp;

        lastCaptureTime = block.timestamp;

        emit DataCaptured(_animalId, _latitude, _longitude, block.timestamp);
    }

    function getTrackingData(uint256 _animalId) public view returns (uint256, int256, int256, uint256) {
        TrackingData memory data = animalData[_animalId];
        return (data.animalId, data.latitude, data.longitude, data.timestamp);
    }  
    
}


/* pragma solidity ^0.8.1;

contract AnimalTracking {
    address public owner;
    mapping(address => string) public trackedData;

    event TrackingDataReceived(address indexed sender, string data);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    function storeTrackingData(string memory data) public {
        trackedData[msg.sender] = data;
        emit TrackingDataReceived(msg.sender, data);
    }
} */


//ULTIMO SMART CONTRACT CRIADO SEM SER TESTADO
/* 

pragma solidity ^0.8.0;

contract AnimalTracker {
    address public owner;
    
    struct TrackingData {
        uint256 latitude;
        uint256 longitude;
        uint256 timestamp;
    }
    
    mapping(uint256 => TrackingData[]) public animalTrackingData;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function addTrackingData(uint256 _animalId, uint256 _latitude, uint256 _longitude, uint256 _timestamp) external onlyOwner {
        animalTrackingData[_animalId].push(TrackingData(_latitude, _longitude, _timestamp));
    }
    
    function getTrackingData(uint256 _animalId, uint256 _index) external view returns (uint256 latitude, uint256 longitude, uint256 timestamp) {
        require(_index < animalTrackingData[_animalId].length, "Invalid index");
        TrackingData storage data = animalTrackingData[_animalId][_index];
        return (data.latitude, data.longitude, data.timestamp);
    }
}
 */


