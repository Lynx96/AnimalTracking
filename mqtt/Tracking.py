""" import paho.mqtt.client as mqtt
from web3 import Web3
import time

# MQTT broker details
broker_address = "your_broker_address"
port = 1883
topic = "animal_tracking"

# Ethereum details
ethereum_provider = "http://your_ethereum_node_provider"
contract_address = "your_contract_address"
private_key = "your_private_key"

# Callback when the client connects to the broker
def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")
    # Subscribe to the topic when connected
    client.subscribe(topic)

# Callback when a message is received from the broker
def on_message(client, userdata, msg):
    data = msg.payload.decode()
    print(f"Received message: {data}")

    # Send the data to the Ethereum smart contract
    send_to_ethereum(data)

# Connect to Ethereum
w3 = Web3(Web3.HTTPProvider(ethereum_provider))
contract_address = w3.toChecksumAddress(contract_address)
contract_abi = [...]  # Insert your contract ABI here

contract = w3.eth.contract(address=contract_address, abi=contract_abi)

def send_to_ethereum(data):
    # Check if the Ethereum node is connected
    if w3.isConnected():
        # Unlock your Ethereum account
        w3.eth.default_account = w3.eth.account.from_key(private_key)

        # Send data to the smart contract
        transaction_hash = contract.functions.storeCaptureData(data).transact()
        transaction_receipt = w3.eth.waitForTransactionReceipt(transaction_hash)

        print(f"Transaction confirmed. Gas used: {transaction_receipt['gasUsed']}")
    else:
        print("Error: Could not connect to Ethereum node.")

# Initialize MQTT client
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

# Connect to the broker
client.connect(broker_address, port, 60)

try:
    while True:
        # Wait for 3 hours
        time.sleep(3 * 60 * 60)

        # The script will keep running until interrupted
except KeyboardInterrupt:
    print("Script terminated by user")
    client.disconnect()
    client.loop_stop() """





"""codigo abaixo é da pergunta: can you show me a python code
with mqtt protocol that receive animal tracking data from a IOT device?
The tracking data must be received each 3 hours"""




""" 
import paho.mqtt.client as mqtt
import time

# MQTT broker details
broker_address = "your_broker_address"
port = 1883
topic = "animal_tracking"

# Callback when the client connects to the broker
def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")
    # Subscribe to the topic when connected
    client.subscribe(topic)

# Callback when a message is received from the broker
def on_message(client, userdata, msg):
    print(f"Received message: {msg.payload.decode()}")

# Initialize MQTT client
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

# Connect to the broker
client.connect(broker_address, port, 60)

# Loop to handle incoming messages and keep the script running
client.loop_start()

try:
    while True:
        # Wait for 3 hours
        time.sleep(3 * 60 * 60)
except KeyboardInterrupt:
    print("Script terminated by user")
    client.disconnect()
    client.loop_stop()
 """
 
 


