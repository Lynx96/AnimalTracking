// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

contract AnimalTracking {
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

    // Evento para registrar cada captura de dados
    event DataCaptured(uint256 animalId, int256 latitude, int256 longitude, uint256 
timestamp);

    constructor() {
        owner = msg.sender;
        lastCaptureTime = block.timestamp;
    }

    // Função para registrar dados de rastreamento
    function captureData(uint256 _animalId, int256 _latitude, int256 _longitude) public {
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
}

