import json

file_path = '/Users/kpj/Desktop/My Repository/Programming/React/ai_dashboard_drive/public/yolo_detections.json'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    count = 0
    if 'detections' in data:
        for detection in data['detections']:
            if 'objects' in detection:
                for obj in detection['objects']:
                    if 'attention_sum' in obj:
                        del obj['attention_sum']
                        count += 1

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

    print(f"Successfully removed 'attention_sum' from {count} objects.")

except Exception as e:
    print(f"Error: {e}")
