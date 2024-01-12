import time
import json
import random
import paho.mqtt.client as mqtt

# MQTT Broker Settings
broker_address = "mqtt.eclipse.org"
broker_port = 1883
topic = "your/topic"

# Function to generate sample data
def generate_sample_data():
    data = {
        "temperature": round(random.uniform(20.0, 30.0), 2),
        "humidity": round(random.uniform(40.0, 60.0), 2),
        "timestamp": int(time.time())
    }
    return json.dumps(data)

# Callback when the message is published
def on_publish(client, userdata, mid):
    print(f"Message Published - MID: {mid}")

# Create an MQTT client
client = mqtt.Client()

# Set the on_publish callback
client.on_publish = on_publish

# Connect to the broker
client.connect(broker_address, broker_port)

# Publish messages in a loop
for _ in range(5):
    message = generate_sample_data()
    result = client.publish(topic, message)

    # Wait for the message to be sent (optional)
    result.wait_for_publish()

    # Print the published message
    print(f"Published Message: {message}")

    # Wait for some time before publishing the next message
    time.sleep(2)

# Disconnect from the broker
client.disconnect()
