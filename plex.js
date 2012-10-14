    function PlexRemote(server, client) {
        this.server = server;
        this.client = client;
        if(server == null || client == null){
            this.autoSelectServerClient();
        }
    }

    PlexRemote.prototype.autoSelectServerClient = function () {
        if (this.server == null){
            this.server = '10.0.0.108:32400';    
        } 
        $.ajax({
            url: "http://" + this.server + "/clients",
            complete: function(message){
                $xml = $($.parseXML(message.responseText));                
                window.console.log($xml);
                this.client = $xml.find('Server').attr('host');
            }
        });
        window.console.log('client ' + this.client);
    }

    PlexRemote.prototype.performCommand = function(command, type) {
        if(this.client != null){
            $.ajax({
                url: "http://" + this.server + "/system/players/" + this.client + "/" + type + "/" + command,                        
                error: function(message){  }
            });
        } else {
            addError("Client is not defined");
        }
    }

    PlexRemote.prototype.play = function (){
        this.performCommand('play', 'playback');
    }

    PlexRemote.prototype.pause = function (){
        this.performCommand('pause', 'playback');
    }

    PlexRemote.prototype.stop = function (){
        this.performCommand('stop', 'playback');
    }

    PlexRemote.prototype.stepForward = function (){
        this.performCommand('stepForward', 'playback');
    }

    PlexRemote.prototype.stepBack = function (){
        this.performCommand('stepBack', 'playback');
    }

    PlexRemote.prototype.playMediaItem = function(id){
        command = 'playMedia?key=/library/metadata/' + id + '&path=http://' + this.server + '/library/metadata/' + id;
        this.performCommand(command, 'application');
    }

    function addError(message){
        window.console.log(message);
    }