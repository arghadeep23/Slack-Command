# /forward command in Slack workspace

This is a simple slack workspace command which checks for any incoming messages in a particular channel (in this case "channel-1") , then converts it to uppercase and forwards it to "channel-2" using webhooks. 
For this, a custom server is created using Express and exposed to the Internet using Ngrok. 

## Steps required 
- ### Creating a Slack workspace
  ![image](https://github.com/arghadeep23/Slack-Command/assets/91934528/e483c656-6a58-40e6-9acd-1cf9f4fa3db4)
  At first, we need to create a slack workspace , in this case, "InternBit Assignment Task" . I have also made 2 channels named "channel-1" and "channel-2".
- ### Creating a Slack App
  ![image](https://github.com/arghadeep23/Slack-Command/assets/91934528/e83ef6f7-a1af-4c3f-a610-84c93589fb26)
  Here, I have created a new Slack App named "SlackApp" 
- ### Creating a Slash command for the Slack App 
  ![image](https://github.com/arghadeep23/Slack-Command/assets/91934528/36ac02df-e5e0-4559-8741-4ef9a957cb40)
- ### Editing the command - specifying the request URL
  ![image](https://github.com/arghadeep23/Slack-Command/assets/91934528/3294d830-4db5-4abf-9795-edcc2ef8dd43)
  
  In this case, I have entered the forward URL given by Ngrok as the request URL. It is in this URL that Slack will send a post request whenever someone enters a message with the command `/forward`
  
  ![image](https://github.com/arghadeep23/Slack-Command/assets/91934528/1be2d4be-533c-498e-a766-d301b9aa4adb)
  Here, I have exposed http://localhost:3000 via Ngrok

- ### Specifying the scopes and permissions for the Slack App
  ![image](https://github.com/arghadeep23/Slack-Command/assets/91934528/930ece1e-7eb6-472b-b2eb-def3e27f928d)

  These permissions enable `SlackApp` to read any channel message history and also allow it to send message in any channel. These permissions can be editied by going to the `OAuth and Permissions` section and then going to `Scopes`

- ### Collecting the Bot User OAuth Token
  ![image](https://github.com/arghadeep23/Slack-Command/assets/91934528/273a4be4-e951-4ab2-bc93-8e30c78777ae)

  Additionally we would be needing details like the `workspace id`, `channel 1's name`. Along with that and the `Webhook URL`, we can save them as environment variables as they are confidential information. We are now set to make the endpoint.
  
## Example of the body sent by Slack's post request upon a new message using the command
  ![image](https://github.com/arghadeep23/Slack-Command/assets/91934528/4bd93719-c8d7-4a42-b21d-4028f1127381)

  This is the JSON sent by Slack as a post request when a new sends a messaege using the /forward command. The `text` field contains the actual message. We can also retrieve other details like channel name, workspace id, user name, etc. 
  Hence, we can only allow user of `channel-1` to forward message to `channel-2` while preventing others. 


## Demo 
- ### Sending a message in channel-1
  ![image](https://github.com/arghadeep23/Slack-Command/assets/91934528/a6e1589c-620c-442a-9661-9c80bf4772e4)
- ### Message received as Post request and then successfully forwarded to channel-2
  ![image](https://github.com/arghadeep23/Slack-Command/assets/91934528/b532c097-c1fb-414e-af68-1f4377bddd51)
- ### Message forwarded to channel-2
  ![image](https://github.com/arghadeep23/Slack-Command/assets/91934528/96f70e18-ac6f-48ea-9eac-179f1ad4f70a)



## Useful links (documentations referred) : 
- Creating a new Slack App and managing scopes and permissions : https://api.slack.com/start/quickstart
- Retrieving messages in Slack - https://api.slack.com/messaging/retrieving#:~:text=Open%20the%20settings%20for%20your,from%20the%20drop%20down%20menu.
- Documentation given in assignment task : https://api.slack.com/interactivity/slash-command

## Tech Stacks used : 
- NodeJS
- ExpressJS
- Ngrok
- Slack API


https://github.com/arghadeep23/Slack-Command/assets/91934528/115c42d2-7efa-4c4f-9709-4c5f09a6650f




Note : This project is made as a part of my assignment task from InternBit. 
