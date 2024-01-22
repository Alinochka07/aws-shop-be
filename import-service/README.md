# Cloudwatch records for importFileParser:

2024-01-22T11:38:15.227Z	0e4476bd-fc2f-46eb-b6a9-0791158d7cc1	INFO	Event: {
    "Records": [
        {
            "eventVersion": "2.1",
            "eventSource": "aws:s3",
            "awsRegion": "eu-west-1",
            "eventTime": "2024-01-22T11:38:12.834Z",
            "eventName": "ObjectCreated:Put",
            "userIdentity": {
                "principalId": "AWS:AIDAZ3RNE2ZVSKYLY43FL"
            },
            "requestParameters": {
                "sourceIPAddress": "158.181.150.81"
            },
            "responseElements": {
                "x-amz-request-id": "8H8Z65WBPH0DDB3P",
                "x-amz-id-2": "Zx0HvzrpQVvO6EX4y37PPnaFgQZaB4rV+3j/sSXc42ztydDhvQRw1anKxNoqcG4R5Olk0PhN1XUbmGlWmT205kLHlmEfZFlo"
            },
            "s3": {
                "s3SchemaVersion": "1.0",
                "configurationId": "importproduct-dev-importFileParser-60af9c4c9230acd8c32e15324d0f5384",
                "bucket": {
                    "name": "importproduct",
                    "ownerIdentity": {
                        "principalId": "A2SFHM2VK3J2UI"
                    },
                    "arn": "arn:aws:s3:::importproduct"
                },
                "object": {
                    "key": "uploaded/catalog.csv",
                    "size": 423,
                    "eTag": "6ec430452c5fbdc6d368a437074a7197",
                    "versionId": ".3n6bbw2_MG1VMVrIvI3DUFZmI75LdQA",
                    "sequencer": "0065AE53A4C1AF6FE9"
                }
            }
        }
    ]
}


2024-01-22T11:38:15.319Z	0e4476bd-fc2f-46eb-b6a9-0791158d7cc1	INFO	Records: [
  {
    id: '0ecf90d4-ee2f-4c82-aa93-0fd5a39903d7',
    title: 'MacBook Pro',
    description: 'Description for MacBook Pro',
    price: '1299',
    image: 'https://media.croma.com/image/upload/v1685969095/Croma%20Assets/Computers%20Peripherals/Laptop/Images/256605_li76nl.png'
  },
  {
    id: '52f3cb73-8ee7-4be5-926d-1f1c37128312',
    title: 'HP UltraBook',
    description: 'Description for HP Ultrabook',
    price: '899',
    image: 'https://www.hp.com/us-en/shop/app/assets/images/uploads/prod/5-best-hp-ultrabooks-hero1554158376434.png'
  }
]
