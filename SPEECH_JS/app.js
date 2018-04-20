$(document).ready(function () {

    if (localStorage.getItem('myId')) {
        var user_id = localStorage.getItem('myId');

        var $btn = $('#btn');
        var key_word = [];
        var tables = [];
        var route = [];
        var count_tables = 0;
        var count_key_word = 0;
        var options = [];
        var limite_option;
        var options_route = "";

        if ('webkitSpeechRecognition' in window) {

            var recognition = new webkitSpeechRecognition();
            recognition.lang = 'fr-FR';
            recognition.continuous = false;
            recognition.interimResults = false;

            $btn.click(function (e) {
                e.preventDefault();
                recognition.start();

                $.ajax({
                    url: 'http://127.0.0.1:8000/show/voices',
                    type: 'GET',
                    crossDomain: true,
                    dataType: 'json',
                    success: function (success) {
                        key_word = success.slice();
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });

                $.ajax({
                    url: 'http://127.0.0.1:8000/show/tables',
                    type: 'GET',
                    crossDomain: true,
                    dataType: 'json',
                    success: function (success) {
                        tables = success.slice();
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });

            });

            recognition.onresult = function (event) {
                for (var i = event.resultIndex; i < event.results.length; i++) {
                    recognition.stop();
                    var transcript = event.results[i][0].transcript;
                    var transcript_tab = transcript.split(' ');
                    console.log(transcript_tab);
                }

                for (var m = 0; m < transcript_tab.length; m++) {
                    for (var n = 0; n < key_word.length; n++) {
                        if (key_word[n].keyWord === transcript_tab[m])
                        {
                            if(count_key_word == 0)
                            {
                                route.push(key_word[n].action);
                                count_key_word++;
                            }
                        }
                    }
                    for (var j = 0; j < tables.length; j++) {
                        if (transcript_tab[m] === tables[j].name)
                        {
                            if(count_tables == 0) {
                                route.push(tables[j].action);
                                limite_option = tables[j].champOblig;
                                count_tables++;
                            }
                        }
                    }

                    if(transcript_tab[m] == 'option' || transcript_tab[m] == 'options')
                    {
                        for(var c = m+1; c < transcript_tab.length;c++)
                        {
                            options.push(transcript_tab[c]);
                        }
                    }
                }

                if(count_tables == 1 && count_key_word == 1)
                {
                    if(limite_option && limite_option === options.length && route[0] == 'add' || route[0] == 'update')
                    {
                        console.log(route);
                        console.log(options);
                        console.log(limite_option);

                        for(var i=0;i < options.length;i++)
                        {
                            options_route += options[i]+'/';
                        }

                        if(route[0] == 'add')
                        {
                            var url = 'http://127.0.0.1:8000/'+route[0]+'/'+route[1]+'/'+options_route+user_id;
                        }

                        /*if(route[0] == 'update')
                        {
                            var url = 'http://127.0.0.1:8000/'+route[0]+'/'+route[1]+'/'+options_route+user_id;
                        }*/

                        $.ajax({
                            url: url,
                            type: 'GET',
                            crossDomain: true,
                            dataType: 'json',
                            success: function (success) {
                                console.log(success)
                            },
                            error: function (error) {
                                console.log(error);
                            }
                        });
                    }

                    if(route[0] == 'show')
                    {
                        $.ajax({
                            url: 'http://127.0.0.1:8000/'+route[0]+'/'+route[1],
                            type: 'GET',
                            crossDomain: true,
                            dataType: 'json',
                            success: function (success) {
                                console.log(success)
                            },
                            error: function (error) {
                                console.log(error);
                            }
                        });
                    }
                }

                count_key_word = 0;
                count_tables = 0;
                options_route = "";
                route = [];
            };
        }
        else {
            $btn.hide();
        }
    }
    else
    {
        console.log("user_id n'existe pas :)");
    }
});