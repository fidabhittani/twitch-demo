This project is the based on `twitch-api and embeds`

## How to make it work

- Clone the respository
- Create an `.env` file on the root with values
- Install dependencies `yarn`
- Start server `yarn start`

#### Env Keys

```sh
REACT_APP_CLIENT_SECRET=<YOUR_TWITCH_SECRET>
REACT_APP_CLIENT_ID=<YOUR_TWITCH_CLIENT_ID>
REACT_APP_REDIRECT_URI=<YOUR_TWITCH_REDIRECT_URI>
```

## Demo

[ //myagent-77b1f.firebaseapp.com/ ](https://myagent-77b1f.firebaseapp.com)

## Important Questions

### How How would you deploy the above on AWS?

- Create a repository on `github/gitlab`
- Create and Launch `EC2` elastic compute innstance onn Amazon console with desired image, e-g `ubuntu-18.04`
- In Security Groups, Configure SSH.
- Get the `key-pairs` keys, Or create new ones, `.pem` which will be used in SSH.
- You will obtain a public DNS to connect to AWS
- Now do `ssh -i "~/.ssh/key.pem" ubuntu@[0.0.0.0] OR [DNS NAME]`
- Now when you are in, You can install different packages on the machine now.
- Install Git if not installed already
- do a `git pull`
-

### Where do you see bottlenecks in your proposed architecture and how would you approach scaling this app starting from 100 reqs/day to 900MM reqs/day over 6 months?

If an increase occurs in reqs/day where no of requests boosts to 900MM reqs.day, On the infrastructure level, Amazon would always allow you to scale you `EC2` machine,
You cann increase memory and processors on amazon with additional costs.
On Application level, The Application is already made in a way where it can be scaled easily.
