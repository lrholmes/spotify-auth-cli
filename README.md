# Spotify CLI Authentication
A tiny helper tool that can be used to quickly fetch a Spotify access token from with the command line.

### Installation
```$ npm install -g spotify-auth-cli```

### Usage
To retrieve an access token run the following command:
```$ spotify-token```
This will open the Spotify Login dialog in your default browser. After confirming, the window will close itself and if successful, you should see an access token in your console.

### Options
Several options are available when running the `spotify-token` command.

##### Scope
The `--scope` option can be used to specify the scopes you wish to access. For ease of use, this tool will by default request access to ALL available scopes, so use this option to limit that.

Enter scopes as a comma separated list.
```
$ spotify-token --scope user-read-private,playlist-modify-private
```

#### Show Dialog
Add the `--showDialog` flag to prevent the Spotify Login dialog from automatically granting the request after you've already logged in once. Add this flag if you want to switch Spotify user.
