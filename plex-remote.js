            $(document).ready(function(){
                var server = "";
                var client = "";
                $("#id_server_ip").change(function(){
                    server = $(this).val() + ":32400";
                    updateClientList();
                    $("#server_icon").addClass("icon-ok-circle");
                });
                $("#id_client_ip").change(function(){
                    client = $(this).val();
                    $("#client_icon").addClass("icon-ok-circle");
                    $("#controls:hidden").fadeIn();
                });
                $("#play").click(function(){
                    performPlaybackCommand('play');
                });
                $("#pause").click(function(){
                    performPlaybackCommand('pause');
                });

                function performPlaybackCommand (command) {
                    $.ajax({
                        url: "http://" + server + "/system/players/" + client + "/playback/" + command,
                        success: function(){

                        },
                        error: function(){
                            alert(':(');
                        }
                    });
                }

                function updateClientList(){
                $.ajax({
                    url: "http://" + server + "/clients",
                    complete: function(message){
                        window.console.log(message.responseText);
                        var clients = "";
                        var keep_going = true;
                        var c = 0;
                        var re = new RegExp(/name="([a-zA-Z0-9\.\-\/]+)" host="([0-9\.]+)"/g);
                        while(keep_going || !(c<5)){
                            c++;
                            var match = re.exec(message.responseText);
                            if(match == null){
                                keep_going = false;
                            } else {
                                for(var i = 1; i < match.length - 1; i = i + 2){
                                    clients += '<li><a href="#" onclick="javascript:$(\'#id_client_ip\').val(\'' + match[i + 1] + '\').change();">' + match[i] + ' - ' + match[i + 1] + '</a></li>';
                                }
                            }
                        }

                        $("#client-list").html('<h3></h3><ul class="unstyled">' + clients + '</ul>');
                    }
                });

                }
            });