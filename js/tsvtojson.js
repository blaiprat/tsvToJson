

$(function() {
    var $tsvToJson = $('#tsv-to-json'),
        $jsonToTsv = $('#json-to-tsv');
        $jsonResult = $('#json-result'),
        $tsvResult = $('#tsv-result'),

    $tsvToJson.on('paste keyup', function(){
        var json = tsvToJson( $tsvToJson.val());
        $jsonResult.html( JSON.stringify(json) );
    });

    $jsonToTsv.on('paste keyup', function(){
        var tsv = jsonToTsv( $jsonToTsv.val() );
        $tsvResult.html( tsv );
    });


    var tsvToJson = function(input){
        var info = input.replace(/['"]/g,''),
            lines = info.split('\n'),
            firstLine = lines.shift().split('\t'),
            json = [];

        // Helper function to remove quotes
        // and parse numeric values
        var removeQuotes = function(string){
            string = string.replace(/['"]/g,'');
            if (!isNaN(string)){
                string = parseFloat(string);
            }
            return string;
        };

        $.each(lines, function(index, item){
            var lineItem = item.split('\t'),
                jsonLineEntry = {};

            $.each(lineItem, function(index, item){
                jsonLineEntry[firstLine[index]] = removeQuotes(item);
            });
            json.push(jsonLineEntry);

        });

        return json;

    };


    var jsonToTsv = function(input){
        var json = $.parseJSON(input),
            tsv = '',
            firstLine = [],
            lines = [];


        // Helper to add double quotes if
        // the value is string
        var addQuotes = function(value){
            if (isNaN(value)){
                return '"'+value+'"';
            }
            return value;
        };
        $.each(json, function(index, item){
            var newLine = [];
            $.each(item, function(key, value){
                if (index === 0){
                    firstLine.push(addQuotes(key));
                }
                newLine.push(addQuotes(value));
            });
            lines.push(newLine.join('\t'));

        });
        tsv = firstLine.join('\t');
        tsv += '\n'+lines.join('\n');
        return tsv;

    };


});


