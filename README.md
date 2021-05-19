mindback

users/
- if not signed in, reroute to sign in
- if signed in, reroute to specific user

users/{userId}/
- information relevant to this specific user


# mindback-core

building a human os

knowledge graphs + personal automation

see [notes](https://github.com/tommerkle1/mindback-core/blob/master/notes.md)

channels ~ i/o
knowledge graph ~ file system
nlu server / interpreter ~ shell
automation layer ~ process execution


## channel server (mindback-channels)

a channel is any point of interaction with mindback where information is passing through. a simple example is using 'sms' as a channel to a more complex user defined api / webhook channel. There should probably be multiple OOTB channels and simple configuration for common channels, i.e. github repo changes

- `active channels`, defined as channels for human-machine communication, i.e. texting my agent/bot
    - sms
        - twilio
    - *email
    - user defined 
        - chrome ext?
- `passive channels`, defined as channels for machine-machine communication, i.e. system reports, financial performance, hr updates.
    - automated api calls / webhooks.
        - hr updates, workout reporting, etc.


## nlu server (mindback-shell)
- rasa model training
- rasa model definition
- serve rasa responses and define chatbot actions

## nlu action server (mindback-shell)
- route chatbot responses to agent
- maps to agent apis

## interpreter
- glues the nlu layer with predefined commands for human os access

## core server (mindback-core)
- runs main agent logic
- define and update agent state
- serialization to json
- user logic

what should an agent be doing? needs to be custom to users, versioning
- storing agent state
    - available channels
        - phone number
    - agent name
    - agent owner (user)
    - nlu (data, actions, domain)
        - default 
        - custom $ref
        - latest trained model
    - chat logs $ref

- agent logic
    - get data from db
    - update data in db
    - send message through channel
    - respond to message from channel
        - default
        - configurable triggers
    - learn
        - update new intents
        - store data for future training
        - train on latest data
    - perform actions with external sources
        - common actions?




## db / serialization (mindback-db)
    - mongodb
    - notes, agents, categories, users?, actions, flows, etc.


## channel 

```js
{
_id: "12345",
type: "sms",
logs: "$ref"

}
```
## agent

```js
{
_id: "12345",
name: "Computer",
owner: "user069",
availableChannels: [
"$ref"
],
defaultChannel: "channelId1",
dateCreated: "date",
dateModified: "date"
}
```

## user

```js
{
_id: "12345",
firstName: "Tom",
lastName: "Merkle",
email: "tom@mindback.com",
owner: "user069",
license: "premium",
timezone: "MT",
channels: [
    {
        id: "channelId1",
        type: "sms", 
        config: {
            // auth info to setup channel
            sender: "+1234567890"
        },
    },
        {
        id: "channelId2",
        type: "email", 
        config: {
            // auth info to setup channel
            sender: "bot1@mindback.com"
        },
    }
],
integrations:[
    // credentials for integrations
]
primaryChannel: "sms"
}
```